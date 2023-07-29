import React, {useEffect, useState} from 'react';
import { View, StyleSheet } from 'react-native';
import ProductList from './components/ProductList';
import {getData} from "./services/service";
const products = [
    { id: 1, name: 'Ürün 1', price: 100, image: "https://www.acar.kodlanabilir.com/storage/products/thumbnails/product-97-main-try-07-24-2023_04-25-pm.jpg" },
    { id: 2, name: 'Ürün 2', price: 150, image: "https://www.acar.kodlanabilir.com/storage/products/thumbnails/product-97-main-try-07-24-2023_04-25-pm.jpg" },
    { id: 3, name: 'Ürün 3', price: 200, image: "https://www.acar.kodlanabilir.com/storage/products/thumbnails/product-97-main-try-07-24-2023_04-25-pm.jpg" },
];

const ProductsScreen = () => {

    const [products,setProducts] = useState([]);

    useEffect(() => {
        getData('api/urunler').then(response => {
            console.log(response);
            setProducts(response.products.map(item => {
                return {
                    id : item.id,
                    name: item.name,
                    price : item.price,
                    image :"https://www.acar.kodlanabilir.com/storage/products/thumbnails/"+item.picture,
                }
            }));
        });
    },[]);


    return (
        <View style={styles.container}>
            <ProductList products={products} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        paddingTop: 50,
    },
});

export default ProductsScreen;
