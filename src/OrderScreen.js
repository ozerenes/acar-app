import React, { useEffect, useState,useCallback } from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import service from "./services/service";
import { getUserId } from "./services/userService";
import Loading from "../src/components/Loading";
import OrderList from "./components/OrderList";
import { useFocusEffect } from '@react-navigation/native';

const OrderScreen = ({ isFilterOpen }) => {
    const [loadingStatus, setLoadingStatus] = useState(false);
    const [orders, setOrders] = useState([]);
    //{ id: 1, totalAmount: 50.0 },

    useFocusEffect(
        useCallback(() => {
            console.log("burdayım")
            fetchData();
        }, [])
    );

    const fetchData = async () => {
        const userId = await getUserId();
        setLoadingStatus(true)
        service.getData('api/siparislerim/'+userId,{
            "userid":userId
        }).then(response => {
            setLoadingStatus(false)
            console.log("geldi")
           setOrders(response.orders.map(item => {
               console.log(item)
               return {
                   id : item.order_no,
                   totalAmount : item.total_paid,
                   products : item.products,
                   address : item.billing_address,
                   city :item.billing_address,
                   district : item.billing_address_district

               }
           }))
        });
    }

    return (
        <ScrollView style={styles.container}>
            {
                loadingStatus ? <Loading/> :
                    <OrderList orders={orders} />

            }
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    header: {
        padding: 16,
        backgroundColor: '#fff',
    },
    filterButton: {
        backgroundColor: '#ec1c3c',
        padding: 12,
        borderRadius: 8,
        alignSelf: 'flex-end',
    },
    filterButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default OrderScreen;
