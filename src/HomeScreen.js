import React, { useState, useRef, useEffect } from 'react';
import {View, Image, StyleSheet, Dimensions, ScrollView, Text, TouchableOpacity, BackHandler} from 'react-native';
import StoryComponent from "./components/Story";
import PhotoSlider from '../src/components/PhotoSlider';
import service from "./services/service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getUserId} from "./services/userService";

function HomeScreen({ navigation }) {
    const [images, setImages] = useState([]);
    const [featuredProducts, setFeaturedProducts] = useState([]);

    const[stories,setStories] = useState([])

    const getSliderData = () => {
        service.getData('api/sliders-api').then(response => {
            setImages(response.sliders.map(item => "https://www.acar.kodlanabilir.com/storage/sliders/" + item.picture));
        });

        service.getData('api/storys-api').then(response => {
            setStories(response.sliders.map(item => {
                return {
                    imageUrl: "https://www.acar.kodlanabilir.com/storage/storys/" + item.picture,
                    duration : 8
                }
            }));
        });
    }

    const fetchData = async () => {
        const userId = await getUserId();

        service.getData('api/urunler/' + userId).then(response => {
            setFeaturedProducts(response.products.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                imageUrl: "https://www.acar.kodlanabilir.com/storage/products/thumbnails/" + item.picture,
            })));s
        });
    }


    useEffect(() => {
        fetchData();
        getSliderData();
        const backAction = () => {
            return true; // Returning true will prevent the back action
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove();
    }, []);

    return (
        <ScrollView style={styles.container}>
            {/* Hikaye Bileşeni */}
            <StoryComponent stories={stories} />

            {/* Öne Çıkan Ürünler */}
            <View style={styles.featuredProductsContainer}>
                <Text style={styles.featuredProductsTitle}>Öne Çıkan Ürünler</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {featuredProducts.map((product, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.featuredProductCard}
s                        >
                            <Image
                                source={{ uri: product.imageUrl }}
                                style={styles.featuredProductImage}
                                resizeMode="cover"
                            />
                            <Text style={styles.featuredProductName}>{product.name}</Text>
                            <Text style={styles.featuredProductPrice}>{product.price} TL</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* "Ürünleri Gör" Butonu */}
                <TouchableOpacity style={styles.customButton} onPress={() => navigation.navigate('Ürün Listesi')}>
                    <Text style={styles.customText}>Ürünleri Gör</Text>
                </TouchableOpacity>
            </View>

            {/* Slider */}
            <View style={styles.sliderContainer}>
                <PhotoSlider images={images} slideDuration={12000} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    sliderContainer: {
        flex: 1,
    },
    featuredProductsContainer: {
        padding: 16,
    },
    featuredProductsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333',
    },
    featuredProductCard: {
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        padding: 16,
        paddingBottom: 0,
        marginRight: 16,
        width: 180,
    },
    featuredProductImage: {
        width: '100%',
        height: 120,
        borderRadius: 8,
    },
    featuredProductName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 8,
        color: '#333',
    },
    featuredProductPrice: {
        fontSize: 14,
        color: 'green',
        marginTop: 4,
    },
    customButton: {
        backgroundColor: '#ec1c3c',
        padding: 12,
        marginTop: 16,
        borderRadius: 4,
        alignItems: 'center',
    },
    customText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16,
    }
});

export default HomeScreen;
