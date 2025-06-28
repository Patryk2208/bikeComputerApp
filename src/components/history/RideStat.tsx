import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface RideStatProps {
    value: string;
    label: string;
    color?: string;
}

export default function RideStat({ value, label, color = '#2c3e50' } : RideStatProps) {
    return (
        <View style={styles.container}>
            <Text style={[styles.value, { color }]}>{value}</Text>
            <Text style={styles.label}>{label}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginHorizontal: 10,
    },
    value: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    label: {
        fontSize: 14,
        color: '#7f8c8d',
    },
});