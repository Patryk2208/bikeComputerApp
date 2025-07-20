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