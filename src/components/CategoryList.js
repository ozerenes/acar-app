import React from 'react';
import {View, Text, FlatList, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import {useNavigation} from "@react-navigation/native";

const CategoryList = ({ categories }) => {
    const navigation =useNavigation()
    const renderCategoryItem = ({ item,index }) => {
        const isLastItem = index === categories.length - 1;
        const notEven = (index % 2 !== 0 && index === categories.length - 2);
        return (
            <View style={[styles.productItem,(isLastItem || notEven) && styles.lastItem]}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('CatPro', {
                        currentCategory: item.id,
                        currentCategoryName: item.name,
                    })
                }}>
                    <Image source={{uri: item.image}} style={styles.productImage}/>
                    <View style={styles.productItemFooter}>
                        <Text style={styles.productName}>{item.name}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )

    };

    return (
        <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.container}
            numColumns={2} // İki elemanı yan yana sıralamak için numColumns'u 2 olarak ayarlayın
        />
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f0f0f0',
    },
    productItem: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        margin: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    productImage: {
        width: 100,
        height: 100,
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
        alignItems: 'center',
        justifyContent: 'center'
    },
    heart: {
        width: 28,
        height: 28,
        position: "absolute",
        zIndex: 122122,
        right: 15,
        top: 15
    },
});
export default CategoryList;
