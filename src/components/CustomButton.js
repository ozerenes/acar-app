import {Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import React from "react";

export default ({ onPress, icon ,count }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            {
                count ?             <View style={{ marginRight: 10 }}>
                        <View style={{
                            position: 'absolute',
                            backgroundColor: "red",
                            borderRadius: 999, // Yuvarlak yapmak için büyük bir değer kullanıyoruz
                            justifyContent: 'center', // İçeriği yatay ve dikey olarak ortala
                            alignItems: 'center',
                            width: 20,
                            height: 20,
                            top: -5, // Konumu ayarla
                            right: -5,
                            zIndex: 99,
                        }}>
                            <Text style={{
                                color: "white",
                                fontSize: 12,
                            }}>{count}</Text>
                        </View>
                        <Icon name={icon} color={"#040404"} size={40} />
                    </View>
                    :
                    <View style={{ marginRight: 10 }}>
                        <Icon name={icon} color={"#040404"} size={40} />
                    </View>
            }

        </TouchableOpacity>
    );
};