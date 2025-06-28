import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DashboardScreen from '../screens/DashboardScreen';
import HistoryScreen from '../screens/historyScreens/HistoryScreen.tsx';
import SettingsScreen from '../screens/settingsScreens/SettingsScreen.tsx';
import { View, StyleSheet, Dimensions } from 'react-native';

const Tab = createMaterialTopTabNavigator();
const { width } = Dimensions.get('window');

export default function MainTabNavigator() {
    return (
        <Tab.Navigator
            initialRouteName="Dashboard"
            screenOptions={{
                swipeEnabled: true,
                tabBarStyle: styles.tabBar,
                //tabBarIndicatorStyle: styles.indicator,
                tabBarItemStyle: { width: width / 3 },
                tabBarLabelStyle: { textTransform: 'none' },
            }}
            tabBar={({ state, navigation }) => (
                <View style={styles.tabContainer}>
                    {state.routes.map((route, index) => (
                        <View
                            key={route.key}
                            style={[
                                styles.tabItem,
                                state.index === index && styles.activeTab
                            ]}
                        >
                            <View
                                style={[
                                    styles.dot,
                                    state.index === index && styles.activeDot
                                ]}
                                onTouchEnd={() => navigation.navigate(route.name)}
                            />
                        </View>
                    ))}
                </View>
            )}
        >
            <Tab.Screen name="Settings" component={SettingsScreen} />
            <Tab.Screen name="Dashboard" component={DashboardScreen} />
            <Tab.Screen name="History" component={HistoryScreen} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        height: 0,
        elevation: 0,
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 15,
        backgroundColor: '#f8f9fa',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    tabItem: {
        padding: 8,
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: '#2e7d32',
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#bdbdbd',
    },
    activeDot: {
        backgroundColor: '#2e7d32',
        transform: [{ scale: 1.3 }],
    },
});