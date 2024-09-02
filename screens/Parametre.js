import axios from 'axios';
import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, StyleSheet, Image, Switch } from "react-native";
import { StatusBar } from "expo-status-bar";
import { GET_DATA, STORE_DATA } from "../utils/AsyncStorage"; // Import des fonctions AsyncStorage

// Composant Parametre pour afficher les paramètres de l'application
export default function Parametre() {
    const [isEnabled, setIsEnabled] = useState(false); // État pour gérer l'état du bouton de commutation

    // Effet pour charger la valeur actuelle du localStorage lorsque le composant est monté
    useEffect(() => {
        const FETCH_DATA = async () => {
            const STORED_SWITCH_VALUE = await GET_DATA("switchValue"); // Récupération de la valeur du localStorage
            if (STORED_SWITCH_VALUE !== null) {
                setIsEnabled(STORED_SWITCH_VALUE === "true"); // Mise à jour de l'état en fonction de la valeur du localStorage
            }
        };
        FETCH_DATA();
    }, []);

    // Fonction pour inverser la valeur du bouton de commutation et la stocker dans le localStorage
    const TOGGLE_SWITCH = async () => {
        const NEW_VALUE = !isEnabled; // Inversion de la valeur actuelle
        setIsEnabled(NEW_VALUE); // Mise à jour de l'état
        await STORE_DATA("switchValue", NEW_VALUE.toString()); // Stockage de la nouvelle valeur dans le localStorage
        let texte = 'connexion automatique ';
        if(NEW_VALUE){
            texte = texte + 'activee';
        }
        else {
            texte = texte + 'desactivee';
        }

        axios.post(`https://app.nativenotify.com/api/notification`, {
            appId: 20285,
            appToken: "QvRQGr0pP8qfyd8DVp5DL5",
            title: "connexion",
            body: texte,
            dateSent: "3-19-2024 11:33PM",
        });
    };

    return (
        <View style={{ flex: 1, position: "relative" }}>
            <StatusBar style="light" />
            <Image
                blurRadius={70}
                source={require('../assets/back_01.jpg')}
                style={{ position: "absolute", height: "100%", width: "100%" }}
            />
            <SafeAreaView style={styles.safeArea}>
                <Text style={styles.title}>Stay connected </Text>
                {/* Bouton de commutation pour rester connecté */}
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={TOGGLE_SWITCH}
                    value={isEnabled}
                />
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      marginHorizontal: 16,
      flexDirection: 'row',
      alignItems: "center",
      overflowX: "scroll",
      justifyContent: 'space-between',
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
    },
    text: {
      marginBottom: 16,
      paddingHorizontal: 16,
      paddingVertical: 24,
    },
  });