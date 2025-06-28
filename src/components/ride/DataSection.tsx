import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DataSection({
                         position,
                         acceleration,
                         accelMagnitude
                     }: {
    position: any;
    acceleration: any;
    accelMagnitude: string;
}) {
    return (
        <View style={styles.container}>
            <View style={styles.column}>
                <Text style={styles.sectionHeader}>GPS Data</Text>

                {position ? (
                    <>
                        <DataRow label="Latitude" value={position.coords.latitude.toFixed(6)} />
                        <DataRow label="Longitude" value={position.coords.longitude.toFixed(6)} />
                        <DataRow label="Accuracy" value={`${position.coords.accuracy.toFixed(1)}m`} />
                        <DataRow label="Altitude" value={`${position.coords.altitude?.toFixed(1) || '0.0'}m`} />
                    </>
                ) : (
                    <Text style={styles.noData}>Acquiring GPS signal...</Text>
                )}
            </View>

            <View style={styles.divider} />

            <View style={styles.column}>
                <Text style={styles.sectionHeader}>Motion Data</Text>
                <DataRow label="Acceleration" value={`${accelMagnitude}g`} />
                <DataRow label="X-axis" value={acceleration.x.toFixed(3)} />
                <DataRow label="Y-axis" value={acceleration.y.toFixed(3)} />
                <DataRow label="Z-axis" value={acceleration.z.toFixed(3)} />
            </View>
        </View>
    );
};

const DataRow = ({ label, value }: { label: string; value: string }) => (
    <View style={styles.dataRow}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
    },
    column: {
        flex: 1,
    },
    divider: {
        width: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        marginHorizontal: 16,
    },
    sectionHeader: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    dataRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    label: {
        color: '#95a5a6',
        fontSize: 14,
    },
    value: {
        color: 'white',
        fontSize: 14,
        fontWeight: '500',
    },
    noData: {
        color: '#95a5a6',
        fontStyle: 'italic',
    },
});