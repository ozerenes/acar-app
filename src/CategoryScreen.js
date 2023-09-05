import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Image, TouchableOpacity, Text } from 'react-native';
import service from "./services/service";
import { getUserId } from "./services/userService";
import {useNavigation} from "@react-navigation/native";
import Loading from "../src/components/Loading";

const CategoryScreen = () => {
    const navigation =useNavigation()

    const [categories, setCategories] = useState([]);
    const [even, setEven] = useState(0);
    const [loadingStatus, setLoadingStatus] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);


    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.slice(0, maxLength - 3) + '...';
        }
        return text;
    }

    const fetchData = async () => {
        setLoadingStatus(true)
        const userId = await getUserId();
        service.getData('api/urunler/' + userId).then(response => {
            setCategories(response.categories.map(item => ({
                id: item.id,
                name: item.name,
                image: "https://www.acar.kodlanabilir.com/storage/categories/" + item.picture,
            })));
            setEven(response.categories.length % 2)
            setLoadingStatus(false)
        });
    }

    const renderCategoryItem = ({ item , index }) => (
        <TouchableOpacity onPress={
            () => {
                navigation.navigate('Liste', {
                    currentCategory: item.id,
                    currentCategoryName: item.name
                })
            }
        } style={[styles.categoryItem, (even === 1 && categories.length - 1 === index) ? styles.notEven : ""]}>
            <Image source={{ uri: item.image }} style={styles.categoryImage} resizeMode="cover" />
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.categoryName}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {
                loadingStatus ? <Loading/> :
                    <FlatList
                        data={categories}
                        renderItem={renderCategoryItem}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={styles.listContainer}
                        numColumns={2}
                    />
            }


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
        margin: 8,
        flex: 1,
        width: 160,
        height: 220
    },
    categoryImage: {
        position: "absolute",
        top: 10,
        left: 10,
        width: 160,
        height: 160,
        marginBottom: 8,
        resizeMode: 'cover',
    },
    categoryName: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'left',
        position: "absolute",
        bottom: 15,
        paddingLeft: 15,
        maxWidth: 160
    },
    notEven : {
        maxWidth: 180
    }
});

export default CategoryScreen;
