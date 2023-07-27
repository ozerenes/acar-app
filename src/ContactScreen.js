import React, {useState} from 'react';
import { View, Text, StyleSheet, Button  } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const CompanyLocation = () => {
    // Şirketin konumu (enlem ve boylam değerleri)
    const [currentLocation,setCurrentLocation] = useState({
        latitude: 41.01513555405315,
        longitude: 28.967504267999328
    })
    const companyLocation = {
        latitude: 41.0082,   // Örnek bir enlem değeri
        longitude: 28.9784,  // Örnek bir boylam değeri
    };

    // Şirketin iletişim bilgileri
    const companyContactInfo = [
        {
            title: "EMİNÖNÜ MERKEZ",
                address: 'Eminönü Mercan Mah. Uzunçarşı Caddesi No:126/1 Fatih – İstanbul / Türkiye',
            phone: '+90 (212) 522 78 07',
            email: 'info@acardegirmenleri.com.tr',
            location: {
                latitude: 41.01513555405315,
                longitude: 28.967504267999328
            }
        },
        {
            title: "İSTOÇ ŞUBE",
            address: 'İstoç Toptancılar Çarşısı 3.Ada No:155 Bağcılar / İstanbul',
            phone: '+90 (212) 659 33 37',
            email: 'info@acardegirmenleri.com.tr',
            location: {
                latitude: 41.068981343890414,
                longitude: 28.821694840243694
            }
        },
        {
            title: "ARNAVUTKÖY FABRİKA",
            address: 'Haraççı Mah. Haraççı – Hadımköy Yolu Cad. No:2 Arnavutköy / İstanbul',
            phone: '+90 (212) 485 30 22',
            email: 'info@acardegirmenleri.com.tr',
            location: {
                latitude: 41.157767315348416,
                longitude: 28.642693810335047
            }
        },
    ]

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: currentLocation.latitude,
                    longitude: currentLocation.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
            >
                <Marker
                    coordinate={currentLocation}
                    title="Şirket Adı"
                    description={companyContactInfo.address}
                />
            </MapView>
            <View style={styles.contactInfoContainer}>
                {
                    companyContactInfo.map(item => {
                        return (
                            <>
                                <Text style={styles.title}>{item.title}</Text>
                                <Text style={styles.contactInfoText}>Adres: {item.address}</Text>
                                <Text style={styles.contactInfoText}>Telefon: {item.phone}</Text>
                                <Text style={styles.contactInfoText}>E-posta: {item.email}</Text>
                                <Button
                                    title="Change Location"
                                    onPress={() => setCurrentLocation(item.location)}
                                />
                                </>
                            )


                    })
                }

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
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
});

export default CompanyLocation;
