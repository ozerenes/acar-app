import React, {useEffect, useState} from 'react';
import { View, StyleSheet } from 'react-native';
import {getData} from "./services/service";
import CategoryList from "./components/CategoryList";

const CategoryScreen = () => {

    const [categories,setCategories] = useState([]);

    useEffect(() => {
        getData('api/urunler').then(response => {
            console.log(response);
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
            <CategoryList categories={categories} />
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

export default CategoryScreen;
