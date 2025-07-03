import database from './database/Database.ts';
import { useRideStore } from './stores/useRideStore';
//import { SettingsStorage } from './storage/SettingsStorage';

export async function InitializeServices() {
    try {
        await database.Initialize();

        //const settings = await SettingsStorage.loadSettings();
        //useSettingsStore.setState({ settings });

        await useRideStore.getState().LoadAllRides();

        //console.log('App initialized successfully');
    } catch (error) {
        //console.error('App initialization failed:', error);
        throw error;
    }
}