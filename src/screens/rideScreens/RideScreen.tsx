import React, {useCallback, useEffect, useRef, useState} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import SpeedDisplay from '../../components/ride/SpeedDisplay';
import MetricsBar from '../../components/ride/MetricsBar';
import MapPreview from '../../components/ride/MapPreview';
import DataSection from '../../components/ride/DataSection';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/navigation';
import Icon from '@react-native-vector-icons/material-icons';
import { useRideStore } from '../../persistent/stores/useRideStore';
import Geolocation from 'react-native-geolocation-service';
import {TrackPoint, TrackPointDetails} from '../../persistent/database/orm/TrackPoints.ts';

type RideScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'Ride'
>;

export default function RideScreen() {
    const navigation = useNavigation<RideScreenNavigationProp>();
    const { StartNewRide, AddTrackPoint, FinishRide, PauseRide, ResumeRide } = useRideStore();
    const [isPaused, setIsPaused] = useState(false);
    const [speed, setSpeed] = useState(0);
    const [distance, setDistance] = useState(0);
    const [duration, setDuration] = useState(0);
    const [elevation, setElevation] = useState(0);
    const [position, setPosition] = useState<any>(null);
    const [acceleration, setAcceleration] = useState({ x: 0, y: 0, z: 0 });
    const watchId = useRef<number | null>(null);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [lastPosition, setLastPosition] = useState<any>(null);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (startTime && !isPaused) {
            interval = setInterval(() => {
                setDuration(Math.floor((Date.now() - startTime) / 1000));
            }, 1000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [startTime, isPaused]);

    const startTracking = useCallback(() => {
        watchId.current = Geolocation.watchPosition(
            position => {
                if (!isPaused) {
                    setPosition(position);
                    setSpeed(position.coords.speed || 0);

                    AddTrackPoint(
                        new TrackPoint(
                            useRideStore.getState().currentRide!.RideId,
                            position.coords.latitude,
                            position.coords.longitude,
                            position.timestamp,
                            new TrackPointDetails(
                                position.coords.altitude,
                                position.coords.speed,
                                position.coords.accuracy
                            )
                        )
                    );

                    if (lastPosition) {
                        const newDistance = calculateDistance(
                            lastPosition.coords.latitude,
                            lastPosition.coords.longitude,
                            position.coords.latitude,
                            position.coords.longitude
                        );
                        setDistance(prev => prev + newDistance);
                    }

                    setLastPosition(position);
                }
            },
            error => {
                console.log(error);
            },
            {
                enableHighAccuracy: true,
                distanceFilter: 5,
                interval: 1000,
                fastestInterval: 500,
            }
        );
// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const initRide = async () => {
            try {
                await StartNewRide();
            }
            catch (e) {
                navigation.goBack();
                return;
            }
            setStartTime(Date.now());
            startTracking();
        };

        initRide();

        return () => {
            if (watchId.current) Geolocation.clearWatch(watchId.current);
        };
    }, [StartNewRide, startTracking]);


    const togglePause = () => {
        if (!isPaused) {
            PauseRide();
        } else {
            setStartTime(Date.now());
            ResumeRide();
        }
        setIsPaused(!isPaused);
    };

    const handleFinish = async () => {
        if (watchId.current) Geolocation.clearWatch(watchId.current);

        await FinishRide({
            totalDistance: distance,
            avgSpeed: distance > 0 ? (distance / duration) * 3.6 : 0,
            maxSpeed: speed * 3.6,
            elevationGain: elevation,
        });

        navigation.goBack();
    };

    const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
        // Haversine formula implementation
        const R = 6371e3;
        const f1 = lat1 * Math.PI / 180;
        const f2 = lat2 * Math.PI / 180;
        const df = (lat2 - lat1) * Math.PI / 180;
        const dl = (lon2 - lon1) * Math.PI / 180;

        const a = Math.sin(df / 2) * Math.sin(df / 2) +
            Math.cos(f1) * Math.cos(f2) *
            Math.sin(dl / 2) * Math.sin(dl / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c;
    };

    const calculateAccelMagnitude = () => {
        const { x, y, z } = acceleration;
        return Math.sqrt(x * x + y * y + z * z).toFixed(2);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />

            {/* Top Control Bar */}
            <View style={styles.topBar}>
                <TouchableOpacity
                    style={[styles.button, styles.finishButton]}
                    onPress={handleFinish}
                >
                    <Text style={styles.buttonText}>Finish</Text>
                </TouchableOpacity>

                <View style={styles.pauseContainer}>
                    <Icon
                        name={isPaused ? "play-arrow" : "pause"}
                        size={28}
                        color="white"
                        onPress={togglePause}
                    />
                    {isPaused ? (
                        <Text style={styles.pauseText}>PAUSED</Text>
                    ) : (
                        <View style={styles.recordingDot} />
                    )}
                </View>
            </View>

            {/* Main Content */}
            <View style={styles.content}>
                {/* Giant Speed Display */}
                <SpeedDisplay speed={speed * 3.6} />

                {/* Metrics Bar */}
                <MetricsBar
                    distance={distance / 1000}
                    duration={duration}
                    elevation={elevation}
                />

                {/* Map Preview */}
                <MapPreview positions={lastPosition ? [lastPosition] : []} />

                {/* Data Section */}
                <DataSection
                    position={position}
                    acceleration={acceleration}
                    accelMagnitude={calculateAccelMagnitude()}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    pauseContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    pauseText: {
        color: 'white',
        marginLeft: 8,
        fontWeight: 'bold',
        fontSize: 16,
    },
    recordingDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#e74c3c',
        marginLeft: 8,
    },
    content: {
        flex: 1,
        padding: 0,
    },
    button: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
    },
    lapButton: {
        backgroundColor: 'rgba(52, 152, 219, 0.3)',
        borderWidth: 2,
        borderColor: '#3498db',
    },
    finishButton: {
        backgroundColor: '#e74c3c',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});