import React, {useEffect, useState} from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import TextSlider from "./TextSlider";
import service from "../services/service";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from "axios";

const ProductList = ({ categories }) => {
    const navigation = useNavigation();

    const [products,setProducts]  = useState([]);
    const [currentCategory,setCurrentCategory] = useState(categories[0]?.id ?? 0);

    useEffect(() => {
        if(currentCategory){
            service.getData('api/category/'+ currentCategory).then(response => {
                setProducts(
                    response.products.map(item => {
                        return {
                            id : item.id,
                            name: item.name,
                            price : item.price,
                            image :"https://www.acar.kodlanabilir.com/storage/products/thumbnails/"+item.picture,
                        }
                    })
                );
            });
        }
    },[currentCategory])


    const likeUnlike = async (product_id,like) => {
        const userId = JSON.parse(await AsyncStorage.getItem('user')).userId;
        let url = "product-like"
        if(!like){
            url = 'product-unlike'
        }
        url = `api/${url}/${product_id}/${userId}`;

        console.log(url);
        service.getData(url).then(response => {
            console.log(response);
        })
    }

    const renderProductItem = ({ item }) => (
        <View style={styles.productItem}>
            <TouchableOpacity onPress={() => {
                likeUnlike(item.id,1)
            }} style={styles.heart}>
                <Icon name="ios-heart-outline" size={30} color="red" />
            </TouchableOpacity>
            <TouchableOpacity
             onPress={ () => {
                navigation.navigate('Details', {
                 itemId: item.id,
             })}}>
                <Image source={{ uri: item.image }} style={styles.productImage} />
                <View style={styles.productItemFooter}>
                    <Text style={styles.productName}>{item.name}</Text>
                    <Text style={styles.productPrice}>{item.price} TL</Text>
                </View>
            </TouchableOpacity>

        </View>
    );

    return (
        <View>
            <TextSlider categories={categories}  setCurrentCategory={setCurrentCategory} />
            <FlatList
                data={products}
                renderItem={renderProductItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.container}
                numColumns={2} // İki elemanı yan yana sıralamak için numColumns'u 2 olarak ayarlayın
            />
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fdf9f9',
    },
    productItem: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#040404',
        paddingVertical: 15,
        alignItems: 'center', // Elemanları yatayda merkezlemek için alignItems'u 'center' olarak ayarlayın
        maxWidth: '50%', // Yan yana sıralanan elemanların maksimum genişliğini yüzde 50 olarak ayarlayın
        borderBottomWidth: 0,
        borderRightWidth: 0
        },
    productImage: {
        width: 100,
        height: 100,
        marginBottom: 5,
        resizeMode: 'contain',
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    productPrice: {
        fontSize: 14,
        color: '#666',
    },
    productItemFooter: {
        width: '100%',
        paddingLeft: 15
    },
    heart: {
        width: 28,
        height: 28,
        position: "absolute",
        zIndex:122122,
        right: 15,
        top: 15
    }
});

export default ProductList;
