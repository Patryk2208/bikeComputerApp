import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SpeedDisplay({ speed }: { speed: number }) {
    return (
        <View style={styles.container}>
            <Text style={styles.speedText}>{speed > 0 ? speed.toFixed(1) : '0.0'}</Text>
            <Text style={styles.unitText}>km/h</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    speedText: {
        fontSize: 120,
        fontWeight: 'bold',
        color: 'white',
        textShadowColor: 'rgba(0, 200, 255, 0.7)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 20,
    },
    unitText: {
        fontSize: 24,
        color: '#95a5a6',
        marginTop: -10,
    },
});