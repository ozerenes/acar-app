import React, { useEffect, useState } from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { getUserId } from "./services/userService";
import service from "./services/service";
import Notification from "../src/components/Notification";
import Loading from "../src/components/Loading";


const ShoppingCart = ({navigation}) => {
    const [cartItems, setCartItems] = useState([]);
    const [notificationVisible, setNotificationVisible] = useState(false);
    const [notificatioonForOrder, setNotificatioonForOrder] = useState(false);
    const [loadingStatus, setLoadingStatus] = useState(false);

    const showNotification = () => {
        setNotificationVisible(true);
    };

    const closeNotification = () => {
        setNotificationVisible(false);
    };
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoadingStatus(true)
        const userId = await getUserId();
        service.getData(`api/cart-api/${userId}`).then((response) => {
            setCartItems(response.map(item => {
                return {
                    ...item,
                    picture :"https://www.acar.kodlanabilir.com/storage/products/thumbnails/"+item.picture,
                }
            }));
        }).finally(()=>{
            setLoadingStatus(false)
        });
    }

    const handleRemoveItem = async (itemId) => {
        const userId = await getUserId();
        service.getData(`api/remove-items-from-cart-api/${userId}/${itemId}`).then((response) => {
            if (response === 'OK') {
                const updatedCart = cartItems.filter((item) => item.id !== itemId);
                setCartItems(updatedCart);
                showNotification();
            }
        });
        setTimeout(() => {
            closeNotification();
        },5000)
    };

    const addToCart =  async (id,status) => {
        const userId = await getUserId();
        service.getData(`api/add-to-cart-api/${userId}/${id}/${status}`).then((response) => {
            fetchData();
        });
    }

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Image source={{ uri: item.picture }} style={styles.productImage} />
            <View style={{
                position: 'absolute',
                backgroundColor: "red",
                borderRadius: 999, // Yuvarlak yapmak için büyük bir değer kullanıyoruz
                justifyContent: 'center', // İçeriği yatay ve dikey olarak ortala
                alignItems: 'center',
                width: 20,
                height: 20,
                top: 30, // Konumu ayarla
                left: 75,
                zIndex: 99,
            }}>
                <Text style={{
                    color: "white",
                    fontSize: 12,
                }}>{item.quantity}</Text>
            </View>
            <View style={styles.columnText}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>{item.price} TL</Text>
            </View>

            <TouchableOpacity onPress={() => handleRemoveItem(item.id)} style={styles.removeButton}>
                <Icon name="trash-outline" size={24} color="red" />
            </TouchableOpacity>
            <View style={styles.addRemove}>
                <TouchableOpacity onPress={() => addToCart(item.id,1)} style={styles.addRemoveButton}>
                    <Text style={styles.customText}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => addToCart(item.id,-1)} style={styles.addRemoveButton}>
                    <Text style={styles.customText}>-</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const payment = async () => {
            const userId = await getUserId();
            service.postData('api/payment',{
                "userid":userId
            }).then(response => {
                setNotificatioonForOrder(true)
            });
        }

    return (
        <View style={styles.container}>
            {notificationVisible && (
                <Notification message="Ürün sepeten silindi." onClose={closeNotification} />
            )}
            {notificatioonForOrder && (
                <Notification message="Sipariş Verildi" onClose={closeNotification} />
            )}

            {
                loadingStatus ? <Loading/> :
                    <FlatList
                        data={cartItems}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                    />

            }
            <TouchableOpacity onPress={(e) =>{if(cartItems.length) navigation.navigate("Sipariş Tamamla")} } style={styles.filterButton}>
                <Icon name={"card-outline"} color={"#fff"} size={30} />
                <Text style={styles.filterButtonText}>Siparişe Devam Et</Text>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
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
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        padding: 16,
    },
    itemName: {
        fontSize: 14,
        flex: 1,
    },
    itemPrice: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    removeButton: {
        padding: 8
    },
    addRemoveButton: {
        padding: 8,
        marginBottom: 8
    },
    customText: {
        fontSize: 25,
    },
    emptyText: {
        fontSize: 18,
        textAlign: 'center',
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
        marginLeft: 15
    },
    productImage: {
        width: 90,
        height: 90,
        resizeMode: 'contain',
    },
    addRemove: {
        flexDirection: "column"
    },
    columnText: {
        flexDirection: "column",
        height: 50,
    }
});

export default ShoppingCart;
