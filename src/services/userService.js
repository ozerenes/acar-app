import AsyncStorage from "@react-native-async-storage/async-storage";

const getUserId = async () => {
     let user = await  AsyncStorage.getItem('user');
     user = JSON.parse(user);
     return user.id;
}

export { getUserId }