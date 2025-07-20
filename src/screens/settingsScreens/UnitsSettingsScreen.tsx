import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import SettingsSection from '../../components/settings/SettingsSection';
import BackButton from '../../components/common/BackButton';
import SegmentedControl from '../../components/common/SegmentedControl';
import { useNavigation } from '@react-navigation/native';
import {useSettingsStore} from "../../persistent/stores/useSettingsStore.ts";

export default function UnitsSettingsScreen() {
    const navigation = useNavigation();
    const { unitSystem, temperatureUnit, timeFormat, setUnitSystem, setTemperatureUnit, setTimeFormat } = useSettingsStore();

    return (
        <ScrollView style={styles.container}>
            <View style={styles.headerContainer}>
                <BackButton onPress={() => navigation.goBack()} />
                <Text style={styles.header}>Units & Formats</Text>
                <View style={{ width: 40 }} /> {/* Spacer for alignment */}
            </View>

            <SettingsSection title="Measurement System">
                <SegmentedControl
                    options={[
                        { label: 'Metric', value: "metric" },
                        { label: 'Imperial', value: "imperial" },
                    ]}
                    selectedValue={unitSystem}
                    onValueChange={(value) => setUnitSystem(value as "metric" | "imperial")}
                />
                <Text style={styles.description}>
                    {unitSystem === "metric"
                        ? 'Kilometers, meters'
                        : 'Miles, feet'}
                </Text>
            </SettingsSection>

            <SettingsSection title="Temperature Units">
                <SegmentedControl
                    options={[
                        { label: '°C', value: "celsius" },
                        { label: '°F', value: "fahrenheit" },
                    ]}
                    selectedValue={temperatureUnit}
                    onValueChange={(value) => setTemperatureUnit(value as "celsius" | "fahrenheit")}
                />
            </SettingsSection>

            <SettingsSection title="Time Format">
                <SegmentedControl
                    options={[
                        { label: '24-hour', value: "24h" },
                        { label: '12-hour', value: "12h" },
                    ]}
                    selectedValue={timeFormat}
                    onValueChange={(value) => setTimeFormat(value as "24h" | "12h")}
                />
            </SettingsSection>

            <SettingsSection title="Pace Format">
                <Text style={styles.description}>
                    {unitSystem === 'metric'
                        ? 'Pace will be shown in minutes per kilometer (min/km)'
                        : 'Pace will be shown in minutes per mile (min/mile)'}
                </Text>
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
        color: '#2c3e50',
        textAlign: 'center',
        flex: 1,
    },
    description: {
        fontSize: 14,
        color: '#7f8c8d',
        marginTop: 8,
        paddingHorizontal: 8,
    },
});