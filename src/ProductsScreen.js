import React, {useEffect, useState} from 'react';
import { View, StyleSheet } from 'react-native';
import ProductList from './components/ProductList';
import {getData} from "./services/service";
import MainComponent from './components/Filter';

const products = [
    { id: 1, name: 'Ürün 1', price: 100, image: "https://www.acar.kodlanabilir.com/storage/products/thumbnails/product-97-main-try-07-24-2023_04-25-pm.jpg" },
    { id: 2, name: 'Ürün 2', price: 150, image: "https://www.acar.kodlanabilir.com/storage/products/thumbnails/product-97-main-try-07-24-2023_04-25-pm.jpg" },
    { id: 3, name: 'Ürün 3', price: 200, image: "https://www.acar.kodlanabilir.com/storage/products/thumbnails/product-97-main-try-07-24-2023_04-25-pm.jpg" },
];

const ProductsScreen = () => {

    const [products,setProducts] = useState([]);
    const [categories,setCategories] = useState([]);

    useEffect(() => {
        getData('api/urunler').then(response => {
            console.log(response);
            console.log("test")
            setProducts(response.products.map(item => {
                return {
                    id : item.id,
                    name: item.name,
                    price : item.price,
                    image :"https://www.acar.kodlanabilir.com/storage/products/thumbnails/"+item.picture,
                }
            }));
            setCategories(response.categories.map(item => {
                return {
                    id : item.id,
                    name: item.name,
                    image :"https://www.acar.kodlanabilir.com/storage/products/thumbnails/"+item.picture,
                }
            }));
        });
    },[]);


    return (
        <View style={styles.container}>
            <ProductList products={products} categories={categories} />
            <MainComponent data={categories}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fdf9f9',
    },
});

export default ProductsScreen;
