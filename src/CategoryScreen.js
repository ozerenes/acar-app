import React, {useEffect, useState} from 'react';
import { View, StyleSheet } from 'react-native';
import service from "./services/service";
import CategoryList from "./components/CategoryList";
import {getUserId} from "./services/userService";

const CategoryScreen = () => {

    const [categories,setCategories] = useState([]);

    useEffect(() => {
        fetchData();
    },[]);

    const fetchData = async () => {

        const userId = await getUserId();
        service.getData('api/urunler/'+userId).then(response => {
            console.log(response);
            setCategories(response.categories.map(item => {
                return {
                    id : item.id,
                    name: item.name,
                    image :"https://www.acar.kodlanabilir.com/storage/categories/"+item.picture,
                }
            }));
        });
    }


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
    },
});

export default CategoryScreen;
