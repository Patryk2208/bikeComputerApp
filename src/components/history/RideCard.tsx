import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from '@react-native-vector-icons/material-icons';
import {Ride} from "../../persistent/database/orm/Rides.ts";

interface RideCardProps {
    ride: Ride;
    onPress: () => void;
}

export default function RideCard({ ride, onPress } : RideCardProps) {
    const formatDate = (timestamp: number) => {
        return new Date(timestamp).toLocaleDateString('pl-PL', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    const formatDuration = (start: number, end?: number) => {
        if (!end) return '00:00';
        const seconds = Math.floor((end - start) / 1000);
        const mins = Math.floor(seconds / 60);
        const hrs = Math.floor(mins / 60);
        return `${hrs > 0 ? `${hrs}:` : ''}${mins % 60}:${seconds % 60}`;
    };

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
            <View style={styles.card}>
                {/* Card Header */}
                <View style={styles.cardHeader}>
                    <Text style={styles.date}>{formatDate(ride.StartTime.valueOf())}</Text>
                    {ride.Name && <Text style={styles.rideName}>{ride.Name}</Text>}
                </View>

                {/* Map Placeholder */}
                <View style={styles.mapPlaceholder}>
                    <Icon name="map" size={40} color="#bdc3c7" />
                    <Text style={styles.mapText}>Route Preview</Text>
                </View>

                {/* Ride Stats */}
                <View style={styles.statsContainer}>
                    <View style={styles.stat}>
                        <Text style={styles.statValue}>{ride.TotalDistance.toFixed(1)} km</Text>
                        <Text style={styles.statLabel}>Distance</Text>
                    </View>
                    <View style={styles.stat}>
                        <Text style={styles.statValue}>{formatDuration(ride.StartTime.valueOf(), ride.EndTime?.valueOf())}</Text>
                        <Text style={styles.statLabel}>Duration</Text>
                    </View>
                    <View style={styles.stat}>
                        <Text style={styles.statValue}>{ride.AvgSpeed.toFixed(1)} km/h</Text>
                        <Text style={styles.statLabel}>Avg Speed</Text>
                    </View>
                    <View style={styles.stat}>
                        <Text style={styles.statValue}>+{ride.ElevationGain.toFixed(0)} m</Text>
                        <Text style={styles.statLabel}>Elevation</Text>
                    </View>
                </View>

                {/* Card Footer */}
                <View style={styles.cardFooter}>
                    <Text style={styles.moreInfo}>Tap to view details</Text>
                    <Icon name="chevron-right" size={24} color="#3498db" />
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    date: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2c3e50',
    },
    rideName: {
        fontSize: 16,
        color: '#7f8c8d',
        fontStyle: 'italic',
    },
    mapPlaceholder: {
        height: 120,
        backgroundColor: '#ecf0f1',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    mapText: {
        color: '#7f8c8d',
        marginTop: 8,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    stat: {
        alignItems: 'center',
        minWidth: 70,
    },
    statValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2c3e50',
    },
    statLabel: {
        fontSize: 12,
        color: '#7f8c8d',
        marginTop: 4,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#ecf0f1',
    },
    moreInfo: {
        color: '#3498db',
        fontSize: 14,
    },
});