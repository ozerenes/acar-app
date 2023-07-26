import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

function LoginScreen({ navigation }) {
    return (
        <View>
            <Text>Login Screen</Text>
            <TextInput placeholder="Username" />
            <TextInput placeholder="Password" secureTextEntry={true} />
            <Button
                title="Login"
                onPress={() => {
                    // Burada giriş kontrolü yapabilirsiniz.
                    // Eğer giriş başarılıysa ana ekrana geçiş yapabilirsiniz.
                    // Örnek olarak, navigation.navigate('Home') gibi bir yönlendirme yapabilirsiniz.
                }}
            />
            <Button
                title="Register"
                onPress={() => navigation.navigate('Register')}
            />
        </View>
    );
}

export default LoginScreen;
