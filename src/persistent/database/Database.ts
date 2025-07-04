import SQLite from 'react-native-sqlite-storage';
import {Pause, Ride} from "./orm/Rides.ts";
import {TrackPoint, TrackPointDetails} from "./orm/TrackPoints.ts";

SQLite.enablePromise(true);

class Database {
    private db: SQLite.SQLiteDatabase | null = null;
    get IsInitialized() {
        return this.db !== null;
    }

    async Initialize() {
        const createRides = `
        CREATE TABLE IF NOT EXISTS rides (
            ride_id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE,
            start_time INTEGER NOT NULL,
            end_time INTEGER,
            total_distance REAL DEFAULT 0,
            avg_speed REAL DEFAULT 0,
            max_speed REAL DEFAULT 0,
            elevation_gain REAL DEFAULT 0
        );`
        const createPauses = `
        CREATE TABLE IF NOT EXISTS pauses (
            pause_id INTEGER PRIMARY KEY AUTOINCREMENT,
            ride_id INTEGER NOT NULL,
            start_time INTEGER NOT NULL,
            end_time INTEGER,
            FOREIGN KEY (ride_id) REFERENCES rides(ride_id) ON DELETE CASCADE
        );`
        const createTrackPoints = `
        CREATE TABLE IF NOT EXISTS track_points (
            track_point_id INTEGER PRIMARY KEY AUTOINCREMENT,
            ride_id INTEGER NOT NULL,
            latitude REAL NOT NULL,
            longitude REAL NOT NULL,
            timestamp INTEGER NOT NULL,
            FOREIGN KEY (ride_id) REFERENCES rides(ride_id) ON DELETE CASCADE
        );`
        const createTrackPointData = `
        CREATE TABLE IF NOT EXISTS track_point_data (
            track_point_id INTEGER PRIMARY KEY,
            altitude REAL,
            speed REAL,
            accuracy REAL,
            FOREIGN KEY (track_point_id) REFERENCES track_points(track_point_id) ON DELETE CASCADE    
        );`
        const createMapTiles = `        
        CREATE TABLE IF NOT EXISTS map_tiles (
            tile_id INTEGER PRIMARY KEY AUTOINCREMENT,
            zoom INTEGER NOT NULL,
            x_start INTEGER NOT NULL,
            x_end INTEGER NOT NULL,
            y_start INTEGER NOT NULL,
            y_end INTEGER NOT NULL,
            tile BLOB NOT NULL,
            last_accessed INTEGER NOT NULL,
            UNIQUE (zoom, x_start, x_end, y_start, y_end)
        );`
        const createAppSettings = `
        CREATE TABLE IF NOT EXISTS app_settings (
            key TEXT PRIMARY KEY,
            value TEXT NOT NULL
        );`
        try {
            this.db = await SQLite.openDatabase({
                name: 'BikeAppRides.db',
                location: 'default',
                createFromLocation: 1,
            });
        }
        catch (error) {
            console.error('Database open failed:', error);
            throw error;
        }
        try {
            await this.StartTransaction();
            await this.db.executeSql(createRides);
            await this.db.executeSql(createPauses);
            await this.db.executeSql(createTrackPoints);
            await this.db.executeSql(createTrackPointData);
            await this.db.executeSql(createMapTiles);
            await this.db.executeSql(createAppSettings);
            await this.Commit();
        }
        catch (error) {
            console.error('Database initialization failed:', error);
            await this.Rollback();
            throw error;
        }

    }

    async DropAll() {
        let q1 = `DROP TABLE IF EXISTS rides;`
        let q2 = `DROP TABLE IF EXISTS pauses;`
        let q3 = `DROP TABLE IF EXISTS track_points;`
        let q4 = `DROP TABLE IF EXISTS track_point_data;`
        let q5 = `DROP TABLE IF EXISTS map_tiles;`
        let q6 = `DROP TABLE IF EXISTS app_settings;`
        try {
            if(this.db === null) {
                console.error('Database not initialized');
                return
            }
            await this.StartTransaction();
            await this.db.executeSql(q1);
            await this.db.executeSql(q2);
            await this.db.executeSql(q3);
            await this.db.executeSql(q4);
            await this.db.executeSql(q5);
            await this.db.executeSql(q6);
            await this.Commit();
        }
        catch (error) {
            await this.Rollback();
            console.error('Database drop failed:', error);
            throw error;
        }
    }

