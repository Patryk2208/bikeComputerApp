import Database from "./Database.ts";
import {Transaction} from "react-native-sqlite-storage";
import {Ride} from "./orm/Rides.ts";

class Repository {
    private Db: typeof Database
    constructor() {
        this.Db = Database;
    }

    async StartNewRide(parameters?: any[]): Promise<Ride> {
        const op = async (txn: Transaction, params?: any[]): Promise<Ride> => {
            return this.Db.InsertRide(txn, params)
                .then(id => {
                    return this.Db.GetRideById(txn, [id])
                })
                .then(res => {
                    return res;
                });
        }
        return this.Db.Transaction(op, parameters)
            .then(res => {
                return res;
            })
            .catch(error => {
                console.error(error.message);
                return new Ride(0, 0, 0, 0, 0, 0, [], []);
            });
    }

    async FinishRide(parameters: any[]): Promise<void> {
        const op = async (txn: Transaction, params?: any[]): Promise<void> => {
            return this.Db.UpdateRide(txn, params);
        }
        await this.Db.Transaction(op, parameters);
        console.error("finished");
    }

    async AddTrackPoint(parameters: any[][]): Promise<void> {
        const op = async (txn: Transaction, params?: any[][]): Promise<void> => {
            if(params === undefined || params[0] === undefined || params[1] === undefined)
                throw new Error(
                    "Invalid parameters for AddTrackPoint"
                )
            return this.Db.InsertTrackPoint(txn, params[0])
                .then(inserted_track_point => {
                    let params_track_point_details = [inserted_track_point, params[1][0], params[1][1], params[1][2]];
                    this.Db.InsertTrackPointData(txn, params_track_point_details);
                });

        }
        await this.Db.Transaction(op, parameters);
    }

    async PauseRide(parameters?: any[]): Promise<number> {
        const op = async (txn: Transaction, params?: any[]): Promise<number> => {
            return this.Db.InsertPause(txn, params);
        }
        return await this.Db.Transaction(op, parameters);
    }

    async ResumeRide(parameters?: any[]): Promise<void> {
        const op = async (txn: Transaction, params?: any[]): Promise<void> => {
            return this.Db.UpdatePause(txn, params);
        }
        await this.Db.Transaction(op, parameters);
    }

    async GetAllRides(): Promise<Ride[]> {
        const op = async (txn: Transaction, params?: any[]): Promise<Ride[]> => {
            return this.Db.GetAllRides(txn, params);
        }
        return await this.Db.Transaction(op);
    }

    async DeleteRide(id: number): Promise<void> {
        const op = async (txn: Transaction, params?: any[]): Promise<void> => {
            return this.Db.DeleteRide(txn, params);
        }
        await this.Db.Transaction(op, [id]);
    }
}

export default new Repository();