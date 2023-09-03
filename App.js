import React, {useEffect,useState} from 'react';
import { View, TouchableOpacity, Text,StyleSheet } from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
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
import CompeleteBasket from "./src/CompeteBasket";
import CustomButton from "./src/components/CustomButton";
import NavigationService from "./src/services/navigationService";
import categoryProductScreen from "./src/CategoryProductScreen";
import CategoryProductScreen from "./src/CategoryProductScreen";
import {getUserId} from "./src/services/userService";
import service from "./src/services/service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OrderScreen from "./src/OrderScreen";
const Tab = createBottomTabNavigator();


const Stack = createStackNavigator();


function App() {
    const isLoggedIn = false; // Bu değişkeni giriş kontrolü sonucunda true/false olarak ayarlayın.
    const navigatorRef = React.useRef();
    const [isFilterOpen, setFilterOpen] = useState(false);
    const [count, setCount] = useState(0);


    const fetchData = async () => {
        const userId = await getUserId();
        service.getData(`api/cart-api/${userId}`).then((response) => {
            setCount(response.length);
        });
    }


    useEffect(() => {
        NavigationService.setTopLevelNavigator(navigatorRef.current);
        fetchData();
    },[]);

    const logout = (navigation) => {
        AsyncStorage.removeItem('user');
        navigation.navigate('Giriş');
    };

    const Home2 = () => {
        return (
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, size }) => {
                        let iconName;
                        if (route.name === 'Ana sayfa') {
                            iconName = 'home-outline';
                        } else if (route.name === 'Detaylar') {
                            iconName = 'person-outline';
                        } else if (route.name === 'Kategoriler') {
                            iconName = 'settings-outline';
                        }
                        else if (route.name === 'Sepet') {
                            iconName = 'basket-outline';
                        }
                        else if (route.name === 'İletişim') {
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
                            <View style={styles.buttonArea}>
                                <CustomButton style={styles.customButton}
                                    icon={"exit-outline"}
                                    onPress={() => {
                                        logout(navigation);
                                    }}
                                    title="Düğme"
                                />
                            </View>
                        ),
                    })}
                />

                {/* <Tab.Screen
                    name="Kategoriler"
                    component={CategoryScreen}
                    options={({ navigation }) => ({
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="medkit-outline" color={color} size={size} />
                        ),
                        headerShown: true,
                        headerRight: () => (
                            <View style={styles.buttonArea}>
                                <CustomButton style={styles.customButton}
                                              icon={"basket-outline"}
                                              onPress={() => navigation.navigate('Sepet')}
                                              count={count}
                                />
                                <CustomButton style={styles.customButton}
                                              icon={"exit-outline"}
                                              onPress={() => {
                                                  logout(navigation);
                                              }}
                                              title="Düğme"
                                />
                            </View>
                        ),
                    })}
                /> */}

                <Tab.Screen
                    name="Ürün Listesi"
                    component={ProductsScreen}
                    options={({ navigation }) => ({
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="grid-outline" color={color} size={size} />
                        ),
                        headerShown: true,
                        headerRight: () => (
                            <View style={styles.flex}>

                                <CustomButton style={styles.customButton}
                                              icon={"exit-outline"}
                                              onPress={() => {
                                                  logout(navigation);
                                              }}
                                              title="Düğme"></CustomButton>
                            </View>
                        ),
                    })}
                >
                </Tab.Screen>

                <Tab.Screen
                    name="Sepet"
                    component={BasketScreen}
                    options={({ navigation }) => ({
                        tabBarIcon: ({ color, size }) => (
                            <View>
                                <Icon name="basket-outline" type="ionicon" color={color} size={size} />
                                {/* Burada "badge" ekleyin ve içeriği öğe sayısına ayarlayın */}
                                <View style={{
                                    position: 'absolute',
                                    backgroundColor: "red",
                                    borderRadius: 999, // Yuvarlak yapmak için büyük bir değer kullanıyoruz
                                    justifyContent: 'center', // İçeriği yatay ve dikey olarak ortala
                                    alignItems: 'center',
                                    width: 20,
                                    height: 20,
                                    top: -5, // Konumu ayarla
                                    right: -10,
                                    zIndex: 99,
                                }}>
                                    <Text style={{
                                        color: "white",
                                        fontSize: 12,
                                    }}>{count}</Text>
                                </View>
                            </View>
                        ),
                        headerShown: true,
                        headerRight: () => (
                            <View style={styles.buttonArea}>

                                <CustomButton
                                    style={styles.customButton}
                                    icon={"exit-outline"}
                                    onPress={() => {
                                        logout(navigation);
                                    }}
                                    title="Düğme"
                                />
                            </View>
                        ),
                    })}
                >
                </Tab.Screen>

                <Tab.Screen
                    name="Sipariş Listesi"
                    component={OrderScreen}
                    options={({ navigation }) => ({
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="file-tray-full-outline" color={color} size={size} />
                        ),
                        headerShown: true,
                        headerRight: () => (
                            <View style={styles.buttonArea}>

                                <CustomButton
                                    style={styles.customButton}
                                    icon={"exit-outline"}
                                    onPress={() => {
                                        logout(navigation);
                                    }}
                                    title="Düğme"
                                />
                            </View>
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
                            <View style={styles.buttonArea}>

                                <CustomButton style={styles.customButton}
                                              icon={"exit-outline"}
                                              onPress={() => {
                                                  logout(navigation);
                                              }}
                                              title="Düğme"
                                />
                            </View>
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

                <Stack.Screen name="Giriş" component={LoginScreen} />
                <Stack.Screen name="Detaylar" component={DetailsScreen}
                              options={({ navigation }) => ({
                                  headerShown: true,
                                  headerRight: () => (
                                      <View style={styles.buttonArea}>
                                          <CustomButton style={styles.customButton}
                                                        icon={"exit-outline"}
                                                        onPress={() => {
                                                            logout(navigation);
                                                        }}
                                                        title="Düğme"
                                          />
                                      </View>
                                  ),
                              })}
                />
                <Stack.Screen name="Sepet" component={BasketScreen} />
                <Stack.Screen name="Sipariş Tamamla" component={CompeleteBasket} />
                <Stack.Screen name="CatPro" component={CategoryProductScreen}
                              options={({ route }) => ({
                                  title: route.params.currentCategoryName, // Kategori adını başlık olarak ayarlayın
                              })}
                />
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
    },
    buttonArea : {
        flexDirection: 'row',
    },
    customButton : {
        flex:1,
    }

});

export default App;
