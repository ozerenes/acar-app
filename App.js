import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/LoginScreen';
import RegisterScreen from './src/RegisterScreen';
import HomeScreen from './src/HomeScreen';
import DetailsScreen from './src/DetailsScreen';
import Icon from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ContactScreen from './src/ContactScreen';
import ProductsScreen from './src/ProductsScreen';

const Tab = createBottomTabNavigator();


const Stack = createStackNavigator();

function App() {
    const isLoggedIn = false; // Bu değişkeni giriş kontrolü sonucunda true/false olarak ayarlayın.

    return (
        <>

        <NavigationContainer>

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
                })}
                tabBarOptions={{
                    activeTintColor: 'blue',
                    inactiveTintColor: 'gray',
                    showLabel: false,
                    "tabBarStyle": [
                        {
                            "display": "flex"
                        }
                     ]
                    // Sekme etiketlerini gösterme
                }}
            >
                {/* Ana ekran */}
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="home-outline" color={color} size={size} />
                        ),
                    }}
                />

                {/* Profil ekranı */}
                <Tab.Screen
                    name="Ürün Listesi"
                    component={ProductsScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="person-outline" color={color} size={size} />
                        ),
                    }}
                />

                {/* Ayarlar ekranı */}
                <Tab.Screen
                    name="Cart"
                    component={LoginScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="settings-outline" color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Account"
                    component={LoginScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="settings-outline" color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Contact"
                    component={ContactScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="person-outline" color={color} size={size} />
                        ),
                    }}
                />

            </Tab.Navigator>
        </NavigationContainer>
        </>
    );
}

export default App;
