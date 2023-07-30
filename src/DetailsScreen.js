import React, {useEffect, useState} from 'react';
import { View, Text, Button } from 'react-native';
import { getData,postData } from "./services/service";
import {get} from "react-native/Libraries/TurboModule/TurboModuleRegistry";

function DetailsScreen({navigation,route}) {

    const [product,setProduct] = useState({})

    useEffect(() => {
        getData("api/urunler/"+route.params.itemId).then(response => {
             setProduct(response.product);
        });
    },[])

    return (
        <View>
            <Text>{JSON.stringify(product)}</Text>
            <Button
                title="Go back"
                onPress={() => navigation.goBack()}
            />
        </View>
    );
}

export default DetailsScreen;
