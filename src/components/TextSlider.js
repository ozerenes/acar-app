import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const TextSlider = ({ categories,setCurrentCategory }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const changeCategory = (index,item) => {
        setCurrentIndex(index)
        setCurrentCategory(item.id)
    }

    return (
        <View style={styles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {categories.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.textContainer,
                            index === currentIndex ? styles.activeTextContainer : {},
                        ]}
                        onPress={() => changeCategory(index,item)}
                    >
                        <Text style={[styles.text, index === currentIndex ? styles.activeText : {}]}>
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
    },
    textContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    activeTextContainer: {
        backgroundColor: '#cf7381',
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
