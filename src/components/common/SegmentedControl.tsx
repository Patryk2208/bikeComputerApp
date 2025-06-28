import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface SegmentedControlProps {
    options: { label: string; value: number; }[];
    selectedValue: number;
    onValueChange: (value: number) => void;
}

export default function SegmentedControl({
                                                               options,
                                                               selectedValue,
                                                               onValueChange
                                                           } : SegmentedControlProps){
    return (
        <View style={styles.container}>
            {options.map((option, index) => (
                <TouchableOpacity
                    key={option.value}
                    style={[
                        styles.segment,
                        index === 0 && styles.firstSegment,
                        index === options.length - 1 && styles.lastSegment,
                        option.value === selectedValue && styles.activeSegment
                    ]}
                    onPress={() => onValueChange(option.value)}
                    activeOpacity={0.7}
                >
                    <Text style={[
                        styles.text,
                        option.value === selectedValue && styles.activeText
                    ]}>
                        {option.label}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 40,
        borderRadius: 8,
        backgroundColor: '#f1f2f6',
        overflow: 'hidden',
        marginVertical: 8,
    },
    segment: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderLeftWidth: 1,
        borderLeftColor: '#dfe4ea',
    },
    firstSegment: {
        borderLeftWidth: 0,
    },
    lastSegment: {
        borderRightWidth: 0,
    },
    activeSegment: {
        backgroundColor: '#3498db',
    },
    text: {
        fontSize: 16,
        color: '#7f8c8d',
        fontWeight: '500',
    },
    activeText: {
        color: '#fff',
        fontWeight: '600',
    },
});