import { create } from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import AsyncStorage from "@react-native-async-storage/async-storage";
import DeviceInfo from "react-native-device-info";

interface SettingsState {
    theme: "light" | "dark";
    unitSystem: "metric" | "imperial";
    temperatureUnit: "celsius" | "fahrenheit";
    timeFormat: "12h" | "24h";
    locationPrecision: "high" | "low";
    appVersion: string;
    buildNumber: string;

    setTheme: (theme: "light" | "dark") => void;
    setUnitSystem: (unitSystem: "metric" | "imperial") => void;
    setTemperatureUnit: (temperatureUnit: "celsius" | "fahrenheit") => void;
    setTimeFormat: (timeFormat: "12h" | "24h") => void;
    setLocationPrecision: (locationPrecision: "high" | "low") => void;

    LoadSettings: () => Promise<void>;
    ResetSettings: () => void;
}

const defaultValues = {
    theme: "light" as "light" | "dark",
    unitSystem: "metric" as "metric" | "imperial",
    temperatureUnit: "celsius" as "celsius" | "fahrenheit",
    timeFormat: "24h" as "12h" | "24h",
    locationPrecision: "high" as "high" | "low",
    appVersion: "",
    buildNumber: ""
}

export const useSettingsStore = create<SettingsState>()(
    persist(
        (set, get) => ({
            ...defaultValues,
            appVersion: DeviceInfo.getVersion(),
            buildNumber: DeviceInfo.getBuildNumber(),
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
            setLocationPrecision: (locationPrecision: "high" | "low") => {
                set({ locationPrecision });
            },
            LoadSettings: async () => {
                if(!useSettingsStore.persist.hasHydrated)
                {
                    await useSettingsStore.persist.rehydrate();
                }
                if(DeviceInfo.getVersion() !== get().appVersion)
                {
                    set({appVersion: DeviceInfo.getVersion()});
                }
                if(DeviceInfo.getBuildNumber() !== get().buildNumber)
                {
                    set({buildNumber: DeviceInfo.getBuildNumber()});
                }
            },
            ResetSettings: () => {
                set(defaultValues);
            }
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