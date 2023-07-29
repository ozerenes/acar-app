import React from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';

function LoginScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.titleHead}>Acar App</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.customInput}
                    placeholder={"Username"}
                    placeholderTextColor="#A0A0A0"
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.customInput}
                    placeholder={"Password"}
                    placeholderTextColor="#A0A0A0"
                    secureTextEntry={true}
                />
            </View>
            <View style={styles.map}>
                <TouchableOpacity style={styles.customButton}
                    onPress={() => {
                        // Burada giriş kontrolü yapabilirsiniz.
                        // Eğer giriş başarılıysa ana ekrana geçiş yapabilirsiniz.
                        // Örnek olarak, navigation.navigate('Home') gibi bir yönlendirme yapabilirsiniz.
                    }}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <View style={styles.space} />
                <TouchableOpacity
                    style={styles.customButton}
                    onPress={() => navigation.navigate('Register')}
                >
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
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
        color: '#333333',
    },
    customButton: {
        backgroundColor: '#FF5733',
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
    }
});

export default LoginScreen;
