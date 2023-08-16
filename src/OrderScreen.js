import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import service from "./services/service";
import { getUserId } from "./services/userService";
import Loading from "../src/components/Loading";
import OrderList from "./components/OrderList";

const OrderScreen = ({ isFilterOpen }) => {
    const [loadingStatus, setLoadingStatus] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const userId = await getUserId();
        service.getData('api/payments/' + userId).then(response => {
            console.log(response)
            console.log("geldi")
        });
    }

    return (
        <View style={styles.container}>
            {
                loadingStatus ? <Loading/> :
                    <OrderList orders={[
                    { id: 1, totalAmount: 50.0 },
                    { id: 2, totalAmount: 75.5 },
                        ]} />

            }
        </View>
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
