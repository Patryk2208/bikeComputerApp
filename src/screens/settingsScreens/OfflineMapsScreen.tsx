import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import SettingsSection from '../../components/settings/SettingsSection';
import NavigationItem from '../../components/settings/NavigationItem';
import BackButton from "../../components/common/BackButton.tsx";
import {useNavigation} from "@react-navigation/native";

export default function OfflineMapsScreen() {
    const navigation = useNavigation();

    return (
        <ScrollView style={styles.container}>
            <View style={styles.headerContainer}>
                <BackButton onPress={() => navigation.goBack()} />
                <Text style={styles.header}>Offline Maps</Text>
                <View style={{ width: 40 }} />
            </View>

            <SettingsSection title="Downloaded Regions">
                <NavigationItem
                    label="City Center"
                    value="120MB"
                    onPress={() => console.log('Manage City Center')}
                />
                <NavigationItem
                    label="Northern Trails"
                    value="85MB"
                    onPress={() => console.log('Manage Northern Trails')}
                />
                <NavigationItem
                    label="Coastal Route"
                    value="210MB"
                    onPress={() => console.log('Manage Coastal Route')}
                />
            </SettingsSection>

            <SettingsSection title="Storage">
                <View style={styles.storageItem}>
                    <Text style={styles.storageLabel}>Total Downloaded</Text>
                    <Text style={styles.storageValue}>415MB</Text>
                </View>
                <View style={styles.storageItem}>
                    <Text style={styles.storageLabel}>Available Space</Text>
                    <Text style={styles.storageValue}>8.4GB</Text>
                </View>
            </SettingsSection>

            <SettingsSection title="Actions">
                <NavigationItem
                    label="Download New Region"
                    onPress={() => console.log('Download new region')}
                />
                <NavigationItem
                    label="Clear All Maps"
                    onPress={() => console.log('Clear all maps')}
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
    storageItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 14,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    storageLabel: {
        fontSize: 16,
        color: '#34495e',
    },
    storageValue: {
        fontSize: 16,
        color: '#7f8c8d',
        fontWeight: '500',
    },
});