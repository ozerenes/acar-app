import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Image, TouchableOpacity, Text } from 'react-native';
import service from "./services/service";
import { getUserId } from "./services/userService";
import {useNavigation} from "@react-navigation/native";

const CategoryScreen = () => {
    const navigation =useNavigation()

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const userId = await getUserId();
        service.getData('api/urunler/' + userId).then(response => {
            setCategories(response.categories.map(item => ({
                id: item.id,
                name: item.name,
                image: "https://www.acar.kodlanabilir.com/storage/categories/" + item.picture,
            })));
        });
    }

    const renderCategoryItem = ({ item }) => (
        <TouchableOpacity onPress={
            () => {
                navigation.navigate('CatPro', {
                    currentCategory: item.id
                })
            }
        } style={styles.categoryItem}>
            <Image source={{ uri: item.image }} style={styles.categoryImage} resizeMode="cover" />
            <Text style={styles.categoryName}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={categories}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContainer}
                numColumns={2}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    listContainer: {
        padding: 8,
    },
    categoryItem: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        margin: 8,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    categoryImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 8,
    },
    categoryName: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default CategoryScreen;
