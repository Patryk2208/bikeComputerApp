import React, { useState, /*useEffect*/ } from 'react';
import { View, Text, StyleSheet, /*FlatList,*/ TouchableOpacity, StatusBar, TextInput } from 'react-native';
//import RideCard from '../../components/history/RideCard';
import FilterModal from '../../components/history/FilterModal';
//import EmptyState from '../../components/history/EmptyState';
//import { useRideStore } from '../../../services/stores/useRideStore';
import Icon from '@react-native-vector-icons/material-icons';

export default function HistoryScreen() {
    //const { rides, loadAllRides } = useRideStore();
    const [showFilters, setShowFilters] = useState(false);
    const [filter, setFilter] = useState<'all' | 'week' | 'month' | 'year'>('all');
    const [searchQuery, setSearchQuery] = useState('');

    /*useEffect(() => {
        loadAllRides();
    }, []);*/

    /*const filteredRides = rides.filter(ride => {
        const now = Date.now();
        const rideDate = ride.start_time;

        if (filter === 'week' && (now - rideDate) > 7 * 24 * 60 * 60 * 1000) return false;
        if (filter === 'month' && (now - rideDate) > 30 * 24 * 60 * 60 * 1000) return false;
        if (filter === 'year' && (now - rideDate) > 365 * 24 * 60 * 60 * 1000) return false;

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            const dateStr = new Date(rideDate).toLocaleDateString().toLowerCase();
            const nameStr = ride.name?.toLowerCase() || '';
            return dateStr.includes(query) || nameStr.includes(query);
        }

        return true;
    });*/

    /*const handleRidePress = (rideId: number) => {
        navigation.navigate('RideDetails', { rideId });
    };*/

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            <View style={styles.header}>
                <Text></Text>
                <Text style={styles.title}>Ride History</Text>
                <TouchableOpacity onPress={() => setShowFilters(true)}>
                    <Icon name="filter-list" size={28} color="#3498db" />
                </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
                <Icon name="search" size={24} color="#95a5a6" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search rides..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholderTextColor="#95a5a6"
                />
                {searchQuery ? (
                    <TouchableOpacity onPress={() => setSearchQuery('')}>
                        <Icon name="close" size={24} color="#95a5a6" />
                    </TouchableOpacity>
                ) : null}
            </View>

            <View style={styles.statsContainer}>
                {/*<View style={styles.statCard}>
                    <Text style={styles.statValue}>{filteredRides.length}</Text>
                    <Text style={styles.statLabel}>Rides</Text>
                </View>
                <View style={styles.statCard}>
                    <Text style={styles.statValue}>
                        {filteredRides.reduce((sum, ride) => sum + ride.total_distance, 0).toFixed(1)} km
                    </Text>
                    <Text style={styles.statLabel}>Distance</Text>
                </View>
                <View style={styles.statCard}>
                    <Text style={styles.statValue}>
                        {filteredRides.reduce((sum, ride) => sum + ride.elevation_gain, 0).toFixed(0)} m
                    </Text>
                    <Text style={styles.statLabel}>Elevation</Text>
                </View>*/}
                <View><Text>Placeholder</Text></View>
            </View>

            {/*{filteredRides.length > 0 ? (
                <FlatList
                    data={filteredRides}
                    keyExtractor={item => item.id?.toString() || Date.now().toString()}
                    renderItem={({ item }) => (
                        <RideCard
                            ride={item}
                            onPress={() => handleRidePress(item.id!)}
                        />
                    )}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />
            ) : (
                <EmptyState onAddRide={() => navigation.navigate('Ride')} />
            )}*/}

            <FilterModal
                visible={showFilters}
                onClose={() => setShowFilters(false)}
                currentFilter={filter}
                onFilterChange={setFilter}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2c3e50',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        margin: 16,
        paddingHorizontal: 16,
        height: 50,
        elevation: 2,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#2c3e50',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 16,
        backgroundColor: '#fff',
        marginHorizontal: 16,
        borderRadius: 12,
        elevation: 2,
        marginBottom: 16,
    },
    statCard: {
        alignItems: 'center',
    },
    statValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2c3e50',
    },
    statLabel: {
        fontSize: 14,
        color: '#7f8c8d',
        marginTop: 4,
    },
    listContent: {
        paddingHorizontal: 16,
        paddingBottom: 32,
    },
});