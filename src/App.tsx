/**
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MainNavigator from './navigation/MainNavigator';
import {InitializeServices} from "./persistent/InitializeServices.ts";
import {useEffect, useState} from "react";
import database from "./persistent/database/Database.ts";
import AppLoadingScreen from "./screens/AppLoadingScreen.tsx";

export default function App() {
    const [isAppReady, setIsAppReady] = useState(false);
    useEffect(() => {
        const InitializeApp = async () => {
            try {
                await InitializeServices();
            }
            catch (error) {
                console.error("Mount: ", error);
            }
        }

        const CloseApp = async () => {
            try {
                await database.Close();
            }
            catch (error) {
                console.error("Error caught at unmount: ", error);
            }
        }

        InitializeApp().then(
            () => {
                setIsAppReady(true);
            },
            (error) => {
                console.error("Error caught at mount: ", error);
            }
        )

        return () => {
            CloseApp(); //todo
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