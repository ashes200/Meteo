import React, { useContext, useState, useEffect } from 'react';
import MapView, {Marker} from 'react-native-maps';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';
//import { Marker } from 'react-native-svg';
import * as Location from 'expo-location';
import { STORE_DATA } from "../utils/AsyncStorage"; // Import des fonctions AsyncStorage
import { useNavigation } from '@react-navigation/native'; // Import de la navigation

export default function Maps() {
    const navigation = useNavigation(); // Utilisation du hook de navigation
    const LAT = 45.508888;
    const LON = -73.561668;
    const [mapRegion, setMapRegion] = useState({
        latitude: LAT,
        longitude: LON,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    let city= 'Montreal';

    const USER_LOCATION = async () => {
        let {status} = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to acces location was denied');
        }
        let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
        setMapRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        })
            // Utiliser les coordonnées pour obtenir des informations détaillées sur l'emplacement
        let reverseGeocode = await Location.reverseGeocodeAsync({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        });

        // Extraire le nom de la ville de la réponse du géocodage inversé
        let myCity = reverseGeocode[0].city;
        city = myCity;
        console.log('City:', city);
    }

    const SET_LOCATION = () => {
        USER_LOCATION();
        STORE_DATA('city', city);
        navigation.navigate('Home');
    }

    useEffect(() => {
        USER_LOCATION();
    }, []);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} 
        region={mapRegion}
      >
        <Marker coordinate={mapRegion} title='Marker'/>
      </MapView>
      <TouchableOpacity
        style={styles.button}
            onPress={()=> SET_LOCATION()}
        >
            <Text  style={styles.buttonText}>Get Location</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '90%',
  },
  button: {
      backgroundColor: "#007bff",
      paddingVertical: 10,
      marginTop: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
  },
  buttonText: {
      color: "#fff",
      fontWeight: "bold",
      textAlign: 'center',
      fontSize: 18,
  },
});