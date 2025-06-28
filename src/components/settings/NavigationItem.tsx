import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from '@react-native-vector-icons/material-icons';

interface NavigationItemProps {
    label: string;
    value?: string;
    onPress: () => void;
    isDestructive?: boolean;
}

export default function NavigationItem({
                                           label,
                                           value,
                                           onPress,
                                           isDestructive = false
                                       }: NavigationItemProps) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                <Text style={[styles.label, isDestructive && styles.destructive]}>
                    {label}
                </Text>

                <View style={styles.rightContainer}>
                    {value && (
                        <Text style={[styles.value, isDestructive && styles.destructive]}>
                            {value}
                        </Text>
                    )}
                    <Icon
                        name="chevron-right"
                        size={24}
                        color={isDestructive ? '#e74c3c' : '#95a5a6'}
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    label: {
        fontSize: 16,
        color: '#34495e',
        flex: 1,
    },
    value: {
        fontSize: 16,
        color: '#7f8c8d',
        marginRight: 8,
        fontWeight: '500',
    },
    rightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    destructive: {
        color: '#e74c3c',
    },
});