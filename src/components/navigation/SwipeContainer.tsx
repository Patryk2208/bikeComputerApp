import React, { ReactNode } from 'react';
import { PanResponder, View } from 'react-native';

interface SwipeContainerProps {
    children: ReactNode;
    onSwipeLeft: () => void;
    onSwipeRight: () => void;
}

export default function SwipeContainer({
                                           children,
                                           onSwipeLeft,
                                           onSwipeRight
                                       }: SwipeContainerProps) {
    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: (_, gestureState) => {
            return Math.abs(gestureState.dx) > 10;
        },
        onPanResponderRelease: (_, gestureState) => {
            if (gestureState.dx > 50) {
                onSwipeRight();
            } else if (gestureState.dx < -50) {
                onSwipeLeft();
            }
        }
    });

    return (
        <View {...panResponder.panHandlers} style={{ flex: 1 }}>
            {children}
        </View>
    );
}