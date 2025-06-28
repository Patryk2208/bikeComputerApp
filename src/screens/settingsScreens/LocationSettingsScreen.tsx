import React, { useState } from 'react';
import {Text, ScrollView, StyleSheet, View} from 'react-native';
import SettingsSection from '../../components/settings/SettingsSection';
import ToggleItem from '../../components/settings/ToggleItem';
import NavigationItem from '../../components/settings/NavigationItem';
import BackButton from "../../components/common/BackButton.tsx";
import {useNavigation} from "@react-navigation/native";

export default function LocationSettingsScreen() {
    const [locationAccuracy, setLocationAccuracy] = useState('high');
    const [backgroundTracking, setBackgroundTracking] = useState(true);
    const [crashDetection, setCrashDetection] = useState(true);
    const navigation = useNavigation();

    return (
        <ScrollView style={styles.container}>
            <View style={styles.headerContainer}>
                <BackButton onPress={() => navigation.goBack()} />
                <Text style={styles.header}>Location Settings</Text>
                <View style={{ width: 40 }} />
            </View>

            <SettingsSection title="Location Accuracy">
                <ToggleItem
                    label="High Accuracy"
                    description="GPS + Network (Best for riding)"
                    value={locationAccuracy === 'high'}
                    onValueChange={() => setLocationAccuracy('high')}
                    radioButton
                />
                <ToggleItem
                    label="Battery Saver"
                    description="Network only (Reduces battery use)"
                    value={locationAccuracy === 'medium'}
                    onValueChange={() => setLocationAccuracy('medium')}
                    radioButton
                />
                <ToggleItem
                    label="GPS Only"
                    description="Better accuracy, higher battery use"
                    value={locationAccuracy === 'gps'}
                    onValueChange={() => setLocationAccuracy('gps')}
                    radioButton
                />
            </SettingsSection>

            <SettingsSection title="Tracking Preferences">
                <ToggleItem
                    label="Background Tracking"
                    description="Continue tracking when app is in background"
                    value={backgroundTracking}
                    onValueChange={setBackgroundTracking}
                />
                <ToggleItem
                    label="Auto-Pause Detection"
                    description="Pause tracking when stopped"
                    value={true}
                    onValueChange={() => {}}
                />
                <ToggleItem
                    label="Crash Detection"
                    value={crashDetection}
                    onValueChange={setCrashDetection}
                />
            </SettingsSection>

            <SettingsSection title="Privacy">
                <NavigationItem
                    label="Location Permissions"
                    onPress={() => console.log('Open permissions')}
                />
                <NavigationItem
                    label="Location History"
                    onPress={() => console.log('View history')}
                />
                <ToggleItem
                    label="Share Location Data"
                    description="Help improve bike routes (anonymous)"
                    value={true}
                    onValueChange={() => {}}
                />
            </SettingsSection>

            <SettingsSection title="Advanced">
                <NavigationItem
                    label="GPS Diagnostics"
                    onPress={() => console.log('Open diagnostics')}
                />
                <NavigationItem
                    label="Calibrate Sensors"
                    onPress={() => console.log('Calibrate')}
                />
            </SettingsSection>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        padding: 16,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
        color: '#2c3e50',
    },
});