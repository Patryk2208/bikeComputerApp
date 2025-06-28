import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface SettingsSectionProps {
    title: string;
    children: React.ReactNode;
}

export default function SettingsSection({ title, children }: SettingsSectionProps) {
    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <View style={styles.sectionContent}>
                {children}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    section: {
        marginBottom: 24,
        backgroundColor: '#fff',
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 2,
    },
    sectionTitle: {
        backgroundColor: '#f1f2f6',
        paddingVertical: 12,
        paddingHorizontal: 16,
        fontSize: 18,
        fontWeight: '600',
        color: '#2c3e50',
    },
    sectionContent: {
        paddingHorizontal: 8,
    },
});