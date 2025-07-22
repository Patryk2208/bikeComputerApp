/**
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MainNavigator from './navigation/MainNavigator';
import {ServicesManager} from "./persistent/InitializeServices.ts";
import {useEffect, useRef, useState} from "react";
import AppLoadingScreen from "./screens/AppLoadingScreen.tsx";

export default function App() {
    const [isAppReady, setIsAppReady] = useState(false);
    const services = useRef<ServicesManager>({} as ServicesManager);
    useEffect(() => {
        const InitializeApp = async () => {
            try {
                await services.current.Start();
            }
            catch (error) {
                console.log("Mount: ", error);
                throw error;
            }
        }

        const CloseApp = async () => {
            try {
                await services.current.Stop();
            }
            catch (error) {
                console.log("Error caught at unmount: ", error);
            }
        }

        services.current = new ServicesManager();

        InitializeApp().then(
            () => {
                setIsAppReady(true);
            },
            (error) => {
                console.log("Error caught at mount: ", error);
            }
        )

        return () => {
            CloseApp();
        }

    }, [])

    return isAppReady ? (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <MainNavigator />
        </GestureHandlerRootView>
    ) : (
        <AppLoadingScreen />
    );
}