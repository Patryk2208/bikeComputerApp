import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import MainTabNavigator from './MainTabNavigator';
import RideScreen from '../screens/rideScreens/RideScreen.tsx';

import UnitsSettingsScreen from '../screens/settingsScreens/UnitsSettingsScreen';
import LocationSettingsScreen from '../screens/settingsScreens/LocationSettingsScreen';

import RideDetailsScreen from "../screens/historyScreens/RideDetailsScreen.tsx";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function MainNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="MainTabs"
                screenOptions={{
                    headerShown: false,
                    animation: 'none',
                    gestureEnabled: true,
                }}
            >
                <Stack.Screen name="MainTabs" component={MainTabNavigator} />
                <Stack.Screen name="Ride" component={RideScreen} />

                {/* Settings screens */}
                <Stack.Screen name="UnitsSettings" component={UnitsSettingsScreen} />
                <Stack.Screen name="LocationSettings" component={LocationSettingsScreen} />

                {/* History Screens */}
                <Stack.Screen name="RideDetails" component={RideDetailsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}