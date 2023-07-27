import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/LoginScreen';
import RegisterScreen from './src/RegisterScreen';
import HomeScreen from './src/HomeScreen';
import DetailsScreen from './src/DetailsScreen';
import Icon from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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
                        } else if (route.name === 'DetailsScreen') {
                            iconName = 'person-outline';
                        } else if (route.name === 'LoginScreen') {
                            iconName = 'settings-outline';
                        }
                        return <Icon name={iconName} color={color} size={size} />;
                    },
                })}
                tabBarOptions={{
                    activeTintColor: 'blue',
                    inactiveTintColor: 'gray',
                    showLabel: false, // Sekme etiketlerini gösterme
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
                    name="DetailsScreen"
                    component={DetailsScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="person-outline" color={color} size={size} />
                        ),
                    }}
                />

                {/* Ayarlar ekranı */}
                <Tab.Screen
                    name="LoginScreen"
                    component={LoginScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="settings-outline" color={color} size={size} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
        </>
    );
}

export default App;
