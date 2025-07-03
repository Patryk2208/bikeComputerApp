import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {Pause, Ride} from '../database/orm/Rides.ts';
import { TrackPoint } from "../database/orm/TrackPoints.ts";

interface RideState {
    currentRide: Ride | null;
    rides: Ride[];
    loading: boolean;
    error: string | null;

    StartNewRide: () => Promise<number>;
    AddTrackPoint: (point: TrackPoint) => Promise<void>;
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
                    let pauses : Pause[] = [];
                    let trackPoints : TrackPoint[] = [];
                    const newRide: Ride = new Ride(
                        Date.now().valueOf(),
                        null,
                        0,
                        0,
                        0,
                        0,
                        pauses,
                        trackPoints
                    );

                    //const id = await Repository.CreateRide(newRide);
                    set({
                        currentRide: newRide,
                        loading: false
                    });
                    return 0;
                } catch (error) {
                    set({ error: 'Failed to start ride', loading: false });
                    throw error;
                }
            },

            async AddTrackPoint(point: TrackPoint) {
                const currentRide = get().currentRide;
                if (!currentRide) throw new Error('No active ride');

                const fullPoint = {
                    ...point,
                    RideId: currentRide.RideId,
                    Timestamp: point.Timestamp,
                };

                try {
                    //await Repository.AddTrackPoint(fullPoint);
                    set({
                        currentRide: {
                            ...currentRide,
                            TrackPoints: [...currentRide.TrackPoints, fullPoint]
                        }
                    });
                } catch (error) {
                    console.error('Failed to save track point:', error);
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

                    /*await Repository.UpdateRide(currentRide);

                    const updatedRide = await Repository.getRideById(currentRide.RideId);
                    if (updatedRide) {
                        set(state => ({
                            rides: [updatedRide, ...state.rides],
                            currentRide: null
                        }));
                    }*/
                } catch (error) {
                    console.error('Failed to finish ride:', error);
                }
            },

            async LoadAllRides() {
                set({ loading: true });
                try {
                    //const rides = await Repository.GetAllRides();
                    //set({ rides, loading: false });
                } catch (error) {
                    set({ error: 'Failed to load rides', loading: false });
                }
            },

            async GetRideDetails(id) {
                set({ loading: true });
                try {
                    //const ride = await Repository.getRideById(id);
                    set({ loading: false });
                    //return ride;
                    return null;
                } catch (error) {
                    set({ error: 'Failed to load ride details', loading: false });
                    return null;
                }
            },

            async DeleteRide(id) {
                set({ loading: true });
                try {
                    //await Repository.DeleteRide(id);
                    set(state => ({
                        rides: state.rides.filter(ride => ride.RideId !== id),
                        loading: false
                    }));
                } catch (error) {
                    set({ error: 'Failed to delete ride', loading: false });
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