import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, FlatList, StyleSheet } from 'react-native';


const Filter = ({ onSearch, onSort }) => {
    const [searchText, setSearchText] = useState('');

    const handleInputChange = (text) => {
        setSearchText(text);
        onSearch(text);
    };

    const handleSortClick = () => {
        onSort();
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search..."
                value={searchText}
                onChangeText={handleInputChange}
            />
            <TouchableOpacity style={styles.sortButton} onPress={handleSortClick}>
                <Text style={styles.sortButtonText}>Sort</Text>
            </TouchableOpacity>
        </View>
    );
};

const Item = ({ title }) => (
    <Text style={styles.item}>{title}</Text>
);

const FilterComponent = ({data}) => {
    const [searchedText, setSearchedText] = useState('');
    const [sortedData, setSortedData] = useState(data);

    const handleSearch = (text) => {
        setSearchedText(text);
        // Perform filtering logic here based on 'text'
        const filteredData = data.filter((item) =>
            item.name.toLowerCase().includes(text.toLowerCase())
        );
        setSortedData(filteredData);
    };

    const handleSort = () => {
        // Perform sorting logic here
        const sortedData = [...data].sort((a, b) =>
            a.name.localeCompare(b.name)
        );
        setSortedData(sortedData);
    };

    return (
        <>
            <Filter onSearch={handleSearch} onSort={handleSort} />
            <FlatList
                data={sortedData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <Item title={item.name} />}
            />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: 10,
    },
    searchInput: {
        flex: 1,
        backgroundColor: 'white',
        padding: 8,
        borderRadius: 8,
        marginRight: 10,
    },
    sortButton: {
        backgroundColor: '#ec1c3c',
        padding: 8,
        borderRadius: 8,
    },
    sortButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    item: {
        fontSize: 18,
        padding: 10,
    },
});

export default FilterComponent;
