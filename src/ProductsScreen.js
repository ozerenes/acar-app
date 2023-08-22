import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import ProductList from './components/ProductList';
import service from "./services/service";
import { getUserId } from "./services/userService";
import Loading from "../src/components/Loading";
import Icon from "react-native-vector-icons/Ionicons";

const ProductsScreen = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loadingStatus, setLoadingStatus] = useState(false);
    const [isFilterOpen, setFilterOpen] = useState(false);


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const userId = await getUserId();
        setLoadingStatus(true)
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
            setLoadingStatus(false)
        });
    }


    const handleFilterToggle = () => {
        setFilterOpen(!isFilterOpen);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleFilterToggle} style={styles.filterButton}>
                            <Icon name={"filter-outline"} color={"#fff"} size={30} />
                            <Text style={styles.filterButtonText}>Filtrele</Text>
            </TouchableOpacity>
            {
                loadingStatus ? <Loading/> :
                    <ProductList isFilterOpen={isFilterOpen} products={products} categories={categories} />

            }
        </View>
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
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    filterButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 15,
        fontSize: 16
    },
});

export default ProductsScreen;
