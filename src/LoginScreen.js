import React, {useState,useEffect} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    BackHandler,
    Button,
    Dimensions, Linking,
    Switch
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import service from "./services/service";
import axios from "axios";
import {getUserId} from "./services/userService";
import PhotoSlider from "./components/PhotoSlider";
import Icon from "react-native-vector-icons/Ionicons";

function LoginScreen({ navigation }) {
    const [images, setImages] = useState([]);
    const [userName,setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error ,setError] = useState(false);
    const [userId,setUserId] = useState(1);
    const [rememberMe, setRememberMe] = useState(false);
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerShown:false, // Hide the back button
        });
    }, [navigation]);

    useEffect(() => {
        // Disable the back button functionality
        controlLogin();
        getImages();
        const backAction = () => {
            return true; // Returning true will prevent the back action
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove();
    }, []);

    const getImages = () => {
        service.getData('api/loginpage').then(async (response) => {
            setImages(response.sliders.map(item => "https://www.acar.kodlanabilir.com/storage/homeslider/" + item.picture));
        }).catch((e)=> console.log("error",e))
    }
    const controlLogin = async () => {

        let userId = await getUserId();
        if(userId){
            setUserId(0);
            navigation.navigate('Details2', { screen: 'Ana sayfa' });
        }else
        {
            const username = await AsyncStorage.getItem('username');
            const password = await AsyncStorage.getItem('password');
            if(username && password){
                setUserName(username);
                setPassword(password);
            }
            setUserId(userId);
        }
    }

    const openLink = (url) => {
        Linking.canOpenURL(url)
            .then((supported) => {
                if (!supported) {
                    // Eğer Instagram uygulaması cihazda yüklü değilse, Instagram'ı tarayıcıda açmayı deneyin
                    return Linking.openURL(postUrl);
                } else {
                    return Linking.openURL(url);
                }
            })
            .catch((err) => console.error('Instagram açılamadı: ', err));
    };
    const login = () => {
        setError(0);
        service.postData('api/login', {
            email: userName,
            password: password
        }).then(async (response) => {
            if(response?.user?.id){
                await AsyncStorage.setItem('user',JSON.stringify(response.user));
                if(rememberMe){
                    await AsyncStorage.setItem('username', userName);
                    await AsyncStorage.setItem('password', password);
                }
                navigation.navigate('Details2', { screen: 'Ana sayfa' });
            }
            else{
                setError(true);
            }
        })
    }
    return (
       !userId ?  <View style={styles.container}>

           <PhotoSlider bigSize={true} images={images} slideDuration={12000} />
           <Image source={require('../assets/acar.png')} style={styles.modalImage} />
           <View style={styles.centerView}>
               <Text style={{width: 300,marginBottom: 5,fontWeight: "bold"}}>Kullancı Adı</Text>
               <View style={styles.inputContainer}>
                   <TextInput
                       value={userName}
                       style={styles.customInput}
                       placeholder={"Kullanıcı adı girin ..."}
                       placeholderTextColor="#A0A0A0"
                       onChangeText={setUserName}
                   />
               </View>
               <Text style={{width: 300,marginBottom: 5,fontWeight: "bold"}}>Şifre</Text>
               <View style={styles.inputContainer}>
                   <TextInput
                       value={password}
                    style={styles.customInput}
                    placeholder={"Password"}
                    placeholderTextColor="#A0A0A0"
                    secureTextEntry={true}
                    onChangeText={setPassword}
                />
            </View>
           <View  style={styles.switch}>
               <Text>Beni Hatırla</Text>
               <Switch value={rememberMe} onValueChange={(value) => setRememberMe(value)} />
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

                   <TouchableOpacity onPress={()=>openLink("https://www.acar.kodlanabilir.com/parolami-unuttum")}>
                       <Text>Şifremi unuttum</Text>
                   </TouchableOpacity>

                   <View style={styles.space} />
                   {
                       error ?
                           <Text style={styles.errorText}> Kullanıcı Adı veya Şifre Yanlış</Text> : <></>
                   }
               </View>
           </View>


        </View> : <></>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    centerView : {
      flex: 1,
      alignItems: "center",
        marginTop: 60
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
        marginTop: 7
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
        marginBottom: 20,
        position: "absolute",
        top: 100,
        left: (Dimensions.get('window').width / 2) - 100
    },
    switch:{
        alignItems:'center',
        justifyContent:'flex-start',
        flexDirection:'row'
    }
});

export default LoginScreen;
