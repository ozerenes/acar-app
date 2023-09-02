import React, {useEffect, useState} from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity ,Dimensions } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import service from "./services/service";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUserId} from "./services/userService";

const screenWidth = Dimensions.get('window').width / 2;
const CategoryProductScreen = ({ route }) => {
    const navigation = useNavigation();

    const [products,setProducts]  = useState([]);

    useEffect(() => {

            fetchData()

    },[route.params.currentCategory])


    const fetchData = async () => {

        const userId = await getUserId();
        service.getData('api/category/'+userId+'/'+route.params.currentCategory).then(response => {
            setProducts(
                response.products.map(item => {
                    return {
                        id : item.id,
                        name: item.name,
                        price : item.price,
                        image :"https://www.acar.kodlanabilir.com/storage/products/thumbnails/"+item.picture,
                        ...item
                    }
                })
            );
        });
    }

    const likeUnlike = async (product_id, like) => {
        const userId = JSON.parse(await AsyncStorage.getItem('user')).id;
        let url = "product-like"
        if (like) {
            url = 'product-unlike'
        }
        url = `api/${url}`;
        let params = {
            userid : userId,
            productid : product_id
        }

        service.postData(url,params).then(response => {
            if(response === 'OK'){
                setProducts(products.map(item => {
                    if(item.id == product_id){
                        return {
                            ...item,
                            liked : !like,
                        }
                    }
                    else{
                        return  item;
                    }

                }))
            }
        })
    }

    const renderProductItem = ({ item ,index }) => {
        return (
            <View style={[(products.length - 1 === index) ? styles.lastItem : styles.productItem]}>
                <TouchableOpacity onPress={() => {
                    likeUnlike(item.id, item.liked)
                }} style={styles.heart}>
                    <Icon name={item.liked ? "ios-heart" : "ios-heart-outline"} size={30} color="red" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Detaylar', {
                            itemId: item.id,
                        })
                    }}>
                    <Image source={{uri: item.image}} style={styles.productImage}/>
                    <View style={styles.productItemFooter}>
                        <Text style={styles.productName}>{item.name}</Text>
                        <Text style={styles.productPrice}>{item.price} TL</Text>
                    </View>
                </TouchableOpacity>

            </View>
        )
    };



    return (
        <View>
            <FlatList
                style={{marginTop: 15}}
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
        backgroundColor: '#f0f0f0',
    },
    productItem: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        margin: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    productImage: {
        width: 100,
        height: 100,
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
        alignItems: 'center',
        justifyContent: 'center'
    },
    heart: {
        width: 28,
        height: 28,
        position: "absolute",
        zIndex: 122122,
        right: 15,
        top: 15
    },
    lastItem: {
        width: screenWidth - 15,
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        margin: 8,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default CategoryProductScreen;
