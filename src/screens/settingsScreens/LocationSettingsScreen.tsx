import React from 'react';
import {Text, ScrollView, StyleSheet, View} from 'react-native';
import SettingsSection from '../../components/settings/SettingsSection';
import ToggleItem from '../../components/settings/ToggleItem';
import NavigationItem from '../../components/settings/NavigationItem';
import BackButton from "../../components/common/BackButton.tsx";
import {useNavigation} from "@react-navigation/native";
import {useSettingsStore} from "../../persistent/stores/useSettingsStore.ts";
import OpenSettings from 'react-native-open-settings';

export default function LocationSettingsScreen() {
    const {locationPrecision, setLocationPrecision} = useSettingsStore();
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
                    value={locationPrecision === 'high'}
                    onValueChange={() => setLocationPrecision('high' as 'high' | 'low')}
                    radioButton
                />
                <ToggleItem
                    label="Low Accuracy"
                    description="Network only"
                    value={locationPrecision === 'low'}
                    onValueChange={() => setLocationPrecision('low')}
                    radioButton
                />
            </SettingsSection>

            <SettingsSection title="Ride Features">
                <ToggleItem
                    label="Auto-Pause Detection"
                    description="Pause tracking when stopped"
                    value={true}
                    onValueChange={() => {}} //todo
                />
            </SettingsSection>

            <SettingsSection title="Privacy">
                <NavigationItem
                    label="Permissions"
                    onPress={() => OpenSettings.openSettings()}
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