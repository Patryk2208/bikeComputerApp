import SQLite, {Transaction} from 'react-native-sqlite-storage';
import {Pause, Ride} from "./orm/Rides.ts";
import {TrackPoint, TrackPointDetails} from "./orm/TrackPoints.ts";

SQLite.enablePromise(true);
class Database {
    private db: SQLite.SQLiteDatabase | null = null;
    get IsInitialized() {
        return this.db !== null;
    }

    async Initialize() {
        const createTables : string = `
        CREATE TABLE IF NOT EXISTS rides (
            ride_id INTEGER PRIMARY KEY AUTOINCREMENT,
            start_time INTEGER NOT NULL,
            end_time INTEGER,
            total_distance REAL DEFAULT 0,
            avg_speed REAL DEFAULT 0,
            max_speed REAL DEFAULT 0,
            elevation_gain REAL DEFAULT 0
        );

        CREATE TABLE IF NOT EXISTS pauses (
            pause_id INTEGER PRIMARY KEY AUTOINCREMENT,
            ride_id INTEGER NOT NULL,
            start_time INTEGER NOT NULL,
            end_time INTEGER NOT NULL,
            FOREIGN KEY (ride_id) REFERENCES rides(ride_id) ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS track_points (
            track_point_id INTEGER PRIMARY KEY AUTOINCREMENT,
            ride_id INTEGER NOT NULL,
            latitude REAL NOT NULL,
            longitude REAL NOT NULL,
            timestamp INTEGER NOT NULL,
            FOREIGN KEY (ride_id) REFERENCES rides(ride_id) ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS track_point_data (
            track_point_id INTEGER PRIMARY KEY,
            altitude REAL,
            speed REAL,
            accuracy REAL,
            FOREIGN KEY (track_point_id) REFERENCES track_points(track_point_id) ON DELETE CASCADE    
        );
        
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
        );
        
        CREATE TABLE IF NOT EXISTS app_settings (
            key TEXT PRIMARY KEY,
            value TEXT NOT NULL
        );`
        try {
            this.db = await SQLite.openDatabase({
                name: 'BikeAppRides.db',
            });
            await this.db.transaction(txn => {
                txn.executeSql(createTables, [], (txn, res) => {
                    console.log('Database initialized successfully');
                }, error => {
                    console.error(error);
                });
            });

        }
        catch (error) {
            console.error('Database method failed:', error);
            throw error;
        }
    }

    async Close() {
        await this.db?.close()
    }

    async Transaction<T>(
        operations: (txn: Transaction, params?: any[]) => Promise<T>,
        parameters?: any[]
    ): Promise<T> {
        if (!this.db) {
            throw new Error('Database not initialized');
        }

        return new Promise<T>((resolve, reject) => {
            this.db!.transaction(
                (txn: Transaction) => {
                     operations(txn, parameters)
                         .then(
                             result => {resolve(result);},
                             error => {reject(error);}
                         );
                }
            );
        });
    }

    //Inserts
    async InsertRide(txn: Transaction, params? :any[]): Promise<number> {
        let q = `INSERT INTO rides (start_time, end_time, total_distance, avg_speed, max_speed, elevation_gain) VALUES (?, ?, ?, ?, ?, ?)`;
        return txn.executeSql(q, params)
            .then(
                ([_, res]) => {
                    if (res.rowsAffected === 0)
                    {
                        throw new Error('no ride inserted');
                    }
                    return res.insertId;
                }
            );
    }

    async InsertPause(txn: Transaction, params? :any[]): Promise<number> {
        let q = `INSERT INTO pauses (ride_id, start_time) VALUES (?, ?)`;
        return txn.executeSql(q, params)
            .then(
                ([_, res]) => {
                    if (res.rowsAffected === 0)
                    {
                        throw new Error('no pause inserted');
                    }
                    return res.insertId;
                }
            );
    }

    async InsertTrackPoint(txn: Transaction, params? :any[]): Promise<number> {
        let q = `INSERT INTO track_points (ride_id, latitude, longitude, timestamp) VALUES (?, ?, ?, ?)`;
        return txn.executeSql(q, params)
            .then(
                ([_, res]) => {
                    if (res.rowsAffected === 0)
                    {
                        throw new Error('no track point inserted');
                    }
                    return res.insertId;
                }
            );
    }

