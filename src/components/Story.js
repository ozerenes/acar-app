import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, Modal, StyleSheet, ScrollView } from 'react-native';

const StoryComponent = ({ stories }) => {
    const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
    const [timer, setTimer] = useState(null);
    const [progress, setProgress] = useState(0);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        startTimer();
        return () => {
            clearInterval(timer);
        };
    }, [currentStoryIndex]);

    const startTimer = () => {
        if (timer) clearInterval(timer);
        const newTimer = setInterval(() => {
            setProgress((prevProgress) => prevProgress + 1);
        }, 1000);
        setTimer(newTimer);
    };

    const handleStoryPress = () => {
        if (currentStoryIndex === stories.length - 1) {
            setCurrentStoryIndex(0);
            setProgress(0);
        } else {
            setCurrentStoryIndex((prevIndex) => prevIndex + 1);
            setProgress(0);
            startTimer();
        }
    };

    const handleThumbnailPress = (index) => {
        setCurrentStoryIndex(index);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const renderThumbnails = () => {
        return (
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.thumbnailContainer}
            >
                {stories.map((story, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => handleThumbnailPress(index)}
                        style={[styles.thumbnail, index === currentStoryIndex && styles.activeThumbnail]}
                    >
                        <Image source={{ uri: story.imageUrl }} style={styles.thumbnailImage} />
                    </TouchableOpacity>
                ))}
            </ScrollView>
        );
    };

    const currentStory = stories[currentStoryIndex];

    return (
        <View style={{ flex: 1 }}>
            {renderThumbnails()}
            <TouchableOpacity onPress={handleStoryPress} activeOpacity={1} style={{ flex: 1 }}>
                <View
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 5,
                        backgroundColor: '#f48c9c',
                        width: (progress / (currentStory.duration || 5)) * 100 + '%',
                    }}
                >
                </View>
            </TouchableOpacity>
            <Modal visible={showModal} transparent={true} onRequestClose={handleModalClose}>
                <View style={styles.modalContainer}>
                    <TouchableOpacity style={styles.modalBackground} onPress={handleModalClose} />
                    <Image source={{ uri: currentStory.imageUrl }} style={styles.modalImage} />
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    thumbnailContainer: {
        flexDirection: 'row',
        paddingVertical: 15,
    },
    thumbnail: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginHorizontal: 5,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: '#A0A0A0',
    },
    activeThumbnail: {
        borderColor: '#cf7381',
    },
    thumbnailImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBackground: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
    },
    modalImage: {
        width: '80%',
        height: '80%',
        resizeMode: 'contain',
    },
});

export default StoryComponent;
