import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
//import MapView, { Polyline } from 'react-native-maps';
import Icon from '@react-native-vector-icons/material-icons';

export default function MapPreview({ positions }: { positions: any[] }) {
    /*const coordinates = positions.map(pos => ({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
    }));*/

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Route Preview</Text>

            {positions.length > 0 ? (
                /*<MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: positions[0].coords.latitude,
                        longitude: positions[0].coords.longitude,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,
                    }}
                    scrollEnabled={false}
                    zoomEnabled={false}
                    rotateEnabled={false}
                    pitchEnabled={false}
                    toolbarEnabled={false}
                    loadingBackgroundColor="#1e1e1e"
                >
                    <Polyline
                        coordinates={coordinates}
                        strokeColor="#3498db"
                        strokeWidth={4}
                    />
                </MapView>*/
                <View style={styles.placeholder}>
                    <Icon name="map" size={40} color="#95a5a6" />
                    <Text style={styles.placeholderText}>Coming soon...</Text>
                </View>
            ) : (
                <View style={styles.placeholder}>
                    <Icon name="map" size={40} color="#95a5a6" />
                    <Text style={styles.placeholderText}>Acquiring position...</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    header: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    map: {
        height: 150,
        borderRadius: 12,
        overflow: 'hidden',
    },
    placeholder: {
        height: 150,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        color: '#95a5a6',
        marginTop: 8,
    },
});