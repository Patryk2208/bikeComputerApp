import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Text, FlatList, Button} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import StartRideButton from '../components/dashboard/StartRideButton';
import { useNavigation } from '@react-navigation/native';
//import { NativeStackNavigationProp } from '@react-navigation/native-stack';
//import { RootStackParamList } from '../types/navigation';

/*type DashboardScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'Dashboard'
>;*/

import { DashboardScreenNavigationProp } from '../types/navigation';

export default function DashboardScreen() {
    const navigation = useNavigation<DashboardScreenNavigationProp>();

    const handleSwipe = useCallback((direction: 'left' | 'right') => {
        if (direction === 'left') {
            navigation.navigate('History');
        } else {
            navigation.navigate('Settings');
        }
    }, [navigation]);

    const panGesture = Gesture.Pan()
        .minDistance(10)
        .onEnd((e) => {
            if (e.translationX < -50) handleSwipe('left');
            if (e.translationX > 50) handleSwipe('right');
        });

    return (
        <GestureDetector gesture={panGesture}>
            <View style={styles.container}>
                <Text style={styles.title}>Bike Monitor</Text>
                <StartRideButton
                    onPress={() => navigation.navigate('Ride')}
                />
                <View style={styles.hintContainer}>
                    <Text style={styles.hintText}>Left Settings | Right History</Text>
                </View>
            </View>
        </GestureDetector>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 40,
        color: '#2c3e50',
    },
    hintContainer: {
        position: 'absolute',
        bottom: 40,
        alignItems: 'center',
    },
    hintText: {
        fontSize: 16,
        color: '#7f8c8d',
        marginVertical: 5,
    },
});