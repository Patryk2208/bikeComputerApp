import SQLite from 'react-native-sqlite-storage';

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
}

const databaseInstance = new Database();
export default databaseInstance;