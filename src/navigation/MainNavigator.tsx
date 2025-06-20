import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
/*import DashboardScreen from '../screens/DashboardScreen';
import HistoryScreen from '../screens/HistoryScreen';
import SettingsScreen from '../screens/SettingsScreen';*/
import MainTabNavigator from './MainTabNavigator';
import RideScreen from '../screens/RideScreen';

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
                {/*<Stack.Screen name="Dashboard" component={DashboardScreen} />
                <Stack.Screen name="History" component={HistoryScreen} />
                <Stack.Screen name="Settings" component={SettingsScreen} />*/}
                <Stack.Screen name="MainTabs" component={MainTabNavigator} />
                <Stack.Screen name="Ride" component={RideScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}