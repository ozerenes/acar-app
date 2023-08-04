import React, {useEffect,useState} from 'react';
import { View, TouchableOpacity, Text,StyleSheet } from 'react-native';
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
import NavigationService from "./src/services/navigationService";
const Tab = createBottomTabNavigator();


const Stack = createStackNavigator();

const CustomButton = ({ onPress, icon }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={{ marginRight: 10 }}>
                <Icon name={icon} color={"#040404"} size={40} />
            </View>
        </TouchableOpacity>
    );
};
function App() {
    const isLoggedIn = false; // Bu değişkeni giriş kontrolü sonucunda true/false olarak ayarlayın.
    const navigatorRef = React.useRef();
    const [isFilterOpen, setFilterOpen] = useState(false);


    useEffect(() => {
        NavigationService.setTopLevelNavigator(navigatorRef.current);
    },[]);
    const handleFilterToggle = () => {
        setFilterOpen(!isFilterOpen);
    };

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
                                icon={"basket-outline"}
                                onPress={() => navigation.navigate('Basket')}
                                title="Düğme"
                            />
                        ),
                    })}
                />

                {/* Profil ekranı */}
                <Tab.Screen
                    name="Ürün Listesi"
                    options={({ navigation }) => ({
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="grid-outline" color={color} size={size} />
                        ),
                        headerShown: true,
                        headerRight: () => (
                            <View style={styles.flex}>
                                <CustomButton icon={"filter-outline"} style={styles.filterButton} onPress={handleFilterToggle}>
                                </CustomButton>
                                <CustomButton icon={"basket-outline"}
                                    onPress={() => navigation.navigate('Basket')}
                                    title="Düğme"
                                />
                            </View>
                        ),
                    })}
                >
                    {() => <ProductsScreen isFilterOpen={isFilterOpen} />}
                </Tab.Screen>


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
                                icon={"basket-outline"}
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
                                icon={"basket-outline"}
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

        <NavigationContainer ref={navigatorRef}>

            <Stack.Navigator>

                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Details" component={DetailsScreen} />
                <Stack.Screen name="Basket" component={BasketScreen} />
                <Stack.Screen
                    name="Details2"
                    component={Home2}
                    options={{
                        headerShown: false, // Hide the header for this screen
                    }}
                />

            </Stack.Navigator>
        </NavigationContainer>
        </>
    );
}

const styles = StyleSheet.create({
    filterButton: {
        backgroundColor: '#ec1c3c',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 8,
        alignSelf: 'center',
    },
    filterButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    flex: {
        alignItems: "center",
        flexDirection: "row"
    }
});

export default App;
