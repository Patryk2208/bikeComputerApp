/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MainNavigator from './navigation/MainNavigator';
import {InitializeServices} from "./persistent/InitializeServices.ts";
import {useEffect} from "react";
import database from "./persistent/database/Database.ts";

export default function App() {
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

        InitializeApp();

        return () => {
            CloseApp();
        }

    }, [])

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <MainNavigator />
        </GestureHandlerRootView>
    );
}