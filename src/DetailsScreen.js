import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import service from "./services/service";
import {getUserId} from "./services/userService";
import Notification from "./components/Notification";

function DetailsScreen({ navigation, route }) {
    const [product, setProduct] = useState({});
    const [notificationVisible, setNotificationVisible] = useState(false);

    const showNotification = () => {
        setNotificationVisible(true);
    };

    const closeNotification = () => {
        setNotificationVisible(false);
    };

    useEffect(() => {
        service.getData("api/urundetay/" + route.params.itemId).then(response => {
            setProduct(response.product);
        });
    }, []);
    const addToCart =  async () => {
        const userId = await getUserId();
        service.getData(`api/add-to-cart-api/${userId}/${product.id}/1`).then((response) => {
            showNotification();
        });
        setTimeout(() => {
            closeNotification();
        },5000)
    }

    return (
        <>
            {notificationVisible && (
                <Notification message="Ürün sepete eklendi." onClose={closeNotification} />
            )}
            <ScrollView contentContainerStyle={styles.container}>
                <Image
                    source={{ uri: "https://www.acar.kodlanabilir.com/storage/products/thumbnails/" + product.picture }}
                    style={styles.productImage}
                />
                <View style={styles.detailsContainer}>
                    <Text style={styles.productName}>{product.name}</Text>
                    <Text style={styles.price}>{product.price} TL</Text>
                    <Text style={styles.description}>{product.description}</Text>
                </View>
                <TouchableOpacity onPress={() => {
                    if(product.stock > 0){
                        addToCart()
                    }
                }} style={[styles.addToCartButton,product.stock < 1 && styles.opac]}>
                    <Text style={styles.addToCartButtonText}>{product.stock < 1 ? "Ürün Yok" : "Sepete Ekle"}</Text>
                </TouchableOpacity>
            </ScrollView>
        </>

    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
    },
    productImage: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
        borderRadius: 8,
    },
    detailsContainer: {
        marginTop: 20,
    },
    productName: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#040404',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 20,
    },
    addToCartButton: {
        backgroundColor: '#ec1c3c',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 4,
        marginBottom: 10,
    },
    addToCartButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buyNowButton: {
        backgroundColor: '#FF4D4D',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 4,
    },
    buyNowButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    opac:{
        opacity: 0.4
    }
});

export default DetailsScreen;
