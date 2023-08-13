import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated, Easing } from 'react-native';

const LoadingComponent = () => {
    const rotateAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        startAnimation();
    }, []);

    const startAnimation = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(rotateAnim, {
                    toValue: 1,
                    duration: 1000,
                    easing: Easing.linear,
                    useNativeDriver: false,
                }),
                Animated.timing(rotateAnim, {
                    toValue: 0,
                    duration: 1000,
                    easing: Easing.linear,
                    useNativeDriver: false,
                }),
            ])
        ).start();

        Animated.loop(
            Animated.sequence([
                Animated.timing(scaleAnim, {
                    toValue: 1.2,
                    duration: 1500,
                    easing: Easing.ease,
                    useNativeDriver: false,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 1500,
                    easing: Easing.ease,
                    useNativeDriver: false,
                }),
            ])
        ).start();
    };

    const rotateInterpolation = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.animationContainer, { transform: [{ rotate: rotateInterpolation }, { scale: scaleAnim }] }]}>
            </Animated.View>
            <Image source={require('../../assets/acar.png')} style={styles.logo} resizeMode="contain" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#ec1c3c",
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 999999,
        width: '100%',
        height: '100%',
    },
    animationContainer: {
        width: 160,
        height: 160,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 16,
    },
    logo: {
        width: 160,
        height: 160,
        position: "absolute"
    },
});

export default LoadingComponent;
