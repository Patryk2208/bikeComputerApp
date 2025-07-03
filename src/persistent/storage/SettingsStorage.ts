import AsyncStorage from '@react-native-async-storage/async-storage';

export interface AppSettings {
    units: 'metric' | 'imperial';
    temperatureUnit: 'celsius' | 'fahrenheit';
    timeFormat: '24h' | '12h';
    mapStyle: 'outdoors' | 'satellite' | 'light' | 'dark' | 'cycling';
    locationAccuracy: 'high' | 'medium' | 'gps';
    backgroundTracking: boolean;
    crashDetection: boolean;
}

// Default settings
const DEFAULT_SETTINGS: AppSettings = {
    units: 'metric',
    temperatureUnit: 'celsius',
    timeFormat: '24h',
    mapStyle: 'outdoors',
    locationAccuracy: 'high',
    backgroundTracking: false,
    crashDetection: false,
};

const SETTINGS_KEY = 'app-settings';

export const SettingsStorage = {
    async loadSettings(): Promise<AppSettings> {
        try {
            const json = await AsyncStorage.getItem(SETTINGS_KEY);
            return json ? JSON.parse(json) : DEFAULT_SETTINGS;
        } catch (error) {
            console.error('Failed to load settings:', error);
            return DEFAULT_SETTINGS;
        }
    },

    async saveSettings(settings: AppSettings): Promise<void> {
        try {
            await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
        } catch (error) {
            console.error('Failed to save settings:', error);
        }
    },

    async resetToDefaults(): Promise<void> {
        try {
            await AsyncStorage.removeItem(SETTINGS_KEY);
        } catch (error) {
            console.error('Failed to reset settings:', error);
        }
    }
};