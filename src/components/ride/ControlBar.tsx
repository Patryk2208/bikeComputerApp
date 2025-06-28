import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function ControlBar({
                        onLap,
                        onFinish,
                        isPaused
                    }: {
    onLap: () => void;
    onFinish: () => void;
    isPaused: boolean;
}) {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.button, styles.lapButton]}
                onPress={onLap}
                disabled={isPaused}
            >
                <Text style={styles.buttonText}>Lap</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, styles.finishButton]}
                onPress={onFinish}
            >
                <Text style={styles.buttonText}>Finish Ride</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: 'rgba(0,0,0,0.7)',
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.1)',
    },
    button: {
        flex: 1,
        paddingVertical: 16,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 8,
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