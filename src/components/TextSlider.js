import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const TextSlider = ({ texts, duration = 2000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === texts.length - 1 ? 0 : prevIndex + 1
            );
        }, duration);

        return () => clearInterval(interval);
    }, [texts, duration]);

    return (
        <View style={styles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {texts.map((text, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.textContainer,
                            index === currentIndex ? styles.activeTextContainer : {},
                        ]}
                        onPress={() => setCurrentIndex(index)}
                    >
                        <Text style={[styles.text, index === currentIndex ? styles.activeText : {}]}>
                            {text}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
    },
    textContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    activeTextContainer: {
        backgroundColor: 'gray',
        borderRadius: 10,
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    activeText: {
        color: 'white',
    },
});

export default TextSlider;