    async Close() {
        await this.db?.close()
            .catch(err => {
                console.error(err);
                throw err;
            });
    }

    async StartTransaction() {
        if (!this.db) {
            throw new Error('Database not initialized');
        }
        const q = `BEGIN TRANSACTION;`;
        await this.db!.executeSql(q)
            .catch(err => {
                console.error(err);
                throw err;
            });
    }

    async Commit() {
        if (!this.db) {
            throw new Error('Database not initialized');
        }
        const q = `COMMIT;`;
        await this.db!.executeSql(q)
            .catch(err => {
                console.error(err);
                throw err;
            });
    }

    async Rollback() {
        if (!this.db) {
            throw new Error('Database not initialized');
        }
        const q = `ROLLBACK;`;
        await this.db!.executeSql(q)
            .catch(err => {
                console.error(err);
                throw err;
            });
    }

    //Inserts
    async InsertRide(params? :any[]): Promise<number> {
        if (params === undefined || params.length !== 7)
            throw new Error(
                'InsertRide requires a name, start time, end time, total distance, avg speed, max speed, elevation gain'
            );
        let q = `INSERT INTO rides (name, start_time, end_time, total_distance, avg_speed, max_speed, elevation_gain) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        return this.db!.executeSql(q, params)
            .then(
                ([res]) => {
                    if (res.rowsAffected === 0)
                    {
                        throw new Error('no ride inserted');
                    }
                    return res.insertId;
                }
            )
            .catch(err => {
                console.error(err);
                throw err;
            });
    }

    async InsertPause(params? :any[]): Promise<number> {
        let q = `INSERT INTO pauses (ride_id, start_time) VALUES (?, ?)`;
        return this.db!.executeSql(q, params)
            .then(
                ([res]) => {
                    if (res.rowsAffected === 0)
                    {
                        throw new Error('no pause inserted');
                    }
                    return res.insertId;
                }
            )
            .catch(err => {
                console.error(err);
                throw err;
            });
    }

    async InsertTrackPoint(params? :any[]): Promise<number> {
        let q = `INSERT INTO track_points (ride_id, latitude, longitude, timestamp) VALUES (?, ?, ?, ?)`;
        return this.db!.executeSql(q, params)
            .then(
                ([res]) => {
                    if (res.rowsAffected === 0)
                    {
                        throw new Error('no track point inserted');
                    }
                    return res.insertId;
                }
            )
            .catch(err => {
                console.error(err);
                throw err;
            });
    }

    async InsertTrackPointData(params? :any[]): Promise<number> {
        let q = `INSERT INTO track_point_data (track_point_id, altitude, speed, accuracy) VALUES (?, ?, ?, ?)`;
        return this.db!.executeSql(q, params)
            .then(
                ([res]) => {
                    if (res.rowsAffected === 0)
                    {
                        throw new Error('no track point data inserted');
                    }
                    return res.insertId;
                }
            )
            .catch(err => {
                console.error(err);
                throw err;
            });
    }

    async InsertMapTile(params? :any[]): Promise<number> {
        let q = `INSERT INTO map_tiles (zoom, x_start, x_end, y_start, y_end, tile, last_accessed) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        return this.db!.executeSql(q, params)
            .then(
                ([res]) => {
                    if (res.rowsAffected === 0)
                    {
                        throw new Error('no map tile inserted');
                    }
                    return res.insertId;
                }
            )
            .catch(err => {
                console.error(err);
                throw err;
            });
    }

    async InsertAppSettings(params? :any[]): Promise<number> {
        let q = `INSERT INTO app_settings (key, value) VALUES (?, ?)`;
        return this.db!.executeSql(q, params)
            .then(
                ([res]) => {
                    if (res.rowsAffected === 0)
                    {
                        throw new Error('no setting inserted');
                    }
                    return res.insertId;
                }
            )
            .catch(err => {
                console.error(err);
                throw err;
            });
    }

