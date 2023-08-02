import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button, TouchableOpacity,ScrollView} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import {getData} from "./services/service";

const CompanyLocation = () => {
    // Şirketin konumu (enlem ve boylam değerleri)
    const [currentLocation,setCurrentLocation] = useState(0);
    const [info,setInfo] = useState({})
    useEffect(() => {
        getData('api/store').then( (response) => {
             setInfo(response.data)
        });
    },[])

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
        <ScrollView style={styles.container}>

            {
                companyContactInfo.map((item,index) => {
                    if(currentLocation == index) {
                        return (
                            <MapView
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
                            <>
                                <Text style={styles.title}>{item.title}</Text>
                                <Text style={styles.contactInfoText}>Adres: {item.address}</Text>
                                <Text style={styles.contactInfoText}>Telefon: {item.phone}</Text>
                                <Text style={styles.contactInfoText}>E-posta: {item.email}</Text>
                                <TouchableOpacity onPress={() => {setCurrentLocation(index)}} style={styles.customButton}>
                                    <Text  style={styles.customText}>Konumu İncele</Text>
                                </TouchableOpacity>
                                </>
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
        minHeight:100
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
        padding: 15,
        marginTop: 15,
        borderRadius: 4,
        marginLeft: 0,
        marginBottom : 30
    },
    customText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#ffffff'
    },
});

export default CompanyLocation;
