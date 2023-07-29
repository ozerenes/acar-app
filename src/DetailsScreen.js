import React, {useEffect} from 'react';
import { View, Text, Button } from 'react-native';
import { getData,postData } from "./services/service";
import {get} from "react-native/Libraries/TurboModule/TurboModuleRegistry";

function DetailsScreen({ navigation }) {

    useEffect(() => {
        getData("api/store").then(response => {
             console.log(response);
        });
    },[])

    return (
        <View>
            <Text>Details Screen</Text>
            <Button
                title="Go back"
                onPress={() => navigation.goBack()}
            />
        </View>
    );
}

export default DetailsScreen;
