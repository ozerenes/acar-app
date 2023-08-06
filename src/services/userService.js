import AsyncStorage from "@react-native-async-storage/async-storage";

const getUserId = async () => {
     try {
          let user = await  AsyncStorage.getItem('user');
          user = JSON.parse(user);
          return user.id;
     }
     catch (e){
          return 0;
     }

}

export { getUserId }