    async InsertTrackPointData(txn: Transaction, params? :any[]): Promise<number> {
        let q = `INSERT INTO track_point_data (track_point_id, altitude, speed, accuracy) VALUES (?, ?, ?, ?)`;
        return txn.executeSql(q, params)
            .then(
                ([_, res]) => {
                    if (res.rowsAffected === 0)
                    {
                        throw new Error('no track point data inserted');
                    }
                    return res.insertId;
                }
            );
    }

    async InsertMapTile(txn: Transaction, params? :any[]): Promise<number> {
        let q = `INSERT INTO map_tiles (zoom, x_start, x_end, y_start, y_end, tile, last_accessed) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        return txn.executeSql(q, params)
            .then(
                ([_, res]) => {
                    if (res.rowsAffected === 0)
                    {
                        throw new Error('no map tile inserted');
                    }
                    return res.insertId;
                }
            );
    }

    async InsertAppSettings(txn: Transaction, params? :any[]): Promise<number> {
        let q = `INSERT INTO app_settings (key, value) VALUES (?, ?)`;
        return txn.executeSql(q, params)
            .then(
                ([_, res]) => {
                    if (res.rowsAffected === 0)
                    {
                        throw new Error('no setting inserted');
                    }
                    return res.insertId;
                }
            );
    }

    //Selects
    async GetRideById(txn: Transaction, params? :any[]): Promise<Ride> {
        if(params === undefined)
            throw new Error(
                'GetRideById requires a ride id'
            );
        let q = `SELECT * FROM rides WHERE ride_id = ?`;
        return txn.executeSql(q, params)
            .then(
                ([_, res]) => {
                    if (res.rows.length === 0)
                    {
                        throw new Error('no ride found');
                    }
                    let qr = res.rows.item(0);
                    let ride: Ride = new Ride(qr[0], qr[1], qr[2], qr[3], qr[4], qr[5], [], []);
                    ride.RideId = params[0];
                    return ride;
                }
            );
    }

    async GetAllRides(txn: Transaction, params?: any[]): Promise<Ride[]> {
        let q = `SELECT * FROM rides`;
        return txn.executeSql(q, params)
            .then(
                ([_, res]) => {
                    let qr = res.rows;
                    let rides: Ride[] = [];
                    for (const row of qr) {
                        let nr = new Ride(row[1], row[2], row[3], row[4], row[5], row[6], [], []);
                        nr.RideId = row[0];
                        rides.push(nr);
                    }
                    return rides;
                }
            );
    }

    async GetPausesForRide(txn: Transaction, params? :any[]): Promise<Pause[]> {
        if(params === undefined)
            throw new Error(
                'GetPausesForRide requires a ride id'
            );
        let q = `SELECT * FROM pauses WHERE ride_id = ?`;
        return txn.executeSql(q, params)
            .then(
                ([_, res]) => {
                    let qr = res.rows;
                    let pauses: Pause[] = [];
                    for (const row of qr.raw()) {
                        pauses.push(new Pause(params[0], row[0], row[1]))
                    }
                    return pauses;
                }
            );
    }

    async GetTrackPointsForRide(txn: Transaction, params? :any[]): Promise<TrackPoint[]> {
        if(params === undefined)
            throw new Error(
                'GetTrackPointsForRide requires a ride id'
            );
        let q = `SELECT * FROM track_points WHERE ride_id = ?`;
        let qr: any = null;
        txn.executeSql(q, params)
        //todo
        return [];
    }

    async GetTrackPointDataForTrackPoint(txn: Transaction, params? :any[]): Promise<TrackPointDetails> {
        if(params === undefined)
            throw new Error(
                'GetTrackPointDataForTrackPoint requires a track point id'
            );
        let q = `SELECT * FROM track_point_data WHERE track_point_id = ?`;
        let qr: any = null;
        txn.executeSql(q, params)
        //todo
        return new TrackPointDetails(0, 0, 0);
    }

    async GetMapTilesForZoom(txn: Transaction, params? :any[]): Promise<any> {
        if(params === undefined)
            throw new Error(
                'GetMapTilesForZoom requires a zoom level'
            );
        //todo
    }

    async GetSettingForKey(txn: Transaction, params? :any[]): Promise<string> {
        if (params === undefined)
            throw new Error(
                'GetSettingForKey requires a setting key'
            );
        let q = `SELECT * FROM app_settings WHERE key = ?`;
        return txn.executeSql(q, params)
            .then(
                ([_, res]) => {
                    if (res.rows.length === 0)
                    {
                        throw new Error('no setting found');
                    }
                    return res.rows.item(0);
                }
            );
    }

    //Updates
    async UpdateRide(txn: Transaction, params? :any[]): Promise<void> {
        if(params === undefined)
            throw new Error(
                'UpdateRide requires a ride id'
            );
        let q = `UPDATE rides SET end_time = ?, total_distance = ?, avg_speed = ?, max_speed = ?, elevation_gain = ? WHERE ride_id = ?`;
        return txn.executeSql(q, params)
            .then(
                ([_, res]) => {
                    if (res.rowsAffected === 0)
                    {
                        throw new Error('no ride updated');
                    }
                }
            );
    }

    async UpdatePause(txn: Transaction, params? :any[]): Promise<void> {
        if(params === undefined)
            throw new Error(
                'UpdatePause requires a pause id'
            );
        let q = `UPDATE pauses SET end_time = ? WHERE pause_id = ?`;
        return txn.executeSql(q, params)
            .then(
                ([_, res]) => {
                    if (res.rowsAffected === 0)
                    {
                        throw new Error('no pause updated');
                    }
                }
            );
    }

    async UpdateMapTile(txn: Transaction, params? :any[]): Promise<void> {
        if(params === undefined)
            throw new Error(
                'UpdateMapTile requires a map tile id'
            );
        //todo
    }

    async UpdateSettingForKey(txn: Transaction, params? :any[]): Promise<void> {
        if (params === undefined)
            throw new Error(
                'UpdateSettingForKey requires a setting key'
            );
        let q = `UPDATE app_settings SET value = ? WHERE key = ?`;
        return txn.executeSql(q, params)
            .then(
                ([_, res]) => {
                    if (res.rowsAffected === 0)
                    {
                        throw new Error("no setting updated");
                    }
                }
            );
    }

    //Deletes
    async DeleteRide(txn: Transaction, params? :any[]): Promise<void> {
        if(params === undefined)
            throw new Error(
                'DeleteRide requires a ride id'
            );
        let q = `DELETE FROM rides WHERE ride_id = ?`;
        return txn.executeSql(q, params)
            .then(
                ([_, res]) => {
                    if (res.rowsAffected === 0) {
                        throw new Error('no ride deleted');
                    }
                }
            );
    }

    async DeleteTrackPointData(txn: Transaction, params? :any[]): Promise<void> {
        if(params === undefined)
            throw new Error(
                'DeleteTrackPointData requires a track point id'
            );
        let q = `DELETE FROM track_point_data WHERE track_point_id = ?`;
        return txn.executeSql(q, params)
            .then(
                ([_, res]) => {
                    if (res.rowsAffected === 0) {
                        throw new Error('no track point data deleted');
                    }
                }
            );
    }

    async DeleteMapTile(txn: Transaction, params?: any[]): Promise<void> {
        if(params === undefined)
            throw new Error(
                'DeleteMapTile requires a map tile id'
            );
        let q = `DELETE FROM map_tiles WHERE tile_id = ?`;
        return txn.executeSql(q, params)
            .then(
                ([_, res]) => {
                    if (res.rowsAffected === 0) {
                        throw new Error('no map tile deleted');
                    }
                    //todo
                }
            );
    }

    async DeleteSettingForKey(txn: Transaction, params? :any[]): Promise<void> {
        if (params === undefined)
            throw new Error(
                'DeleteSettingForKey requires a setting key'
            );
        let q = `DELETE FROM app_settings WHERE key = ?`;
        return txn.executeSql(q, params)
            .then(
                ([_, res]) => {
                    if (res.rowsAffected === 0) {
                        throw new Error("no setting deleted");
                    }
                }
            );
    }

}

const databaseInstance = new Database();
export default databaseInstance;