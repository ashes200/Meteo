import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, StyleSheet, Image, FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";
import { GET_DATA } from "../utils/AsyncStorage"; // Import de la fonction pour obtenir des données depuis AsyncStorage

// Composant AllDay qui affiche les prévisions météorologiques pour les 24 prochaines heures
export default function AllDay(){
    const [temp, setTemp] = useState(0); // État pour stocker la température
    const [hour, setHour] = useState(0); // État pour stocker l'heure actuelle
    const [img, setImg] = useState(); // État pour stocker l'URL de l'image météo
    const [data, setData] = useState([]); // État pour stocker les données à afficher dans la liste

    // Fonction pour générer la liste des prévisions horaires
    const SET_LIST = async (h, temperature) => {
        let newData = [];
        for (let i = h; i <= 23; i++) {
            newData.push({ hour: i, temps: temperature });
        }
        setData(newData);
    };

    // Effet pour récupérer les données météorologiques et l'heure actuelle lorsque le composant est monté
    useEffect(() => {
        const FETCH_DATA = async () => {
          const TEMP_DATA = await GET_DATA('temp'); // Récupération de la température depuis AsyncStorage
          const IMG_DATA = await GET_DATA('img'); // Récupération de l'URL de l'image météo depuis AsyncStorage

          const HOUR_DATA = new Date(); // Obtention de l'heure actuelle
          const HOUR_FORMAT = parseInt(HOUR_DATA.getHours()); // Formatage de l'heure actuelle en format 24h
      
          console.log('img : ', IMG_DATA);
          setHour(HOUR_FORMAT); // Mise à jour de l'état avec l'heure actuelle
          setTemp(TEMP_DATA); // Mise à jour de l'état avec la température
          setImg(IMG_DATA); // Mise à jour de l'état avec l'URL de l'image météo
        };
        FETCH_DATA(); // Appel de la fonction pour récupérer les données météorologiques et l'heure actuelle
    }, []);

    // Effet pour générer la liste des prévisions horaires lorsque l'heure actuelle est mise à jour
    useEffect(() => {
        SET_LIST(hour, temp); // Appel à SET_LIST lorsque l'heure actuelle est mise à jour
    }, [hour]);

    // Fonction de rendu pour chaque élément de la liste
    const RENDER_LIST = ({ item }) => (
        <View style={styles.item}>
          <Text style={styles.hour}>{item.hour} H</Text>
          <Image
            source={{uri: img}} // Utilisation de l'URL de l'image météo
            className="w-10 h-10"
          />
          <Text style={styles.temp}>{item.temps}&#176;</Text>
        </View>
    );

    return (
        <View style={{ flex: 1, position: "relative" }}>
            <StatusBar style="light" />
            <Image
            blurRadius={70}
            source={require('../assets/back_01.jpg')}
            style={{ position: "absolute", height: "100%", width: "100%" }}
            />
            <SafeAreaView style={styles.safeArea}>
                <Text style={styles.title}>24H weather </Text>
                {/* Utilisation de FlatList pour afficher la liste des prévisions horaires */}
                <FlatList
                  data={data}
                  renderItem={RENDER_LIST}
                  keyExtractor={(item) => item.hour.toString()} // Utilisation de toString() pour la clé
                />
            </SafeAreaView>
        </View>
    )
}

// Styles pour le composant AllDay
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    marginHorizontal: 16,
    alignItems: "center",
    overflowX: "scroll",
  },
  title: {
    marginBottom: 16,
    fontSize: 24,
    fontWeight: "bold",
  },
  item: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 3,
    borderBottomColor: '#ccc',
  },
  hour: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  temp: {
    fontSize: 16,
  },
});
