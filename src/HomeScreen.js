import React, {useEffect, useState} from 'react';
import {View, Text, Button, Image, StyleSheet, TouchableOpacity} from 'react-native';
import StoryComponent from "./components/Story";
import PhotoSlider from '../src/components/PhotoSlider';
import service from "./services/service";
import AsyncStorage from "@react-native-async-storage/async-storage";

function HomeScreen({ navigation }) {


    const [images,setImages] = useState([])

    const stories = [
        {
            imageUrl: 'https://images.pexels.com/photos/16503530/pexels-photo-16503530/free-photo-of-man-wearing-bright-clothing-standing-in-a-muddy-field.jpeg',
            duration: 8, // 5 seconds
        },
        {
            imageUrl: 'https://images.pexels.com/photos/15134001/pexels-photo-15134001.jpeg',
            duration: 8, // 8 seconds
        },
        {
            imageUrl: 'https://images.pexels.com/photos/15134001/pexels-photo-15134001.jpeg',
            duration: 8, // 8 seconds
        },
        {
            imageUrl: 'https://images.pexels.com/photos/15134001/pexels-photo-15134001.jpeg',
            duration: 8, // 8 seconds
        },
        {
            imageUrl: 'https://images.pexels.com/photos/15134001/pexels-photo-15134001.jpeg',
            duration: 8, // 8 seconds
        },
        {
            imageUrl: 'https://images.pexels.com/photos/15134001/pexels-photo-15134001.jpeg',
            duration: 8, // 8 seconds
        },
        {
            imageUrl: 'https://images.pexels.com/photos/15134001/pexels-photo-15134001.jpeg',
            duration: 8, // 8 seconds
        },
        {
            imageUrl: 'https://images.pexels.com/photos/15134001/pexels-photo-15134001.jpeg',
            duration: 8, // 8 seconds
        },
        // Add more stories as needed
    ];

    useEffect(() => {
        service.getData('api/sliders-api').then(response => {
            setImages(response.sliders.map(item => "https://www.acar.kodlanabilir.com/storage/sliders/"+item.picture));
        });
    },[]);

    return (
        <View style={{flex: 1}}>
            <StoryComponent stories={stories} />
            <View style={{flexDirection: 'row', flex: 1}}>
                <PhotoSlider images={images} slideDuration={4000} />
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
        color: '#ffffff'
    }
});

export default HomeScreen;
