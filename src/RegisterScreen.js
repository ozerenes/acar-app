import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

function RegisterScreen({ navigation }) {
    return (
        <View>
            <Text>Register Screen</Text>
            <TextInput placeholder="Username" />
            <TextInput placeholder="Password" secureTextEntry={true} />
            <Button
                title="Register"
                onPress={() => {
                    // Burada kayıt kontrolü ve işlemlerini yapabilirsiniz.
                    // Eğer kayıt başarılıysa, örneğin navigation.navigate('Login') gibi bir yönlendirme yaparak
                    // kullanıcıyı giriş ekranına yönlendirebilirsiniz.
                }}
            />
        </View>
    );
}

export default RegisterScreen;
