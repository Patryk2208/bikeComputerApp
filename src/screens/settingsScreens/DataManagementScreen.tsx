import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import SettingsSection from '../../components/settings/SettingsSection';
import NavigationItem from '../../components/settings/NavigationItem';
import ToggleItem from '../../components/settings/ToggleItem';
import BackButton from "../../components/common/BackButton.tsx";
import {useNavigation} from "@react-navigation/native";

export default function DataManagementScreen() {
    const [exportFormat, /*setExportFormat*/] = useState('gpx');
    const [autoBackup, setAutoBackup] = useState(false);
    const [backupFrequency, /*setBackupFrequency*/] = useState('weekly');
    const navigation = useNavigation();

    return (
        <ScrollView style={styles.container}>
            <View style={styles.headerContainer}>
                <BackButton onPress={() => navigation.goBack()} />
                <Text style={styles.header}>Data Management</Text>
                <View style={{ width: 40 }} />
            </View>

            <SettingsSection title="Export Settings">
                <NavigationItem
                    label="Export Format"
                    value={exportFormat.toUpperCase()}
                    onPress={() => console.log('Select format')}
                />
                <NavigationItem
                    label="Default Export Location"
                    value="Downloads"
                    onPress={() => console.log('Select location')}
                />
            </SettingsSection>

            <SettingsSection title="Backup & Sync">
                <ToggleItem
                    label="Auto-Backup to Cloud"
                    value={autoBackup}
                    onValueChange={setAutoBackup}
                />
                <NavigationItem
                    label="Backup Frequency"
                    value={backupFrequency}
                    onPress={() => console.log('Select frequency')}
                    isDestructive={!autoBackup}
                />
                <NavigationItem
                    label="Manage Cloud Storage"
                    onPress={() => console.log('Manage storage')}
                    isDestructive={!autoBackup}
                />
            </SettingsSection>

            <SettingsSection title="Storage">
                <View style={styles.storageItem}>
                    <Text style={styles.storageLabel}>Local Storage Used</Text>
                    <Text style={styles.storageValue}>124 MB</Text>
                </View>
                <View style={styles.storageItem}>
                    <Text style={styles.storageLabel}>Cloud Storage Used</Text>
                    <Text style={styles.storageValue}>42 MB</Text>
                </View>
            </SettingsSection>

            <SettingsSection title="Data Actions">
                <NavigationItem
                    label="Export All Data"
                    onPress={() => console.log('Export all')}
                />
                <NavigationItem
                    label="Clear Local Cache"
                    value="24MB"
                    onPress={() => console.log('Clear cache')}
                    isDestructive
                />
                <NavigationItem
                    label="Delete All Cloud Backups"
                    onPress={() => console.log('Delete backups')}
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