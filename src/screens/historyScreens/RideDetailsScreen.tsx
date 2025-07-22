import React, {useEffect, useRef, useState} from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useRideStore} from "../../persistent/stores/useRideStore.ts";
import MetricTile from '../../components/history/MetricTile.tsx';
import { formatHoursDuration } from "../../utils/formatUtils.ts"
import {Ride} from "../../persistent/database/orm/Rides.ts";
import {LoadingScreen} from "../LoadingScreen.tsx";
import {RootStackParamList} from "../../types/navigation";
import BackButton from "../../components/common/BackButton.tsx";

//Only complete rides
export default function RideDetailsScreen() {
    const route = useRoute<RouteProp<RootStackParamList>>();
    const navigator = useNavigation();
    const [isScreenReady, setIsScreenReady] = useState(false);
    let DetailedRide = useRef<Ride>({} as Ride)
    const { GetRideDetails } = useRideStore();
    useEffect(() => {
        if (route.params === undefined) {
            navigator.goBack();
            return;
        }
        GetRideDetails(route.params!.rideId).then(
            (r) => {
                if (r === undefined)
                {
                    navigator.goBack();
                }
                DetailedRide.current = r as Ride;
                setIsScreenReady(true);
            },
            () => {
                navigator.goBack();
            }
        )
// eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return isScreenReady ? (
        <ScrollView style={styles.container}>
            {/* Header Section */}
            <View style={styles.header}>
                <BackButton onPress={navigator.goBack}/>
                <Text style={styles.dateText}>
                    {new Date(DetailedRide.current.StartTime).toLocaleDateString()}
                </Text>
                <Text style={styles.durationText}>
                    {formatHoursDuration(DetailedRide.current.EndTime!.valueOf() - DetailedRide.current.StartTime.valueOf())}
                </Text>
            </View>

            {/* Metrics Grid */}
            <View style={styles.gridContainer}>
                <MetricTile title="Distance" value={`${(DetailedRide.current.TotalDistance / 1000).toFixed(2)} km`} />
                <MetricTile title="Avg Speed" value={`${(DetailedRide.current.AvgSpeed * 3.6).toFixed(1)} km/h`} />
                <MetricTile title="Max Speed" value={`${(DetailedRide.current.MaxSpeed * 3.6).toFixed(1)} km/h`} />

                {DetailedRide.current.ElevationGain && (
                    <MetricTile title="Elevation" value={`${DetailedRide.current.ElevationGain} m`} />
                )}
            </View>

            {/* Additional Data Section */}
            {/*todo charts and other stuff*/}

        </ScrollView>
    ) : (
      <LoadingScreen />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
        marginBottom: 24,
        alignItems: 'center',
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    dateText: {
        fontSize: 18,
        fontWeight: '600',
    },
    durationText: {
        fontSize: 16,
        color: '#666',
    },
});