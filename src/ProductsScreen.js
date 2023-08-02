import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import ProductList from './components/ProductList';
import { getData } from "./services/service";

const ProductsScreen = ({isFilterOpen}) => {

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getData('api/urunler').then(response => {
            setProducts(response.products.map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    image: "https://www.acar.kodlanabilir.com/storage/products/thumbnails/" + item.picture,
                }
            }));
            setCategories(response.categories.map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    image: "https://www.acar.kodlanabilir.com/storage/products/thumbnails/" + item.picture,
                }
            }));
        });
    }, []);


    return (
        <SafeAreaView style={styles.container}>
            <ProductList isFilterOpen={isFilterOpen} products={products} categories={categories} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    }
});

export default ProductsScreen;
