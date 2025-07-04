import database from './database/Database.ts';
import { useRideStore } from './stores/useRideStore';
//import { SettingsStorage } from './storage/SettingsStorage';

export async function InitializeServices() {
    try {
        await database.Initialize();

        //const settings = await SettingsStorage.loadSettings();
        //useSettingsStore.setState({ settings });

        await useRideStore.getState().LoadAllRides();
    } catch (error) {
        throw error;
    }
}