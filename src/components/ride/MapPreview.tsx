import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from '@react-native-vector-icons/material-icons';

export default function MapPreview() {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Route Preview</Text>

            <View style={styles.placeholder}>
                <Icon name="map" size={40} color="#95a5a6" />
                <Text style={styles.placeholderText}>Acquiring position...</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    header: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    map: {
        height: 150,
        borderRadius: 12,
        overflow: 'hidden',
    },
    placeholder: {
        height: 150,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        color: '#95a5a6',
        marginTop: 8,
    },
});