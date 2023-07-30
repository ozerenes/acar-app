import React from 'react';
import { View, Text, Button } from 'react-native';
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
        // Add more stories as needed
    ];

    return (
        <View style={{height:100}}>
            <StoryComponent stories={stories} />
        </View>
    );
}

export default HomeScreen;
