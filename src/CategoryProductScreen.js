import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    TextInput
} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import service from "./services/service";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUserId} from "./services/userService";

const screenWidth = Dimensions.get('window').width / 2;
const CategoryProductScreen = ({ route }) => {
    const navigation = useNavigation();

    const [products,setProducts]  = useState([]);
    const [bgProducts,setBgProducts]  = useState([]);
    const [isFilterOpen, setFilterOpen] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [sort, setSort] = useState('');
    useEffect(() => {

            fetchData()

    },[route.params.currentCategory])


    const fetchData = async () => {

        const userId = await getUserId();
        service.getData('api/category/'+userId+'/'+route.params.currentCategory).then(response => {
            const  data = response.products.map(item => {
                return {
                    id : item.id,
                    name: item.name,
                    price : item.price,
                    image :"https://www.acar.kodlanabilir.com/storage/products/thumbnails/"+item.picture,
                    ...item
                }
            });
            setProducts(
                data
            );
            setBgProducts(data);
        });
    }

    const likeUnlike = async (product_id, like) => {
        const userId = JSON.parse(await AsyncStorage.getItem('user')).id;
        let url = "product-like"
        if (like) {
            url = 'product-unlike'
        }
        url = `api/${url}`;
        let params = {
            userid : userId,
            productid : product_id
        }

        service.postData(url,params).then(response => {
            if(response === 'OK'){
                setProducts(products.map(item => {
                    if(item.id == product_id){
                        return {
                            ...item,
                            liked : !like,
                        }
                    }
                    else{
                        return  item;
                    }

                }))
            }
        })
    }
    const handleFilterToggle = () => {
        setFilterOpen(!isFilterOpen);
    };
    const handleInputChange = (text) => {
        setSearchText(text);
    };
    const handleSortChange = (value) => {
        setSort(value);
    };
    useEffect(() => {

        const debounceSearch = setTimeout(() => {
            let sortedData = [];
            if(searchText) {
                sortedData =  [...bgProducts.filter((item => normalize(item.name).indexOf(normalize(searchText)) !== -1 ))]
            }
            else{
                sortedData = [...bgProducts];
            }
            switch (sort) {
                case 'price_high_to_low':
                    sortedData = [...sortedData].sort((a, b) => b.price - a.price);
                    break;
                case 'name_desc':
                    sortedData = [...sortedData].sort((a, b) => b.name.localeCompare(a.name));
                    break;
                case 'price_low_to_high':
                    sortedData = [...sortedData].sort((a, b) => a.price - b.price);
                    break;
                case 'name_asc':
                    sortedData = [...sortedData].sort((a, b) => a.name.localeCompare(b.name));
                    break;
                default:
                    sortedData = products;
            }
            setProducts(sortedData);
        }, 300); // 300 milisaniyelik debounce gecikmesi

        return () => {
            // useEffect her çalıştığında, önceki timeout'u temizle
            clearTimeout(debounceSearch);
        };



    },[searchText,sort])

    const normalize = (text) => {
        return text.toUpperCase().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").normalize("NFC");
    }

    const renderProductItem = ({ item ,index }) => {
        return (
            <View style={[(products.length - 1 === index) ? styles.lastItem : styles.productItem]}>

                <TouchableOpacity onPress={() => {
                    likeUnlike(item.id, item.liked)
                }} style={styles.heart}>
                    <Icon name={item.liked ? "ios-heart" : "ios-heart-outline"} size={30} color="red" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Detaylar', {
                            itemId: item.id,
                        })
                    }}>
                    <Image source={{uri: item.image}} style={styles.productImage}/>
                    <View style={styles.productItemFooter}>
                        <Text style={styles.productName}>{item.name}</Text>
                        <Text style={styles.productName}>{item.price} TL</Text>
                    </View>
                </TouchableOpacity>

            </View>
        )
    };



    return (
        <View>
            <TouchableOpacity onPress={handleFilterToggle} style={styles.filterButton}>
                <Icon name={"filter-outline"} color={"#fff"} size={30} />
                <Text style={styles.filterButtonText}>Filtrele</Text>
            </TouchableOpacity>
            {
                isFilterOpen && <View style={styles.containerFilter}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <TouchableOpacity
                            style={[styles.sortOption, sort === 'name_asc' && styles.selectedOption]}
                            onPress={() => handleSortChange('name_asc')}
                        >
                            <Text style={[styles.sortOptionText, sort === 'name_asc' && styles.selectedText]}>İsim: A dan Z ye</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.sortOption, sort === 'name_desc' && styles.selectedOption]}
                            onPress={() => handleSortChange('name_desc')}
                        >
                            <Text style={[styles.sortOptionText, sort === 'name_desc' && styles.selectedText]}>İsim: Z den A ya</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.sortOption, sort === 'price_low_to_high' && styles.selectedOption]}
                            onPress={() => handleSortChange('price_low_to_high')}
                        >
                            <Text style={[styles.sortOptionText, sort === 'price_low_to_high' && styles.selectedText]}>Fiyat: Azdan Çoka</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.sortOption, sort === 'price_high_to_low' && styles.selectedOption]}
                            onPress={() => handleSortChange('price_high_to_low')}
                        >
                            <Text style={[styles.sortOptionText, sort === 'price_high_to_low' && styles.selectedText]}>Fiyat: Çoktan Aza</Text>
                        </TouchableOpacity>
                    </ScrollView>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Ara..."
                        value={searchText}
                        onChangeText={handleInputChange}
                    />
            </View> }
            <FlatList
                style={{marginTop: 15}}
                data={products}
                renderItem={renderProductItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.container}
                numColumns={2} // İki elemanı yan yana sıralamak için numColumns'u 2 olarak ayarlayın
            />
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f0f0f0',
    },
    containerFilter : {
        flexDirection: 'column',
        backgroundColor: '#f0f0f0',
        padding: 10,
    },
    productItem: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 8,
        margin: 8,
        justifyContent: 'space-between',
    },
    productImage: {
        width: (Dimensions.get('window').width / 2) - 15,
        height: 140,
        resizeMode: 'stretch',
        marginBottom: 15,
        borderTopLeftRadius: 7,
        borderTopRightRadius: 7
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    productPrice: {
        fontSize: 14,
        color: '#666',
    },
    productItemFooter: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15
    },
    heart: {
        width: 28,
        height: 28,
        position: "absolute",
        zIndex: 122122,
        right: 15,
        top: 15
    },
    lastItem: {
        width: screenWidth - 15,
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        margin: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    filterButton: {
        backgroundColor: '#ec1c3c',
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    filterButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 15,
        fontSize: 16
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

export default CategoryProductScreen;
