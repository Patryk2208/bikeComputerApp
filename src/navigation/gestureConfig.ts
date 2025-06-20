//import { TransitionSpecs } from '@react-navigation/stack';

export const createGestureHandler = () => ({
    gestureEnabled: true,
    gestureDirection: 'horizontal',
});

// Add swipe detection for screens
export const screenSwipeGesture = {
    gestureDirection: 'horizontal',
    gestureResponseDistance: {
        horizontal: 50,
    },
};