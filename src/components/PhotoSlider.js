import React, { useState, useRef, useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions, ScrollView } from 'react-native';

const PhotoSlider = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollViewRef = useRef();

    useEffect(() => {
        const numSlides = images.length;
        const timer = setInterval(() => {
            if (currentIndex < numSlides - 1) {
                setCurrentIndex((prevIndex) => prevIndex + 1);
                scrollViewRef.current.scrollTo({
                    x: (currentIndex + 1) * Dimensions.get('window').width,
                    animated: true,
                });
            } else {
                setCurrentIndex(0);
                scrollViewRef.current.scrollTo({ x: 0, animated: true });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [currentIndex, images]);

    return (
        <View style={styles.container}>
            <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                scrollEnabled={false}
            >
                {images.map((image, index) => (
                    <View key={index} style={styles.slide}>
                        <Image source={{ uri: image }} style={styles.image} />
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 15
    },
    slide: {
        width: Dimensions.get('window').width,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: Dimensions.get('window').width - 50,
        height: 200,
    },
});

export default PhotoSlider;
