import React from 'react';
import { View, Text, Button } from 'react-native';

function HomeScreen({ navigation }) {
    return (
        <View>
            <Text>Home Screen2</Text>
            <Button
                title="Go to Details"
                onPress={() => navigation.navigate('Details')}
            />
            <Button
                title="Go to Contact"
                onPress={() => navigation.navigate('Contact')}
            />
        </View>
    );
}

export default HomeScreen;
