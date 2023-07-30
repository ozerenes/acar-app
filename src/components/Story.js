import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';

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
        // Handle when a user taps on the screen to go to the next story or exit
        if (currentStoryIndex === stories.length - 1) {
            // End of stories, exit the story view
            setCurrentStoryIndex(0);
            setProgress(0);
        } else {
            // Go to the next story
            setCurrentStoryIndex((prevIndex) => prevIndex + 1);
            setProgress(0);
            startTimer();
        }
    };

    const handleThumbnailPress = () => {
        // Show the full-screen image when a thumbnail is pressed
        setShowModal(true);
    };

    const handleModalClose = () => {
        // Close the full-screen image modal
        setShowModal(false);
    };
    const renderThumbnails = () => {
        if (stories.length === 0) {
            return null;
        }

        return (
            <View style={styles.thumbnailContainer}>
                {stories.map((story, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => setCurrentStoryIndex(index)}
                        onPressIn={handleThumbnailPress} // Değişiklik burada
                        style={[styles.thumbnail, index === currentStoryIndex && styles.activeThumbnail]}
                    >
                        <Image source={{ uri: story.imageUrl }} style={styles.thumbnailImage} />
                    </TouchableOpacity>
                ))}
            </View>
        );
    };


    const currentStory = stories[currentStoryIndex];

    return (
        <View style={{ flex: 1 }}>
            {renderThumbnails()}
            <TouchableOpacity onPress={handleThumbnailPress} activeOpacity={1} style={{ flex: 1 }}>
                <View
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 5,
                        backgroundColor: '#fff',
                    }}
                >
                    <View
                        style={{
                            width: `${(progress / currentStory.duration) * 100}%`,
                            height: 5,
                            backgroundColor: '#55acee',
                        }}
                    />
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
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
    },
    thumbnail: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginHorizontal: 5,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: '#fff',
    },
    activeThumbnail: {
        borderColor: '#55acee',
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