    //Selects
    async GetRideById(params? :any[]): Promise<Ride> {
        if(params === undefined || params.length !== 1)
            throw new Error(
                'GetRideById requires a ride id'
            );
        let q = `SELECT * FROM rides WHERE ride_id = ?`;
        return this.db!.executeSql(q, params)
            .then(
                ([res]) => {
                    if (res.rows.length === 0)
                    {
                        throw new Error('no ride found');
                    }
                    let qr = res.rows.item(0);
                    let ride: Ride = new Ride(qr.name, qr.start_time, qr.end_time, qr.total_distance,
                        qr.avg_speed, qr.max_speed, qr.elevation_gain, [], []);
                    ride.RideId = qr.ride_id;
                    return ride;
                }
            )
            .catch(err => {
                console.error(err);
                throw err;
            });
    }

    async GetAllRides(params?: any[]): Promise<Ride[]> {
        let q = `SELECT * FROM rides`;
        return this.db!.executeSql(q, params)
            .then(
                ([res]) => {
                    let qr = res.rows;
                    let rides: Ride[] = [];
                    for (const row of qr.raw()) {
                        let nr = new Ride(row.name, row.start_time, row.end_time, row.total_distance, row.avg_speed,
                            row.max_speed, row.elevation_gain, [], []);
                        nr.RideId = row.ride_id;
                        rides.push(nr);
                    }
                    return rides;
                }
            )
            .catch(err => {
                console.error(err);
                throw err;
            });
    }

    async GetPauseById(params?: any[]): Promise<Pause> {
        if(params === undefined || params.length !== 1)
            throw new Error(
                'GetPauseById requires a pause id'
            );
        let q = `SELECT * FROM pauses WHERE pause_id = ?`;
        return this.db!.executeSql(q, params)
            .then(
                ([res]) => {
                    if (res.rows.length === 0)
                    {
                        throw new Error('no ride found');
                    }
                    let qr = res.rows.item(0);
                    let pause = new Pause(qr.ride_id, qr.start_time, qr.end_time);
                    pause.PauseId = qr.pause_id;
                    return pause;
                }
            )
            .catch(err => {
                console.error(err);
                throw err;
            });
    }

    async GetPausesForRide(params? :any[]): Promise<Pause[]> {
        if(params === undefined)
            throw new Error(
                'GetPausesForRide requires a ride id'
            );
        let q = `SELECT * FROM pauses WHERE ride_id = ? ORDER BY start_time ASC`;
        return this.db!.executeSql(q, params)
            .then(
                ([res]) => {
                    let qr = res.rows;
                    let pauses: Pause[] = [];
                    for (const row of qr.raw()) {
                        let p = new Pause(row.ride_id, row.start_time, row.end_time);
                        p.PauseId = row.pause_id;
                        pauses.push(p);
                    }
                    return pauses;
                }
            )
            .catch(err => {
                console.error(err);
                throw err;
            });
    }

    async GetTrackPointsForRide(params? :any[]): Promise<TrackPoint[]> {
        if(params === undefined)
            throw new Error(
                'GetTrackPointsForRide requires a ride id'
            );
        let q = `SELECT * FROM track_points WHERE ride_id = ? ORDER BY timestamp ASC`;
        return this.db!.executeSql(q, params)
            .then(
                ([res]) => {
                    let qr = res.rows;
                    let tps: TrackPoint[] = [];
                    for (const row of qr.raw()) {
                        let tp = new TrackPoint(row.ride_id, row.latitude, row.longitude, row.timestamp,
                            new TrackPointDetails(null, null, -1));
                        tps.push(tp);
                    }
                    return tps;
                }
            )
            .catch(err => {
                console.error(err);
                throw err;
            });
    }

    async GetTrackPointDataForTrackPoint(params? :any[]): Promise<TrackPointDetails> {
        if(params === undefined)
            throw new Error(
                'GetTrackPointDataForTrackPoint requires a track point id'
            );
        let q = `SELECT * FROM track_point_data WHERE track_point_id = ?`;
        return this.db!.executeSql(q, params)
            .then(
                ([res]) => {
                    let qr = res.rows.item(0);
                    let tpd = new TrackPointDetails(qr.altitude, qr.speed, qr.accuracy);
                    tpd.TrackPointId = qr.track_point_id;
                    return tpd;
                }
            )
            .catch(err => {
                console.error(err);
                throw err;
            });
    }

    async GetMapTilesForZoom(params? :any[]): Promise<any> {
        if(params === undefined)
            throw new Error(
                'GetMapTilesForZoom requires a zoom level'
            );
        //todo
    }

