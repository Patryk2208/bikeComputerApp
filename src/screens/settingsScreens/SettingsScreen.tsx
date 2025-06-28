import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import SettingsSection from '../../components/settings/SettingsSection';
import ToggleItem from '../../components/settings/ToggleItem';
import NavigationItem from '../../components/settings/NavigationItem';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import SegmentedControl from "../../components/common/SegmentedControl.tsx";

type SettingsScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'Settings'
>;

export default function SettingsScreen() {
    const navigation = useNavigation<SettingsScreenNavigationProp>();

    // State for toggle settings
    const [useMetric, setUseMetric] = useState(0);
    const [autoDownload, setAutoDownload] = useState(true);
    const [autoBackup, setAutoBackup] = useState(false);
    const [diagnosticData, setDiagnosticData] = useState(true);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Settings</Text>

            {/* Units Settings */}
            <SettingsSection title="Units">
                <SegmentedControl
                    options={[
                        { label: 'Metric', value: 0 },
                        { label: 'Imperial', value: 1 },
                    ]}
                    selectedValue={useMetric}
                    onValueChange={setUseMetric}
                />
            </SettingsSection>

            {/* Map Configuration */}
            <SettingsSection title="Map Configuration">
                <NavigationItem
                    label="Offline Maps"
                    value="1.2GB"
                    onPress={() => navigation.navigate('OfflineMaps')}
                />
                <NavigationItem
                    label="Map Style"
                    value="Basic"
                    onPress={() => navigation.navigate('MapStyle')}
                />
                <ToggleItem
                    label="Auto-Download Maps"
                    value={autoDownload}
                    onValueChange={setAutoDownload}
                />
            </SettingsSection>

            {/* Data Management */}
            <SettingsSection title="Data Management">
                <NavigationItem
                    label="Export Format"
                    value="GPX"
                    onPress={() => navigation.navigate('ExportSettings')}
                />
                <ToggleItem
                    label="Auto-Backup to Cloud"
                    value={autoBackup}
                    onValueChange={setAutoBackup}
                />
                <NavigationItem
                    label="Clear Cache"
                    value="24MB"
                    onPress={() => console.log('Clear cache')}
                    isDestructive
                />
            </SettingsSection>

            {/* Privacy & Security */}
            <SettingsSection title="Privacy & Security">
                <NavigationItem
                    label="Location Accuracy"
                    value="High"
                    onPress={() => navigation.navigate('LocationSettings')}
                />
                <ToggleItem
                    label="Share Diagnostic Data"
                    value={diagnosticData}
                    onValueChange={setDiagnosticData}
                />
            </SettingsSection>

            {/* About Section */}
            <SettingsSection title="About">
                <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Version</Text>
                    <Text style={styles.infoValue}>1.0.0 (Build 102)</Text>
                </View>
                <NavigationItem
                    label="Rate App"
                    onPress={() => console.log('Rate app')}
                />
                <NavigationItem
                    label="Help Center"
                    onPress={() => console.log('Help center')}
                />
            </SettingsSection>

            {/* Reset Button */}
            <View style={styles.resetContainer}>
                <Text style={styles.resetButton} onPress={() => console.log('Reset defaults')}>
                    Reset to Defaults
                </Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        padding: 16,
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 24,
        color: '#2c3e50',
        textAlign: 'center',
    },
    infoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 14,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    infoLabel: {
        fontSize: 16,
        color: '#34495e',
    },
    infoValue: {
        fontSize: 16,
        color: '#7f8c8d',
        fontWeight: '500',
    },
    resetContainer: {
        marginTop: 30,
        marginBottom: 40,
        alignItems: 'center',
    },
    resetButton: {
        color: '#e74c3c',
        fontSize: 18,
        fontWeight: '500',
        padding: 10,
    },
});