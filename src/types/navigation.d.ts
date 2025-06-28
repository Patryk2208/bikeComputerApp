import {NativeStackNavigationProp} from "@react-navigation/native-stack";

export type RootStackParamList = {
    MainTabs: undefined;
    Ride: undefined;

    Settings: undefined;
    History: undefined;
    ExportSettings: undefined;
    OfflineMaps: undefined;
    MapStyle: undefined;
    UnitsSettings: undefined;
    DataManagement: undefined;
    LocationSettings: undefined;
};

export type DashboardScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'Dashboard'
>;