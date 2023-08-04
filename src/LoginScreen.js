import React, {useState,useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Image,BackHandler} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import service from "./services/service";
import axios from "axios";

function LoginScreen({ navigation }) {
    const [userName,setUserName] = useState("admin@kodlanabilir.com");
    const [password, setPassword] = useState("123123");
    const [error ,setError] = useState(false);
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerShown:false, // Hide the back button
        });
    }, [navigation]);
    useEffect(() => {
        // Disable the back button functionality
        const backAction = () => {
            return true; // Returning true will prevent the back action
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove();
    }, []);
    const login = () => {
        setError(0);
        service.postData('api/login', {
            email: userName,
            password: password
        }).then(async (response) => {
            if(response?.user?.id){
                await AsyncStorage.setItem('user',JSON.stringify(response.user));
                navigation.navigate('Details2', { screen: 'Ana sayfa' });
            }
            else{
                setError(true);
            }
        })
    }
    return (
        <View style={styles.container}>
            <Image source={require('../assets/acar.png')} style={styles.modalImage} />
            <View style={styles.inputContainer}>
                <TextInput
                    value={"admin@kodlanabilir.com"}
                    style={styles.customInput}
                    placeholder={"Username"}
                    placeholderTextColor="#A0A0A0"
                    onChangeText={setUserName}
             />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    value={"123123"}
                    style={styles.customInput}
                    placeholder={"Password"}
                    placeholderTextColor="#A0A0A0"
                    secureTextEntry={true}
                    onChangeText={setPassword}
                />
            </View>
            <View style={styles.map}>
                <TouchableOpacity style={styles.customButton}
                    onPress={() => {
                        login()
                        // Burada giriş kontrolü yapabilirsiniz.
                        // Eğer giriş başarılıysa ana ekrana geçiş yapabilirsiniz.
                        // Örnek olarak, navigation.navigate('Home') gibi bir yönlendirme yapabilirsiniz.
                    }}

                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <View style={styles.space} />
                 {
                     error ?
                     <Text style={styles.errorText}> Kullanıcı Adı veya Şifre Yanlış</Text> : <></>
                 }
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    map: {
        width: 300,
    },
    titleHead: {
        height: 80,
        fontSize: 28
    },
    contactInfoContainer: {
        backgroundColor: 'white',
        padding: 10,
    },
    contactInfoText: {
        fontSize: 16,
        marginBottom: 5,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    space: {
        height: 15
    },
    inputContainer: {
        minWidth: '100%',
        maxWidth: 300,
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 10,
        borderColor: '#E0E0E0',
        borderWidth: 1,
    },
    customInput: {
        fontSize: 16,
        color: '#040404',
    },
    customButton: {
        backgroundColor: '#ec1c3c',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    errorText : {
        fontSize: 15,
        marginTop: 20,
        justifyContent: 'center',
        color:'#ec1c3c'
    },
    modalImage: {
        width: 200,
        height: 80,
        resizeMode: 'contain',
        marginBottom: 20
    },
});

export default LoginScreen;
