import React, {useEffect, useState,useRef} from 'react';
import {View, Text, StyleSheet, Button, TouchableOpacity,ScrollView} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import service from "./services/service";

const CompanyLocation = () => {
    // Şirketin konumu (enlem ve boylam değerleri)
    const [currentLocation,setCurrentLocation] = useState(0);
    const [info,setInfo] = useState({})
    const scrollViewRef = useRef(); // Create a ref for the ScrollView

    useEffect(() => {
        service.getData('api/store').then( (response) => {
             setInfo(response.data)
        });
    },[])

    const scrollToTop = () => {
        if (scrollViewRef?.current) {
            scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
        }
    };
    // Şirketin iletişim bilgileri
    const companyContactInfo = [
        {
            title: info.store_long_name,
                address:info.store_address_1,
            phone: info.store_phone_1,
            email: info.store_mail,
            location: {
                latitude: 41.01513555405315,
                longitude: 28.967504267999328
            }
        },
        {
            title: info.store_long_name,
            address:info.store_address_2,
            phone: info.store_phone_2,
            email: info.store_mail,
            location: {
                latitude: 41.01513555405315,
                longitude: 28.967504267999328
            }
        },
        {
            title: info.store_long_name,
            address:info.store_address_3,
            phone: info.store_phone_3,
            email: info.store_mail,
            location: {
                latitude: 41.157767315348416,
                longitude: 28.642693810335047
            }
        },
    ]


    return (
        <ScrollView style={styles.container} ref={scrollViewRef}>

            {
                companyContactInfo.map((item,index) => {
                    if(currentLocation == index) {
                        return (
                            <MapView
                                key={index}
                                style={styles.map}
                                initialRegion={{
                                    latitude: item.location.latitude,
                                    longitude: item.location.longitude,
                                    latitudeDelta: 0.01,
                                    longitudeDelta: 0.01,
                                }}
                            >
                                <Marker
                                    coordinate={item.location}
                                    title={item.title}
                                    description={item.address}
                                />
                            </MapView>
                        )
                    }
                })
            }

            <View style={styles.contactInfoContainer}>
                {
                    companyContactInfo.map((item,index) => {
                        return (
                            <View style={styles.card}>
                                <Text style={styles.title}>{item.title}</Text>
                                <Text style={styles.contactInfoText}>Adres: {item.address}</Text>
                                <Text style={styles.contactInfoText}>Telefon: {item.phone}</Text>
                                <Text style={styles.contactInfoText}>E-posta: {item.email}</Text>
                                <View style={styles.detailFooter}>
                                    <TouchableOpacity onPress={() => {
                                        setCurrentLocation(index);
                                        scrollToTop()

                                    }} style={styles.customButton}>
                                        <Text  style={styles.customText}>Konumu İncele</Text>
                                    </TouchableOpacity>
                                </View>

                                </View>
                            )


                    })
                }

            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
        minHeight:230
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
    customButton: {
        backgroundColor: '#ec1c3c',
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginTop: 0,
        borderRadius: 4,
        marginLeft: 0,
        marginBottom : 15,
        width: 150
    },
    customText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#ffffff'
    },
    detailFooter: {
        width: "100%",
        justifyContent: "flex-end",
        alignItems: "flex-end"
    },
    card: {
        borderBottomWidth: 2,
        borderColor: "red",
        borderStyle: "solid",
        marginBottom: 15
    }
});

export default CompanyLocation;
