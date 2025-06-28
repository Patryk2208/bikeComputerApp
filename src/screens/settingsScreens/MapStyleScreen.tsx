import React, { useState } from 'react';
import {Text, ScrollView, StyleSheet, View} from 'react-native';
import SettingsSection from '../../components/settings/SettingsSection';
import ToggleItem from '../../components/settings/ToggleItem';
import NavigationItem from '../../components/settings/NavigationItem';
import BackButton from "../../components/common/BackButton.tsx";
import {useNavigation} from "@react-navigation/native";

export default function MapStyleScreen() {
    const [selectedStyle, setSelectedStyle] = useState('outdoors');
    const [terrainEnabled, setTerrainEnabled] = useState(true);
    const [trafficEnabled, setTrafficEnabled] = useState(false);

    const mapStyles = [
        { id: 'outdoors', name: 'Outdoors', description: 'Standard map with terrain details' },
        { id: 'satellite', name: 'Satellite', description: 'Aerial imagery with labels' },
        { id: 'light', name: 'Light', description: 'Minimalist light theme' },
        { id: 'dark', name: 'Dark', description: 'Minimalist dark theme' },
        { id: 'cycling', name: 'Cycling', description: 'Specialized for bike routes' },
    ];
    const navigation = useNavigation();

    return (
        <ScrollView style={styles.container}>
            <View style={styles.headerContainer}>
                <BackButton onPress={() => navigation.goBack()} />
                <Text style={styles.header}>Map Style</Text>
                <View style={{ width: 40 }} />
            </View>

            <SettingsSection title="Base Map Style">
                {mapStyles.map((style) => (
                    <ToggleItem
                        key={style.id}
                        label={style.name}
                        description={style.description}
                        value={selectedStyle === style.id}
                        onValueChange={() => setSelectedStyle(style.id)}
                        radioButton
                    />
                ))}
            </SettingsSection>

            <SettingsSection title="Map Features">
                <ToggleItem
                    label="Show Terrain"
                    value={terrainEnabled}
                    onValueChange={setTerrainEnabled}
                />
                <ToggleItem
                    label="Show Traffic"
                    value={trafficEnabled}
                    onValueChange={setTrafficEnabled}
                />
            </SettingsSection>

            <SettingsSection title="Advanced">
                <NavigationItem
                    label="Custom Style Editor"
                    onPress={() => console.log('Open custom style editor')}
                />
                <NavigationItem
                    label="Reset to Default"
                    onPress={() => {
                        setSelectedStyle('outdoors');
                        setTerrainEnabled(true);
                        setTrafficEnabled(false);
                    }}
                    isDestructive
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