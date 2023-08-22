import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const OrderHistoryComponent = ({ orders }) => {
    return (
        <View style={styles.container}>
            <FlatList
                data={orders}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.orderItem}>
                        <Text style={styles.orderId}>Sipariş ID: {item.id}</Text>
                        <Text style={styles.totalAmount}>Toplam: {item.totalAmount} ₺</Text>
                        {
                            item.products.map(elem => {
                                return (
                                    <Text>{elem.name} | {elem.price } ₺ | {elem.pivot.quantity} adet</Text>
                                )
                            })
                        }

                        <Text style={styles.totalAmount}>Adres :  {item.address}</Text>

                        <Text style={styles.totalAmount}>Şehir/İlçe: {item.city} / {item.district} </Text>


                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f8f8f8',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    orderItem: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 16,
        marginBottom: 16,
        borderRadius: 8,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    orderId: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    totalAmount: {
        fontSize: 14,
        color: '#555',
    },
});

export default OrderHistoryComponent;
