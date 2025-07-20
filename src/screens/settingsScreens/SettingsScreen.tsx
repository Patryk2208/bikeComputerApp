import {Button, ScrollView, StyleSheet, Text, View} from 'react-native';
import SettingsSection from '../../components/settings/SettingsSection';
import NavigationItem from '../../components/settings/NavigationItem';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import SegmentedControl from "../../components/common/SegmentedControl.tsx";
import {useSettingsStore} from "../../persistent/stores/useSettingsStore.ts";

type SettingsScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'Settings'
>;

export default function SettingsScreen() {
    const navigation = useNavigation<SettingsScreenNavigationProp>();

    const {theme, setTheme, ResetSettings, appVersion, buildNumber} = useSettingsStore()

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Settings</Text>

            {/* Config Settings */}
            <SettingsSection title="Preferences">
                <SegmentedControl
                    options={[
                        { label: 'Light', value: "light" },
                        { label: 'Dark', value: "dark" },
                    ]}
                    selectedValue={theme}
                    onValueChange={(value) => {setTheme(value as "light" | "dark");}}
                />
                <Button title={"More"} onPress={() => navigation.navigate('UnitsSettings')} />
                <NavigationItem
                    label="Unit Settings"
                    value="High" //todo
                    onPress={() => navigation.navigate('UnitsSettings')}
                />
            </SettingsSection>

            {/* Performance Settings */}
            <SettingsSection title="Performance Settings">
                <NavigationItem
                    label="Location Accuracy"
                    value="High" //todo
                    onPress={() => navigation.navigate('LocationSettings')}
                />
            </SettingsSection>

            {/* About Section */}
            <SettingsSection title="About">
                <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Version</Text>
                    <Text style={styles.infoValue}>{appVersion} ({buildNumber})</Text>
                </View>
                <NavigationItem
                    label="Help Center"
                    onPress={() => console.log('Help center')} //todo redirect to repo
                />
            </SettingsSection>

            {/* Reset Button */}
            <View style={styles.resetContainer}>
                <Text style={styles.resetButton} onPress={ResetSettings}>
                    Reset Settings
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