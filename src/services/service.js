import axios from 'axios';

const BASE_URL = 'https://www.acar.kodlanabilir.com/'; // API'nizin temel URL'si

const service = axios.create({
    baseURL: BASE_URL,
    timeout: 10000, // İsteğin zaman aşımı süresi (ms cinsinden)
});

// Örnek bir GET isteği
export const getData = async (url,params = []) => {
    try {

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
export const postData = async (url,data) => {
    try {
        const response = await service.post(url, data); // API'nizin verilere veri göndermek için uygun endpoint'i kullanın
        return response.data; // API'den dönen yanıtı döndürür
    } catch (error) {
        throw error; // Hata durumunda hata nesnesini fırlatır
    }
};
