import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from '@react-native-vector-icons/material-icons';

interface EmptyStateProps {
    onAddRide: () => void;
}

export default function EmptyState ({ onAddRide } : EmptyStateProps) {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Icon name="directions-bike" size={60} color="#bdc3c7" />
                <Text style={styles.title}>No Rides Recorded</Text>
                <Text style={styles.subtitle}>
                    You haven't recorded any rides yet. Start your first ride to see it here!
                </Text>
                <TouchableOpacity style={styles.button} onPress={onAddRide}>
                    <Text style={styles.buttonText}>Start Your First Ride</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    content: {
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginTop: 20,
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#7f8c8d',
        textAlign: 'center',
        marginBottom: 30,
    },
    button: {
        backgroundColor: '#3498db',
        paddingVertical: 14,
        paddingHorizontal: 30,
        borderRadius: 30,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});