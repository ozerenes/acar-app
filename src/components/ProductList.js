import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import TextSlider from "./TextSlider";

const ProductList = ({ products }) => {

    const texts = ['Merhaba', 'Hello', 'Bonjour', 'Hola','test','deneme'];

    const renderProductItem = ({ item }) => (
        <View style={styles.productItem}>
            <TouchableOpacity style={styles.heart}>
                <Icon name="ios-heart-outline" size={30} color="red" />
            </TouchableOpacity>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.productItemFooter}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>{item.price} TL</Text>
            </View>

        </View>
    );

    return (
        <View>
            <TextSlider texts={texts} duration={3000} />
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
