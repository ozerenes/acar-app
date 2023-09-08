import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet,TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { getUserId } from "./services/userService";
import service from "./services/service";
import Notification from "../src/components/Notification";
import Loading from "../src/components/Loading";
import {useNavigation} from "@react-navigation/native";


const CompleteBasket = () => {
    const navigation = useNavigation();

    const [notificationVisible, setNotificationVisible] = useState(false);
    const [notificatioonForOrder, setNotificatioonForOrder] = useState(false);
    const [validationError, setValidationError] = useState(false);
    const [messageError, setMessageError] = useState(false);
    const [dissable, setDisabble] = useState(false);
    const [data,setData] = useState({
        name: "",
        lastname :"",
        address:"",
        city:"",
        district:"",
        email :"",
        phone: "",
        note: "",
    })

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

    }

    const handleInputChange = (text,key) => {
        let changedData = {...data};
        changedData[key] = text;
        setData(changedData);
    };


    const payment = async () => {
        setDisabble(true)

        const vali = Object.keys(data).every(item => data[item] != "" )

        if(vali === false) {
            setValidationError(true);
            return;
        }


        const userId = await getUserId();
        service.postData('api/payment',{
            "userid":userId,
            ...data
        }).then(response => {


                setData({
                    name: "",
                    lastname :"",
                    address:"",
                    city:"",
                    district:"",
                    email :"",
                    phone: "",
                    note: "",
                });
                setNotificatioonForOrder(true);
                navigation.navigate('Details2', { screen: 'Sipariş Listesi' });

        }).catch((e)=> {
            setMessageError(true)
        }).finally(() => {
            setDisabble(false)
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
            {validationError && (
                <Notification message="Lütfen Bilgileri Eksiksiz Doldurun" onClose={(e) => { setValidationError(false) }} />
            )}
            {messageError && (
                <Notification message="Bir hata oluştu" onClose={(e) => { setMessageError(false) }} />
            )}

            <TextInput
                style={styles.input}
                placeholder="İsim"
                onChangeText={(text) => { handleInputChange(text,'name') }}
                value={data.name}
            />
            <TextInput
                style={styles.input}
                placeholder="Soy İsim"
                onChangeText={(text) => { handleInputChange(text,'lastname') }}
                value={data.lastname}
            />
            <TextInput
                style={styles.input}
                placeholder="E-mail"
                onChangeText={(text) => { handleInputChange(text,'email') }}
                value={data.email}
            />
            <TextInput
                style={styles.input}
                placeholder="Telefon"
                onChangeText={(text) => { handleInputChange(text,'phone') }}
                value={data.phone}
            />
            <TextInput
                style={styles.input}
                placeholder="Şehir"
                onChangeText={(text) => { handleInputChange(text,'city') }}
                value={data.city}
            />
            <TextInput
                style={styles.input}
                placeholder="İlçe"
                onChangeText={(text) => { handleInputChange(text,'district') }}
                value={data.district}
            />
            <TextInput
                style={styles.textarea}
                multiline
                numberOfLines={4}
                placeholder="Adres"
                onChangeText={(text) => { handleInputChange(text,'address')}}
                value={data.address}
            />
            <TextInput
                style={styles.textarea}
                multiline
                numberOfLines={4}
                placeholder="Notunuz"
                onChangeText={(text) => { handleInputChange(text,'note')}}
                value={data.note}
            />
            <TouchableOpacity disabled={dissable} onPress={payment} style={styles.filterButton}>
                <Icon name={"card-outline"} color={"#fff"} size={30} />
                <Text style={styles.filterButtonText}>Siparişi Tamamla</Text>
            </TouchableOpacity>

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
    removeButton: {
        padding: 8,
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
    input: {
        width: '100%',
        padding: 10,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
    },
    textarea: {
        width: '100%',
        padding: 10,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
    },
});

export default CompleteBasket;
