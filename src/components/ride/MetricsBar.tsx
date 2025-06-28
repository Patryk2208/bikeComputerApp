import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MetricsBar({
                        distance,
                        duration,
                        elevation
                    }: {
    distance: number;
    duration: number;
    elevation: number;
}) {
    const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <View style={styles.container}>
            <View style={styles.metric}>
                <Text style={styles.value}>{distance.toFixed(1)}</Text>
                <Text style={styles.label}>km</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.metric}>
                <Text style={styles.value}>{formatDuration(duration)}</Text>
                <Text style={styles.label}>time</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.metric}>
                <Text style={styles.value}>+{elevation.toFixed(0)}</Text>
                <Text style={styles.label}>m</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 16,
        paddingVertical: 16,
        marginBottom: 20,
    },
    metric: {
        alignItems: 'center',
    },
    value: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    label: {
        fontSize: 16,
        color: '#95a5a6',
        marginTop: 4,
    },
    divider: {
        width: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
});