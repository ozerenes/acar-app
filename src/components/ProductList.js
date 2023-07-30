import React, {useEffect, useState} from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import TextSlider from "./TextSlider";
import {getData} from "../services/service";
import { useNavigation } from '@react-navigation/native';

import axios from "axios";

const ProductList = ({ categories }) => {
    const navigation = useNavigation();

    const [products,setProducts]  = useState([]);
    const [currentCategory,setCurrentCategory] = useState(categories[0]?.id ?? 0);

    useEffect(() => {
        if(currentCategory){
            getData('api/category/'+ currentCategory).then(response => {
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

    const renderProductItem = ({ item }) => (
        <View style={styles.productItem}>
            <TouchableOpacity style={styles.heart}>
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
        backgroundColor: '#fff',
    },
    productItem: {
        flex: 1,
        marginBottom: 20, // Yan yana elemanların arasında boşluk bırakmak için marginBottom ekleyin
        borderWidth: 1,
        paddingVertical: 15,
        borderColor: '#ccc',
        alignItems: 'center', // Elemanları yatayda merkezlemek için alignItems'u 'center' olarak ayarlayın
        maxWidth: '50%', // Yan yana sıralanan elemanların maksimum genişliğini yüzde 50 olarak ayarlayın
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
        right: 15,
        top: 15
    }
});

export default ProductList;
