/*
import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';

interface ToggleItemProps {
    label: string;
    value: boolean;
    onValueChange: (value: boolean) => void;
}

export default function ToggleItem({ label, value, onValueChange }: ToggleItemProps) {
    return (
        <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
            <Switch
    value={value}
    onValueChange={onValueChange}
    trackColor={{ false: '#bdc3c7', true: '#2ecc71' }}
    thumbColor="#fff"
    ios_backgroundColor="#bdc3c7"
        />
        </View>
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
});
*/
import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';

interface ToggleItemProps {
    label: string;
    value: boolean;
    onValueChange: (value: boolean) => void;
    description?: string;
    radioButton?: boolean;
    disabled?: boolean;
}

export default function ToggleItem({
                                       label,
                                       value,
                                       onValueChange,
                                       description,
                                       radioButton = false,
                                       disabled = false
                                   }: ToggleItemProps) {
    return (
        <View style={[styles.container, disabled && styles.disabled]}>
            <View style={styles.textContainer}>
                <Text style={[styles.label, disabled && styles.disabledText]}>{label}</Text>
                {description && (
                    <Text style={[styles.description, disabled && styles.disabledText]}>
                        {description}
                    </Text>
                )}
            </View>

            {radioButton ? (
                <View style={[styles.radioOuter, value && styles.radioOuterActive]}>
                    {value && <View style={styles.radioInner} />}
                </View>
            ) : (
                <Switch
                    value={value}
                    onValueChange={onValueChange}
                    trackColor={{ false: '#bdc3c7', true: '#2ecc71' }}
                    thumbColor="#fff"
                    ios_backgroundColor="#bdc3c7"
                    disabled={disabled}
                />
            )}
        </View>
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
    textContainer: {
        flex: 1,
        marginRight: 12,
    },
    label: {
        fontSize: 16,
        color: '#34495e',
    },
    description: {
        fontSize: 13,
        color: '#7f8c8d',
        marginTop: 4,
    },
    radioOuter: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#bdc3c7',
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioOuterActive: {
        borderColor: '#2ecc71',
    },
    radioInner: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#2ecc71',
    },
    disabled: {
        opacity: 0.5,
    },
    disabledText: {
        color: '#95a5a6',
    },
});
