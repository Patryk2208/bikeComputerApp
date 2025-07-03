import {NativeStackNavigationProp} from "@react-navigation/native-stack";

export type RootStackParamList = {
    MainTabs: undefined;
    Ride: undefined;

    Settings: undefined;
    ExportSettings: undefined;
    OfflineMaps: undefined;
    MapStyle: undefined;
    UnitsSettings: undefined;
    DataManagement: undefined;
    LocationSettings: undefined;

    History: undefined;
    RideDetails: { rideId: number };
};

export type DashboardScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'Dashboard'
>;