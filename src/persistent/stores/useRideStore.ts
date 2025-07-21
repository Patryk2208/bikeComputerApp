import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Ride } from '../database/orm/Rides.ts';
import { TrackPoint } from "../database/orm/TrackPoints.ts";
import Repository from "../database/Repository.ts";

interface RideState {
    currentRide: Ride | null;
    rides: Ride[];
    loading: boolean;
    error: string | null;

    StartNewRide: () => Promise<number>;
    AddTrackPoint: (point: TrackPoint) => Promise<void>;
    PauseRide: () => Promise<void>;
    ResumeRide: () => Promise<void>;
    FinishRide: (stats: {
        totalDistance: number;
        avgSpeed: number;
        maxSpeed: number;
        elevationGain: number;
    }) => Promise<void>;
    LoadAllRides: () => Promise<void>;
    GetRideDetails: (id: number) => Promise<Ride | null>;
    DeleteRide: (id: number) => Promise<void>;
}

export const useRideStore = create<RideState>()(
    persist(
        (set, get) => ({
            currentRide: null,
            rides: [],
            loading: false,
            error: null,

            async StartNewRide() {
                set({ loading: true, error: null });
                try {
                    let now = Date.now();
                    const ride = await Repository.StartNewRide([now.toString(), now, 0, 0, 0, 0, 0]);
                    set({
                        currentRide: ride,
                        loading: false
                    });
                    return 0;
                } catch (error) {
                    set({ error: 'Failed to start ride', loading: false });
                    throw error;
                }
            },

            async AddTrackPoint(point: TrackPoint) {
                const { currentRide } = get();
                if (!currentRide) {
                    console.log('No current ride');
                }

                const inPoint = {
                    ...point,
                    RideId: currentRide!.RideId,
                    Timestamp: point.Timestamp,
                };

                try {
                    await Repository.AddTrackPoint(
                        [
                            [inPoint.RideId, inPoint.Latitude, inPoint.Longitude, inPoint.Timestamp],
                            [inPoint.TrackPointDetails.Altitude, inPoint.TrackPointDetails.Speed,
                                inPoint.TrackPointDetails.Accuracy]
                        ]);
                    set({
                        currentRide: {
                            ...currentRide!,
                            TrackPoints: [...currentRide!.TrackPoints, inPoint]
                        }
                    });
                    console.log("Track point added");
                } catch (error) {
                    console.log('Failed to add track point:', error);
                }
            },

            async PauseRide() {
                const { currentRide } = get();
                if (!currentRide) return;
                try {
                    let p = await Repository.PauseRide([currentRide.RideId, Date.now()]);
                    currentRide.Pauses = [...currentRide.Pauses, p];
                }
                catch (error) {
                    console.log('Failed to pause ride:', error);
                    throw error;
                }
            },

            async ResumeRide() {
                const { currentRide } = get();
                if (!currentRide) return;
                try {
                    await Repository.ResumeRide([Date.now(), currentRide.Pauses.at(-1)!.PauseId]);
                }
                catch (error) {
                    console.log('Failed to pause ride:', error);
                    throw error;
                }
            },

            async FinishRide(stats) {
                const { currentRide } = get();
                if (!currentRide) return;

                try {
                    currentRide.EndTime = new Date(Date.now());
                    currentRide.TotalDistance = stats.totalDistance;
                    currentRide.AvgSpeed = stats.avgSpeed;
                    currentRide.MaxSpeed = stats.maxSpeed;
                    currentRide.ElevationGain = stats.elevationGain

                    await Repository.FinishRide([
                        currentRide.EndTime.valueOf(),
                        currentRide.TotalDistance,
                        currentRide.AvgSpeed,
                        currentRide.MaxSpeed,
                        currentRide.ElevationGain,
                        currentRide.RideId
                    ]);
                } catch (error) {
                    console.log('Failed to finish ride:', error);
                    throw error;
                }

                if (currentRide) {
                    set(state => ({
                        rides: [currentRide, ...state.rides],
                        currentRide: null
                    }));
                }
            },

            async LoadAllRides() {
                set({ loading: true });
                try {
                    const r = await Repository.GetAllRides();
                    set({ rides: r, loading: false });
                } catch (error) {
                    set({ error: 'Failed to load rides', loading: false });
                }
            },

            async GetRideDetails(id) {
                set({ loading: true });
                try {
                    const ride = await Repository.GetRideById(id);
                    set({ loading: false });
                    return ride;
                } catch (error) {
                    set({ error: 'Failed to load ride details', loading: false });
                    throw error;
                }
            },

            async DeleteRide(id) {
                set({ loading: true });
                try {
                    await Repository.DeleteRide(id);
                    set(state => ({
                        rides: state.rides.filter(ride => ride.RideId !== id),
                        loading: false
                    }));
                } catch (error) {
                    set({ error: 'Failed to delete ride', loading: false });
                    //todo
                }
            },
        }),
        {
            name: 'ride-storage',
            partialize: (state) => ({
                rides: state.rides,
                currentRide: state.currentRide
            }),
        }
    )
);