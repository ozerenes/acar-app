import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, FlatList, StyleSheet, ScrollView } from 'react-native';
import {useNavigation} from "@react-navigation/native";

const Filter = ({ onSearch, onSort, selectedSort }) => {
    const [searchText, setSearchText] = useState('');

    const handleInputChange = (text) => {
        setSearchText(text);
        onSearch(text);
    };

    const handleSortChange = (value) => {
        onSort(value);
    };

    return (
        <View style={styles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <TouchableOpacity
                    style={[styles.sortOption, selectedSort === 'name_asc' && styles.selectedOption]}
                    onPress={() => handleSortChange('name_asc')}
                >
                    <Text style={[styles.sortOptionText, selectedSort === 'name_asc' && styles.selectedText]}>İsim: A dan Z ye</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.sortOption, selectedSort === 'name_desc' && styles.selectedOption]}
                    onPress={() => handleSortChange('name_desc')}
                >
                    <Text style={[styles.sortOptionText, selectedSort === 'name_desc' && styles.selectedText]}>İsim: Z den A ya</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.sortOption, selectedSort === 'price_low_to_high' && styles.selectedOption]}
                    onPress={() => handleSortChange('price_low_to_high')}
                >
                    <Text style={[styles.sortOptionText, selectedSort === 'price_low_to_high' && styles.selectedText]}>Fiyat: Azdan Çoka</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.sortOption, selectedSort === 'price_high_to_low' && styles.selectedOption]}
                    onPress={() => handleSortChange('price_high_to_low')}
                >
                    <Text style={[styles.sortOptionText, selectedSort === 'price_high_to_low' && styles.selectedText]}>Fiyat: Çoktan Aza</Text>
                </TouchableOpacity>
            </ScrollView>
            <TextInput
                style={styles.searchInput}
                placeholder="Ara..."
                value={searchText}
                onChangeText={handleInputChange}
            />
        </View>
    );
};

const FilterComponent = ({ data }) => {
    const [sortedData, setSortedData] = useState(data);
    const [selectedSort, setSelectedSort] = useState("name_asc");
    const navigation = useNavigation(); // Move the useNavigation hook here
    const listRenderItem = ( item ) => {
        return (
            <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => {
                    navigation.navigate('Detaylar', {
                        itemId: item.id,
                    })
                }}>
                <Text style={styles.itemText}>
                    {item.name + "  (" + item.price + "TL)"}
                </Text>
            </TouchableOpacity>
        )
    };
    const handleSearch = (text) => {
        const filteredData = data.filter((item) =>
            item.name.toLowerCase().includes(text.toLowerCase())
        );
        setSortedData(filteredData);
    };

    const handleSort = (value) => {
        // Perform sorting logic here
        setSelectedSort(value);

        let sortedData;
        switch (value) {
            case 'price_high_to_low':
                sortedData = [...data].sort((a, b) => b.price - a.price);
                break;
            case 'name_desc':
                sortedData = [...data].sort((a, b) => b.name.localeCompare(a.name));
                break;
            case 'price_low_to_high':
                sortedData = [...data].sort((a, b) => a.price - b.price);
                break;
            case 'name_asc':
                sortedData = [...data].sort((a, b) => a.name.localeCompare(b.name));
                break;
            default:
                sortedData = data;
        }
        setSortedData(sortedData);
    };

    return (
        <>
            <Filter onSearch={handleSearch} onSort={handleSort} selectedSort={selectedSort} />
            <FlatList
                data={sortedData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => listRenderItem(item)}
            />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: '#f0f0f0',
        padding: 10,
    },
    searchInput: {
        backgroundColor: 'white',
        padding: 8,
        borderRadius: 8,
        marginBottom: 10,
        marginTop: 10
    },
    sortContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    itemContainer: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    itemText: {
        fontSize: 16,
    },
    sortOption: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        marginRight: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    selectedOption: {
        backgroundColor: '#ec1c3c',
        borderColor: '#ec1c3c',
    },
    selectedText: {
        color: '#fff'
    },
    sortOptionText: {
        fontWeight: 'bold',
        color: '#333',
    },
    item: {
        fontSize: 18,
        padding: 10,
    },
});

export default FilterComponent;
