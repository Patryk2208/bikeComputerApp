import React from 'react';
import { View, StyleSheet, Text, ActivityIndicator, Image } from 'react-native';

export default function AppLoadingScreen() {
    return (
        <View style={styles.container}>
            {/*<Image
                source={require('../../assets/loading-bike.png')}
                style={styles.logo}
            />*/}

            <Text style={styles.title}>Bike Monitor</Text>

            <View style={styles.progressContainer}>
                <ActivityIndicator
                    size="large"
                    color="#3498db"
                />
                <Text style={styles.message}>
                    Loading...
                </Text>
            </View>

            <View style={styles.footer}>
                <Text style={styles.version}>v1.0.0</Text> //todo
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212',
        padding: 40,
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 30,
        tintColor: '#3498db',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#3498db',
        marginBottom: 40,
    },
    progressContainer: {
        alignItems: 'center',
        width: '100%',
    },
    message: {
        fontSize: 18,
        color: '#ecf0f1',
        marginTop: 20,
        textAlign: 'center',
        lineHeight: 26,
    },
    error: {
        color: '#e74c3c',
        fontWeight: 'bold',
    },
    errorTip: {
        color: '#95a5a6',
        marginTop: 10,
        textAlign: 'center',
        fontStyle: 'italic',
    },
    footer: {
        position: 'absolute',
        bottom: 30,
    },
    version: {
        color: '#7f8c8d',
        fontSize: 14,
    },
});