import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import service from "./services/service";

function DetailsScreen({ navigation, route }) {
    const [product, setProduct] = useState({});

    const stripHtmlTags = (htmlString) => {
        return htmlString.replace(/<[^>]+>/g, '');
    };

    useEffect(() => {
        service.getData("api/urundetay/" + route.params.itemId).then(response => {
            setProduct(response.product);
        });
    }, []);

    return (
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
            <TouchableOpacity style={styles.addToCartButton}>
                <Text style={styles.addToCartButtonText}>Sepete Ekle</Text>
            </TouchableOpacity>
        </ScrollView>
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
        color: '#FABE00',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 20,
    },
    addToCartButton: {
        backgroundColor: '#FABE00',
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
});

export default DetailsScreen;
