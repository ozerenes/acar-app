import React from 'react';
import {View, Text, FlatList, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";

const CategoryList = ({ categories }) => {
    const renderCategoryItem = ({ item,index }) => {
        const isLastItem = index === categories.length - 1;
        const notEven = (index % 2 !== 0 && index === categories.length - 2);
        return (
            <View style={[styles.productItem,(isLastItem || notEven) && styles.lastItem]}>
                <Image source={{uri: item.image}} style={styles.productImage}/>
                <View style={styles.productItemFooter}>
                    <Text style={styles.productName}>{item.name}</Text>
                </View>
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
        backgroundColor: '#fff',
    },
    productItem: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ec1c3c',
        paddingVertical: 15,
        alignItems: 'center', // Elemanları yatayda merkezlemek için alignItems'u 'center' olarak ayarlayın
        maxWidth: '50%', // Yan yana sıralanan elemanların maksimum genişliğini yüzde 50 olarak ayarlayın
        borderBottomWidth: 0,
        borderRightWidth: 0
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
        right: 15,
        top: 15
    },
    lastItem: {
        borderBottomWidth: 1,
        borderRightWidth: 1
    }
});
export default CategoryList;
