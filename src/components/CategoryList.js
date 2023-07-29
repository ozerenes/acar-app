import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

const CategoryList = ({ categories }) => {
    const renderCategoryItem = ({ item }) => (
        <View style={styles.productItem}>
            <Image source={{uri:item.image}} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={categories}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    productItem: {
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    productImage: {
        width: 100,
        height: 100,
        marginBottom: 5,
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
});

export default CategoryList;
