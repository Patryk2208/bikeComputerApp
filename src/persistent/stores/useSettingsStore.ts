import { create } from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import AsyncStorage from "@react-native-async-storage/async-storage";

interface SettingsState {
    theme: "light" | "dark";
    unitSystem: "metric" | "imperial";
    temperatureUnit: "celsius" | "fahrenheit";
    timeFormat: "12h" | "24h";
    locationPrecision: "High" | "Low";

    LoadSettings: () => Promise<void>;
    setTheme: (theme: "light" | "dark") => void;
    setUnitSystem: (unitSystem: "metric" | "imperial") => void;
    setTemperatureUnit: (temperatureUnit: "celsius" | "fahrenheit") => void;
    setTimeFormat: (timeFormat: "12h" | "24h") => void;
    setLocationPrecision: (locationPrecision: "High" | "Low") => void;
}

export const useSettingsStore = create<SettingsState>()(
    persist(
        (set, get) => ({
            theme: "light",
            unitSystem: "metric",
            temperatureUnit: "celsius",
            timeFormat: "24h",
            locationPrecision: "High",
            LoadSettings: async () => {
                await new Promise((resolve) => {
                    return useSettingsStore.persist.onFinishHydration(resolve);
                })
            },
            setTheme: (theme: "light" | "dark") => {
                set({ theme });
            },
            setUnitSystem: (unitSystem: "metric" | "imperial") => {
                set({ unitSystem });
            },
            setTemperatureUnit: (temperatureUnit: "celsius" | "fahrenheit") => {
                set({ temperatureUnit });
            },
            setTimeFormat: (timeFormat: "12h" | "24h") => {
                set({ timeFormat });
            },
            setLocationPrecision: (locationPrecision: "High" | "Low") => {
                set({ locationPrecision });
            },
        }),
        {
            name: 'settings-storage',
            partialize: (state) => ({
                theme: state.theme,
                unitSystem: state.unitSystem,
                temperatureUnit: state.temperatureUnit,
                timeFormat: state.timeFormat,
                locationPrecision: state.locationPrecision,
            }),
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
)