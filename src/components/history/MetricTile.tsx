import {StyleSheet, View, Text} from "react-native";

interface MetricTileProps {
    title: string;
    value: string;
}

export default function MetricTile({ title, value }: MetricTileProps) {
    return (
        <View style={styles.tile}>
            <Text style={styles.tileTitle}>{title}</Text>
            <Text style={styles.tileValue}>{value}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    tile: {
        width: '48%',
        backgroundColor: '#f8f9fa',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        alignItems: 'center',
    },
    tileTitle: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 8,
    },
    tileValue: {
        fontSize: 24,
        fontWeight: '700',
    },
});