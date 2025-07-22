import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from '@react-native-vector-icons/material-icons';

interface BackButtonProps {
    onPress: () => void;
    color?: string;
}

export default function BackButton({ onPress, color = '#2c3e50' } : BackButtonProps){
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.button, { borderColor: color }]}
            accessibilityLabel="Go back"
        >
            <Icon name="delete" size={24} color={color} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        backgroundColor: '#fff',
        elevation: 2,
    }
});