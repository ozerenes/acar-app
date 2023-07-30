import React from 'react';
import {View, Text, Button, Image, StyleSheet, TouchableOpacity} from 'react-native';
import StoryComponent from "./components/Story";

function HomeScreen({ navigation }) {

    const stories = [
        {
            imageUrl: 'https://images.pexels.com/photos/16503530/pexels-photo-16503530/free-photo-of-man-wearing-bright-clothing-standing-in-a-muddy-field.jpeg',
            duration: 5, // 5 seconds
        },
        {
            imageUrl: 'https://images.pexels.com/photos/15134001/pexels-photo-15134001.jpeg',
            duration: 8, // 8 seconds
        },
        ,
        {
            imageUrl: 'https://images.pexels.com/photos/15134001/pexels-photo-15134001.jpeg',
            duration: 8, // 8 seconds
        },
        ,
        {
            imageUrl: 'https://images.pexels.com/photos/15134001/pexels-photo-15134001.jpeg',
            duration: 8, // 8 seconds
        },
        ,
        {
            imageUrl: 'https://images.pexels.com/photos/15134001/pexels-photo-15134001.jpeg',
            duration: 8, // 8 seconds
        },
        ,
        {
            imageUrl: 'https://images.pexels.com/photos/15134001/pexels-photo-15134001.jpeg',
            duration: 8, // 8 seconds
        },
        ,
        {
            imageUrl: 'https://images.pexels.com/photos/15134001/pexels-photo-15134001.jpeg',
            duration: 8, // 8 seconds
        },
        ,
        {
            imageUrl: 'https://images.pexels.com/photos/15134001/pexels-photo-15134001.jpeg',
            duration: 8, // 8 seconds
        },
        // Add more stories as needed
    ];

    return (
        <View style={{flex: 1}}>
            <StoryComponent stories={stories} />
            <View style={{flexDirection: 'row', flex: 1}}>
                <Image source={require('../assets/cups.jpg')} style={styles.modalImage} />
                <View style={styles.rightPanel}>
                    <Text>Hoşgeldiniz</Text>
                    <TouchableOpacity style={styles.customButton}>
                        <Text style={styles.customText}>Ürünler</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    modalImage: {
        height: '100%',
        width: 220,
        borderTopRightRadius: 550,
        borderBottomRightRadius: 350,
    },
    rightPanel: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    customButton: {
        backgroundColor: '#ec1c3c',
        padding: 15,
        marginTop: 85,
        borderRadius: 4,
        marginLeft: 55,
    },
    customText: {
        color: '#fff'
    }
});

export default HomeScreen;
