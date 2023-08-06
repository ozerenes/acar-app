import React, {useEffect, useState} from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {getUserId} from "./services/userService";
import service from "./services/service";

const ShoppingCart = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
         fechData()
    },[]);

    const fechData = async () => {

        const userId = await getUserId();
        service.getData(`api/cart-api/${userId}`).then((response) => {
            setCartItems(response)
        });
    }

    const handleRemoveItem = async (itemId) => {

        const userId = await getUserId();
        service.getData(`api/remove-items-from-cart-api/${userId}/${itemId}`).then((response) => {
            if(response === 'OK'){
                const updatedCart = cartItems.filter((item) => item.id !== itemId);
                setCartItems(updatedCart);
            }
        });
        // Silinecek öğeyi filtrele ve yeni sepet listesini ayarla

    };

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>{item.price} TL</Text>
            <TouchableOpacity onPress={() => handleRemoveItem(item.id)}>
                <Icon name="trash-outline" size={24} color="red" />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sepet Listesi</Text>
            <FlatList
                data={cartItems}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    itemName: {
        fontSize: 18,
        flex: 1,
    },
    itemPrice: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ShoppingCart;
