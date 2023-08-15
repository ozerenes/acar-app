import React, {useEffect, useState,useRef} from 'react';
import {View, Text, StyleSheet, Button, TouchableOpacity,ScrollView, Linking,Dimensions} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import service from "./services/service";
import Icon from "react-native-vector-icons/Ionicons";
import WebView from 'react-native-webview';


const CompanyLocation = () => {
    // Şirketin konumu (enlem ve boylam değerleri)
    const [currentLocation,setCurrentLocation] = useState(0);
    const [info,setInfo] = useState({})
    const scrollViewRef = useRef(); // Create a ref for the ScrollView

    useEffect(() => {
        service.getData('api/store').then( (response) => {
             setInfo(response.data)
             setCurrentLocation(0);
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
            },
            iframe : '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.4717858656145!2d28.964940075947553!3d41.01493317134959!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab993201be31f%3A0x9e8282e06a3af2b!2zTWVyY2FuLCBVenVuIMOHYXLFn8SxIENkLiBObzoxMjYgRDoxLCAzNDExNiBGYXRpaC_EsHN0YW5idWw!5e0!3m2!1str!2str!4v1691960899389!5m2!1str!2str" width="100%" height="500" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
        },
        {
            title: info.store_long_name,
            address:info.store_address_2,
            phone: info.store_phone_2,
            email: info.store_mail,
            location: {
                latitude: 41.01513555405315,
                longitude: 28.967504267999328
            },
            iframe: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12372.101807515328!2d28.793568667934462!3d41.05924613641787!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caa57a0b1b6ebf%3A0x80ec77fba8f89ff9!2zQXLEsSBLxLFydGFzaXllIFNhbmF5aSB2ZSBExLHFnyBUaWNhcmV0IExpbWl0ZWQgxZ5pcmtldGk!5e0!3m2!1str!2str!4v1691960989334!5m2!1str!2str" width="100%" height="500" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
        },
        {
            title: info.store_long_name,
            address:info.store_address_3,
            phone: info.store_phone_3,
            email: info.store_mail,
            location: {
                latitude: 41.157767315348416,
                longitude: 28.642693810335047
            },
            iframe: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3003.9410305188508!2d28.640151075954925!3d41.15763807132999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b557b2442fb20f%3A0xf95f50ff769cc3aa!2zU2F6bMSxYm9zbmEsIEhhcmHDp8OnxLEtSGFkxLFta8O2eSBZb2x1IENkLiBObzoyLCAzNDU1NSBBcm5hdnV0a8O2eS_EsHN0YW5idWw!5e0!3m2!1str!2str!4v1691961034380!5m2!1str!2str" width="100%" height="500" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
        },
    ];

    const openLink = (url) => {
        Linking.canOpenURL(url)
            .then((supported) => {
                if (!supported) {
                    // Eğer Instagram uygulaması cihazda yüklü değilse, Instagram'ı tarayıcıda açmayı deneyin
                    return Linking.openURL(postUrl);
                } else {
                    return Linking.openURL(url);
                }
            })
            .catch((err) => console.error('Instagram açılamadı: ', err));
    };

    const getCustomButtons = (icon,link) => {
        return (
            <TouchableOpacity onPress={()=>openLink(link)}
                              style={styles.customButtonWithIcon}>
                <Icon name={icon} size={24} color="white" />
            </TouchableOpacity>
            )

    }


    return (
        <ScrollView style={styles.container} ref={scrollViewRef}>

            {
                <View style={styles.webviewContainer}>
                    <WebView
                        source={{ html: companyContactInfo[currentLocation].iframe }}
                        style={styles.webview}
                    />
                </View>
            }

            <View style={styles.flexContainer}>
                {getCustomButtons("logo-facebook",info?.social_facebook)}
                {getCustomButtons("logo-instagram",info?.social_instagram)}
                {getCustomButtons("logo-pinterest",info?.social_pinterest)}
                {getCustomButtons("logo-twitter",info?.social_twitter)}
                {getCustomButtons("logo-youtube",info?.social_youtube)}
                {getCustomButtons("logo-wordpress",info?.store_web_site)}
            </View>


            <View style={styles.contactInfoContainer}>
                {
                    companyContactInfo.map((item,index) => {
                        return (
                            <View style={styles.card} key={index}>
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
    },
    flexContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 10
    },
    customButtonWithIcon: {
        backgroundColor: '#ec1c3c',
        margin: 5,
        borderRadius: 50,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    webview: {
        flex: 1,
        width: '100%',
        height: 188,
    },
    webviewContainer: {
        flex: 1
    }
});

export default CompanyLocation;
