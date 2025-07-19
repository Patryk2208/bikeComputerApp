import React from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';

export const LoadingScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.overlay} />

            <View style={styles.content}>
                <ActivityIndicator size="large" color="#3498db" />
                <Text style={styles.message}>Loading...</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    content: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 32,
        alignItems: 'center',
        width: '80%',
        elevation: 8,
    },
    message: {
        fontSize: 18,
        color: '#2c3e50',
        marginTop: 20,
        textAlign: 'center',
    },
});