import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import Icon from '@react-native-vector-icons/material-icons';

interface FilterModalProps {
    visible: boolean;
    onClose: () => void;
    currentFilter: 'all' | 'week' | 'month' | 'year';
    onFilterChange: (filter: 'all' | 'week' | 'month' | 'year') => void;
}

export default function FilterModal({
                                                     visible,
                                                     onClose,
                                                     currentFilter,
                                                     onFilterChange
                                                 } : FilterModalProps) {
    const filters = [
        { id: 'all', label: 'All Rides' },
        { id: 'week', label: 'This Week' },
        { id: 'month', label: 'This Month' },
        { id: 'year', label: 'This Year' },
    ];

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Filter Rides</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Icon name="close" size={24} color="#7f8c8d" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.filterList}>
                        {filters.map(filter => (
                            <TouchableOpacity
                                key={filter.id}
                                style={[
                                    styles.filterItem,
                                    currentFilter === filter.id && styles.selectedFilter
                                ]}
                                onPress={() => {
                                    onFilterChange(filter.id as any);
                                    onClose();
                                }}
                            >
                                <Text style={[
                                    styles.filterText,
                                    currentFilter === filter.id && styles.selectedFilterText
                                ]}>
                                    {filter.label}
                                </Text>
                                {currentFilter === filter.id && (
                                    <Icon name="check" size={20} color="#3498db" />
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 24,
        paddingBottom: 40,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2c3e50',
    },
    filterList: {
        marginBottom: 16,
    },
    filterItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ecf0f1',
    },
    selectedFilter: {
        backgroundColor: '#f8f9fa',
    },
    filterText: {
        fontSize: 16,
        color: '#2c3e50',
    },
    selectedFilterText: {
        fontWeight: 'bold',
        color: '#3498db',
    },
});