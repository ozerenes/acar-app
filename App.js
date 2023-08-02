import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/LoginScreen';
import RegisterScreen from './src/RegisterScreen';
import HomeScreen from './src/HomeScreen';
import Icon from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ContactScreen from './src/ContactScreen';
import ProductsScreen from './src/ProductsScreen';
import CategoryScreen from "./src/CategoryScreen";
import DetailsScreen from "./src/DetailsScreen";
import BasketScreen from "./src/BasketScreen";

const Tab = createBottomTabNavigator();


const Stack = createStackNavigator();

const CustomButton = ({ onPress, title }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={{ marginRight: 10 }}>
                <Icon name="basket-outline" color={"#040404"} size={40} />
            </View>
        </TouchableOpacity>
    );
};
function App() {
    const isLoggedIn = false; // Bu değişkeni giriş kontrolü sonucunda true/false olarak ayarlayın.


    const Home2 = () => {
        return (
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, size }) => {
                        let iconName;
                        if (route.name === 'Home') {
                            iconName = 'home-outline';
                        } else if (route.name === 'Details') {
                            iconName = 'person-outline';
                        } else if (route.name === 'Cart') {
                            iconName = 'settings-outline';
                        }
                        else if (route.name === 'Contact') {
                            iconName = 'person-outline';
                        }
                        else{
                            iconName = 'settings-outline';
                        }
                        return <Icon name={iconName} color={color} size={size} />;
                    },
                    tabBarLabel: ({ focused, color }) => {
                        // Return the label text for each tab based on the route name and focused state
                        // Example: return focused ? 'Home' : 'Home';
                    },
                    tabBarInactiveTintColor: '#040404',
                    tabBarActiveTintColor: '#ec1c3c',
                    tabBarStyle: { backgroundColor: 'white' },
                })}
            >
                {/* Ana ekran */}

                <Tab.Screen
                    name="Ana sayfa"
                    component={HomeScreen}
                    options={({ navigation }) => ({
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="home-outline" color={color} size={size} />
                        ),
                        headerShown: true,
                        headerRight: () => (
                            <CustomButton
                                onPress={() => navigation.navigate('Basket')}
                                title="Düğme"
                            />
                        ),
                    })}
                />

                {/* Profil ekranı */}
                <Tab.Screen
                    name="Ürün Listesi"
                    component={ProductsScreen}
                    options={({ navigation }) => ({
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="grid-outline" color={color} size={size} />
                        ),
                        headerShown: true,
                        headerRight: () => (
                            <CustomButton
                                onPress={() => navigation.navigate('Basket')}
                                title="Düğme"
                            />
                        ),
                    })}
                />

                {/* Ayarlar ekranı */}
                <Tab.Screen
                    name="Ürünler"
                    component={CategoryScreen}
                    options={({ navigation }) => ({
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="medkit-outline" color={color} size={size} />
                        ),
                        headerShown: true,
                        headerRight: () => (
                            <CustomButton
                                onPress={() => navigation.navigate('Basket')}
                                title="Düğme"
                            />
                        ),
                    })}
                />
                <Tab.Screen
                    name="Hesap İşlemleri"
                    component={LoginScreen}
                    options={({ navigation }) => ({
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="settings-outline" color={color} size={size} />
                        ),
                        headerShown: true,
                        headerRight: () => (
                            <CustomButton
                                onPress={() => navigation.navigate('Basket')}
                                title="Düğme"
                            />
                        ),
                    })}
                />
                <Tab.Screen
                    name="İletişim"
                    component={ContactScreen}
                    options={({ navigation }) => ({
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="mail-outline" color={color} size={size} />
                        ),
                        headerShown: true,
                        headerRight: () => (
                            <CustomButton
                                onPress={() => navigation.navigate('Basket')}
                                title="Düğme"
                            />
                        ),
                    })}
                />

            </Tab.Navigator>
        )
    }


    return (
        <>

        <NavigationContainer>

            <Stack.Navigator>

                <Stack.Screen
                    name="Details2"
                    component={Home2}
                    options={{
                        headerShown: false, // Hide the header for this screen
                    }}
                />
                <Stack.Screen name="Details" component={DetailsScreen} />
                <Stack.Screen name="Basket" component={BasketScreen} />
            </Stack.Navigator>
        </NavigationContainer>
        </>
    );
}

export default App;
