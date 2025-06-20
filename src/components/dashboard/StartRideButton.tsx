import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface StartRideButtonProps {
    onPress: () => void;
}

export default function StartRideButton({ onPress }: StartRideButtonProps) {
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <Text style={styles.buttonText}>START RIDE</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#27ae60',
        paddingVertical: 25,
        paddingHorizontal: 60,
        borderRadius: 50,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    buttonText: {
        color: 'white',
        fontSize: 28,
        fontWeight: 'bold',
        letterSpacing: 1.2,
    },
});