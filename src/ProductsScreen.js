import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import ProductList from './components/ProductList';
import service from "./services/service";
import { getUserId } from "./services/userService";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProductsScreen = ({ isFilterOpen }) => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const userId = await getUserId();

        service.getData('api/urunler/' + userId).then(response => {
            setProducts(response.products.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                image: "https://www.acar.kodlanabilir.com/storage/products/thumbnails/" + item.picture,
            })));
            setCategories(response.categories.map(item => ({
                id: item.id,
                name: item.name,
                image: "https://www.acar.kodlanabilir.com/storage/products/thumbnails/" + item.picture,
            })));
        });
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.filterButton} onPress={() => console.log("Filter Pressed")}>
                    <Text style={styles.filterButtonText}>Filtrele</Text>
                </TouchableOpacity>
            </View>
            <ProductList isFilterOpen={isFilterOpen} products={products} categories={categories} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    header: {
        padding: 16,
        backgroundColor: '#fff',
    },
    filterButton: {
        backgroundColor: '#ec1c3c',
        padding: 12,
        borderRadius: 8,
        alignSelf: 'flex-end',
    },
    filterButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default ProductsScreen;
