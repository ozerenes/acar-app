import React, { useState, useEffect } from 'react';
import { View,Dimensions, Image, Text, TouchableOpacity, Modal, StyleSheet, ScrollView } from 'react-native';
const SCREEN_WIDTH = Dimensions.get("screen").width;
const StoryComponent = ({ stories }) => {
    const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
    const [timer, setTimer] = useState(null);
    const [progress, setProgress] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [currentStory,setCurrentStory] = useState(stories[currentStoryIndex])
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

    const DEFAULT_DURATION = 5; // Varsayılan süre 5 saniye

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

    useEffect(() => {
        const story =  stories[currentStoryIndex];
        setCurrentStory(story);
    },[currentStoryIndex])



    return (
        <View style={{height:115}}>
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
                        width: (progress / (currentStory?.duration || DEFAULT_DURATION)) * 100 + '%',
                    }}
                >
                </View>
            </TouchableOpacity>
            <Modal visible={showModal} transparent={true} onRequestClose={handleModalClose}>
                <View style={styles.modalContainer}>
                    <TouchableOpacity  style={styles.modalBackground} onPress={handleModalClose} />
                    <TouchableOpacity style= {styles.modalBackground}
                        onPress={(e) => {
                            const x = e.nativeEvent.pageX;
                            console.log(SCREEN_WIDTH)
                            if(x < SCREEN_WIDTH/2) {
                                console.log("geri");
                               setCurrentStoryIndex(currentStoryIndex === 0 ? (stories.length -1) : (currentStoryIndex -1) );
                            }
                            else {
                                console.log("ileri");
                                setCurrentStoryIndex(currentStoryIndex === stories.length -1 ? 0 : (currentStoryIndex +1) );
                            }

                        }}
                        style={styles.modalBackground}>
                        <Image   source={{ uri: currentStory?.imageUrl }} style={styles.modalImage} />
                    </TouchableOpacity>

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
        width: 80,
        height: 80,
        borderRadius: 5,
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
        left:'5%',
        width: '90%',
        height: '50%',
        resizeMode: 'contain',
    },
});

export default StoryComponent;
