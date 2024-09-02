import AsyncStorage from "@react-native-async-storage/async-storage";

// la methode pour stocker les donnees
export const STORE_DATA = async (key, VALUE) => {
    try {
        await AsyncStorage.setItem(key, VALUE);
    } catch (error) {
        console.log("error storing VALUE : ", error)
    }
}

//la methode pour recuperer les donnees
export const GET_DATA = async(key) => {
    try {
        const VALUE = await AsyncStorage.getItem(key);
        return VALUE;
    } catch (error) {
        console.log("error retrieving VALUE : ", error)
    }
}