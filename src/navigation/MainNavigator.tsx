import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import MainTabNavigator from './MainTabNavigator';
import RideScreen from '../screens/rideScreens/RideScreen.tsx';

import OfflineMapsScreen from '../screens/settingsScreens/OfflineMapsScreen';
import MapStyleScreen from '../screens/settingsScreens/MapStyleScreen';
import UnitsSettingsScreen from '../screens/settingsScreens/UnitsSettingsScreen';
import DataManagementScreen from '../screens/settingsScreens/DataManagementScreen';
import LocationSettingsScreen from '../screens/settingsScreens/LocationSettingsScreen';

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
                <Stack.Screen name="OfflineMaps" component={OfflineMapsScreen} />
                <Stack.Screen name="MapStyle" component={MapStyleScreen} />
                <Stack.Screen name="UnitsSettings" component={UnitsSettingsScreen} />
                <Stack.Screen name="DataManagement" component={DataManagementScreen} />
                <Stack.Screen name="LocationSettings" component={LocationSettingsScreen} />

                {/* History Screens */}
            </Stack.Navigator>
        </NavigationContainer>
    );
}