import {NativeStackNavigationProp} from "@react-navigation/native-stack";

export type RootStackParamList = {
    /*Dashboard: undefined;
    History: undefined;
    Settings: undefined;*/
    MainTabs: undefined;
    Ride: undefined;
};

export type DashboardScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'Dashboard'
>;