    async GetSettingForKey(params? :any[]): Promise<string> {
        if (params === undefined)
            throw new Error(
                'GetSettingForKey requires a setting key'
            );
        let q = `SELECT * FROM app_settings WHERE key = ?`;
        return this.db!.executeSql(q, params)
            .then(
                ([res]) => {
                    if (res.rows.length === 0)
                    {
                        throw new Error('no setting found');
                    }
                    return res.rows.item(0).value;
                }
            )
            .catch(err => {
                console.error(err);
                throw err;
            });
    }

    //Updates
    async UpdateRide(params? :any[]): Promise<void> {
        if(params === undefined)
            throw new Error(
                'UpdateRide requires a ride id'
            );
        let q = `UPDATE rides SET end_time = ?, total_distance = ?, avg_speed = ?, max_speed = ?, elevation_gain = ? WHERE ride_id = ?`;
        return this.db!.executeSql(q, params)
            .then(
                ([res]) => {
                    if (res.rowsAffected === 0)
                    {
                        throw new Error('no ride updated');
                    }
                }
            )
            .catch(err => {
                console.error(err);
                throw err;
            });
    }

    async UpdatePause(params? :any[]): Promise<void> {
        if(params === undefined)
            throw new Error(
                'UpdatePause requires a pause id'
            );
        let q = `UPDATE pauses SET end_time = ? WHERE pause_id = ?`;
        return this.db!.executeSql(q, params)
            .then(
                ([res]) => {
                    if (res.rowsAffected === 0)
                    {
                        throw new Error('no pause updated');
                    }
                }
            )
            .catch(err => {
                console.error(err);
                throw err;
            });
    }

    async UpdateMapTile(params? :any[]): Promise<void> {
        if(params === undefined)
            throw new Error(
                'UpdateMapTile requires a map tile id'
            );
        //todo
    }

    async UpdateSettingForKey(params? :any[]): Promise<void> {
        if (params === undefined)
            throw new Error(
                'UpdateSettingForKey requires a setting key'
            );
        let q = `UPDATE app_settings SET value = ? WHERE key = ?`;
        return this.db!.executeSql(q, params)
            .then(
                ([res]) => {
                    if (res.rowsAffected === 0)
                    {
                        throw new Error("no setting updated");
                    }
                }
            )
            .catch(err => {
                console.error(err);
                throw err;
            });
    }

    //Deletes
    async DeleteRide(params? :any[]): Promise<void> {
        if(params === undefined)
            throw new Error(
                'DeleteRide requires a ride id'
            );
        let q = `DELETE FROM rides WHERE ride_id = ?`;
        return this.db!.executeSql(q, params)
            .then(
                ([res]) => {
                    if (res.rowsAffected === 0) {
                        throw new Error('no ride deleted');
                    }
                }
            )
            .catch(err => {
                console.error(err);
                throw err;
            });
    }

    async DeleteTrackPointData(params? :any[]): Promise<void> {
        if(params === undefined)
            throw new Error(
                'DeleteTrackPointData requires a track point id'
            );
        let q = `DELETE FROM track_point_data WHERE track_point_id = ?`;
        return this.db!.executeSql(q, params)
            .then(
                ([res]) => {
                    if (res.rowsAffected === 0) {
                        throw new Error('no track point data deleted');
                    }
                }
            )
            .catch(err => {
                console.error(err);
                throw err;
            });
    }

    async DeleteMapTile(params?: any[]): Promise<void> {
        if(params === undefined)
            throw new Error(
                'DeleteMapTile requires a map tile id'
            );
        let q = `DELETE FROM map_tiles WHERE tile_id = ?`;
        return this.db!.executeSql(q, params)
            .then(
                ([res]) => {
                    if (res.rowsAffected === 0) {
                        throw new Error('no map tile deleted');
                    }
                    //todo
                }
            )
            .catch(err => {
                console.error(err);
                throw err;
            });
    }

    async DeleteSettingForKey(params? :any[]): Promise<void> {
        if (params === undefined)
            throw new Error(
                'DeleteSettingForKey requires a setting key'
            );
        let q = `DELETE FROM app_settings WHERE key = ?`;
        return this.db!.executeSql(q, params)
            .then(
                ([res]) => {
                    if (res.rowsAffected === 0) {
                        throw new Error("no setting deleted");
                    }
                }
            )
            .catch(err => {
                console.error(err);
                throw err;
            });
    }

}

const databaseInstance = new Database();
export default databaseInstance;