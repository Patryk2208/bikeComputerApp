import Database from "./Database.ts";
import {Pause, Ride} from "./orm/Rides.ts";

class Repository {
    private Db: typeof Database
    constructor() {
        this.Db = Database;
    }

    async StartNewRide(parameters?: any[]): Promise<Ride> {
        try {
            await this.Db.StartTransaction();
            let id = await this.Db.InsertRide(parameters);
            let ride = await this.Db.GetRideById([id]);
            await this.Db.Commit();
            return ride;
        } catch (error) {
            await this.Db.Rollback();
            throw error;
        }
    }

    async FinishRide(parameters: any[]): Promise<void> {
        try {
            await this.Db.StartTransaction();
            await this.Db.UpdateRide(parameters);
            await this.Db.Commit();
        } catch (error) {
            await this.Db.Rollback();
            throw error;
        }
    }

    async AddTrackPoint(parameters: any[][]): Promise<void> {
        if(parameters === undefined || parameters[0] === undefined || parameters[1] === undefined)
            throw new Error(
                "Invalid parameters for AddTrackPoint"
            )
        try {
            await this.Db.StartTransaction();
            let inserted_track_point = await this.Db.InsertTrackPoint(parameters[0]);
            let params_track_point_details = [inserted_track_point, parameters[1][0], parameters[1][1], parameters[1][2]];
            await this.Db.InsertTrackPointData(params_track_point_details);
            await this.Db.Commit();
        } catch (error) {
            await this.Db.Rollback();
            throw error;
        }
    }

    async PauseRide(parameters?: any[]): Promise<Pause> {
        try {
            await this.Db.StartTransaction();
            let id = await this.Db.InsertPause(parameters);
            let p = await this.Db.GetPauseById([id]);
            await this.Db.Commit();
            return p;
        } catch (error) {
            await this.Db.Rollback();
            throw error;
        }
    }

    async ResumeRide(parameters?: any[]): Promise<void> {
        try {
            await this.Db.StartTransaction();
            await this.Db.UpdatePause(parameters);
            await this.Db.Commit();
        } catch (error) {
            await this.Db.Rollback();
            throw error;
        }
    }

    async GetAllRides(): Promise<Ride[]> {
        try {
            await this.Db.StartTransaction();
            let rides = await this.Db.GetAllRides();
            for (const ride of rides) {
                let trackpoints = await this.Db.GetTrackPointsForRide([ride.RideId]);
                for (const trackpoint of trackpoints) {
                    let tpd = await this.Db.GetTrackPointDataForTrackPoint([trackpoint.TrackPointId]);
                    trackpoint.TrackPointDetails = tpd;
                }
                ride.TrackPoints = trackpoints;

                let pauses = await this.Db.GetPausesForRide([ride.RideId]);
                ride.Pauses = pauses;
            }
            await this.Db.Commit();
            return rides;
        } catch (error) {
            await this.Db.Rollback();
            throw error;
        }
    }

    async DeleteRide(id: number): Promise<void> {
        try {
            await this.Db.StartTransaction();
            await this.Db.DeleteRide([id]);
            await this.Db.Commit();
        } catch (error) {
            await this.Db.Rollback();
            throw error;
        }
    }
}

export default new Repository();