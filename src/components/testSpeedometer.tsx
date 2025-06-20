import React, {/*useState*/} from 'react';
import {Button, SafeAreaView, StyleSheet, Text, View} from "react-native";

function TestSpeedometer(props: {speed: number, isPressed: boolean, color?: string}) {
    //const speed = props.speed;
    //const color = props.color;
    const isPressed = props.isPressed;
    return (
        <div>
            <h1>Multiple File Structure</h1>
            <SafeAreaView style={styles.container}>
                <View style={[styles.buttonContainer, isPressed && styles.redBackground]}>
                    <Button
                        title={isPressed ? "Red Button" : "Press Me"}
                        //onPress={() => }
                        color={isPressed ? "white" : "#2196F3"}
                    />
                </View>
                <Text style={styles.statusText}>
                    {isPressed ? "Button is RED" : "Button is DEFAULT"}
                </Text>
            </SafeAreaView>
        </div>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    buttonContainer: {
        margin: 20,
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#f0f0f0',
    },
    redBackground: {
        backgroundColor: 'red',
    },
    statusText: {
        marginTop: 20,
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default TestSpeedometer;