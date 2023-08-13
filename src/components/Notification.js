import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Eğer Expo kullanıyorsanız bu kısmı düzeltin

const Notification = ({ message, onClose }) => {
    return (
        <View style={styles.container}>
            <View style={styles.notification}>
                <View style={styles.iconContainer}>
                    <Ionicons name="ios-notifications" size={24} color="#fff" />
                </View>
                <Text style={styles.messageText}>{message}</Text>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                    <Ionicons name="ios-close" size={24} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 50,
        left: 20,
        right: 20,
        zIndex: 999,
    },
    notification: {
        backgroundColor: '#ec1c3c', // Facebook mavisi
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 5,
    },
    iconContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 999,
        padding: 8,
        marginRight: 10,
    },
    messageText: {
        flex: 1,
        color: '#fff',
        fontSize: 16,
    },
    closeButton: {
        padding: 5,
    },
});

export default Notification;
