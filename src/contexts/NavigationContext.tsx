/*
import React, { createContext, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type AppNavigationProp = StackNavigationProp<RootStackParamList>;

// Define the navigation context type
interface NavigationContextType {
    navigateToHistory: () => void;
    navigateToSettings: () => void;
    navigateToDashboard: () => void;
}

const NavigationContext = createContext<NavigationContextType>({
    navigateToHistory: () => {},
    navigateToSettings: () => {},
    navigateToDashboard: () => {}
});

type Props = {children? : React.ReactNode};

export const NavigationProvider: React.FC<Props> = ({children}) => {
    return (
        <NavigationContext.Provider value={{
            navigateToHistory: () => {},
            navigateToSettings: () => {},
            navigateToDashboard: () => {}
        }}>
            {children}
        </NavigationContext.Provider>
    );
};

export const useNavigationContext = () => useContext(NavigationContext);

export const useAppNavigation = () => {
    const navigation = useNavigation<AppNavigationProp>();

    return {
        navigateToHistory: () => navigation.navigate('History'),
        navigateToSettings: () => navigation.navigate('Settings'),
        navigateToDashboard: () => navigation.navigate('Dashboard')
    };
};

*/
