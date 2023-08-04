import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import NavigationService from "./navigationService";
const BASE_URL = 'https://www.acar.kodlanabilir.com/';
const TIMEOUT = 10000;

const service = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
});


const handleAuthenticationAndNavigation = async () => {
    try {
        console.log("controlldeyim");
        let user = await AsyncStorage.getItem('user');

        user = JSON.parse(user);

        if (typeof user !==  'object' ||  !user?.id) {
            console.log("navigateeeee");
            NavigationService.navigate('Login');
            return false;
        }

        return true;
    } catch (error) {
        console.error('Error handling authentication and navigation:', error);
        NavigationService.navigate('Login');
        return false;
    }
};


// Interceptor tanımı
service.interceptors.response.use(
    (response) => {


        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);
service.interceptors.request.use(
    async(config) => {
        if(config.url != 'api/login'){
            const isAuthenticated = await handleAuthenticationAndNavigation();

            if (!isAuthenticated) {
                // Optionally, you can return a rejected promise to stop the request
                return Promise.reject({});
            }
        }
        console.log(config)

        return config

    },
    (error) => {
        return Promise.reject(error);
    }
);


service.getData = async (url,params = []) => {
    try {
        console.log("get data");
        let parameter = []

        Object.keys(params).map((param) => {
            parameter.push(param + "=" + params[param]);
        })

        if(parameter.length){
            url = url + "?"+ parameter.join('&');
        }
        const response = await service.get(url); // API'nizin verileri almak için uygun endpoint'i kullanın
        console.log(Object.keys(response))
        return response.data; // API'den dönen veriyi döndürür
    } catch (error) {
        throw error; // Hata durumunda hata nesnesini fırlatır
    }
};

// Örnek bir POST isteği
service.postData = async (url,data) => {
    try {

        console.log(data);
        const response = await service.post(url, data); // API'nizin verilere veri göndermek için uygun endpoint'i kullanın
        console.log(response.data);
        return response.data; // API'den dönen yanıtı döndürür
    } catch (error) {
        console.log(error); // Hata durumunda hata nesnesini fırlatır
    }
};



export default service;




