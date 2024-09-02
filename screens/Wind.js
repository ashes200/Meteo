import React, { useState, useEffect, useContext } from "react";
import { View, Text, SafeAreaView, StyleSheet, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { GET_DATA } from "../utils/AsyncStorage"; // Import de la fonction pour obtenir des données depuis AsyncStorage
import { ThemeContext } from "../context/ThemeContext"; // Import du contexte de thème

// Composant Wind qui affiche des informations sur le vent
export default function Wind() {
  const [wind, setWind] = useState(0); // État pour stocker la vitesse du vent
  const THEME = useContext(ThemeContext); // Récupération du thème depuis le contexte

  const GET_WIND = async () => {
    const windData = await GET_DATA('wind'); // Récupération de la vitesse du vent
    console.log("wind : ", windData)
    setWind(windData);
  }
  // Effet pour récupérer la vitesse du vent depuis AsyncStorage lorsque le composant est monté
  useEffect(() => {
    GET_WIND();
  }, []);

  return (
    <View style={{ flex: 1, position: "relative" }}>
      <StatusBar style="light" />
      <Image
        blurRadius={70}
        source={require('../assets/back_01.jpg')}
        style={{ position: "absolute", height: "100%", width: "100%" }}
      />
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.title}>Wind</Text>
        {/* Affichage des informations sur le vent */}
        <Text style={[styles.text, { backgroundColor: THEME.bgWhite(0.2) }]}>
          Le vent, un élément omniprésent en météorologie, exerce une influence majeure 
          sur les conditions atmosphériques. Sa vitesse et sa direction sont des paramètres
           essentiels dans la prévision météorologique. Le vent résulte des différences
            de pression atmosphérique entre différentes régions, générant des mouvements
             d'air du haut vers le bas. Ses effets peuvent être ressentis de manière
              variable, des brises légères aux tempêtes dévastatrices. Les météorologues 
              utilisent des outils sophistiqués tels que les anémomètres et les modèles
               de prévision pour comprendre et anticiper son comportement, crucial pour la 
               sécurité des populations et des activités humaines.
        </Text>
        {/* Affichage des consignes en cas de vent fort */}
        {wind > 35 && (
          <Text style={[styles.text, { backgroundColor: THEME.bgWhite(0.2) }]}>
            Se tenir informé des alertes météorologiques émises par les autorités locales.
             Rester à l'intérieur autant que possible, loin des fenêtres et des zones 
             exposées. S'assurer que tous les objets extérieurs susceptibles d'être emportés
              par le vent sont sécurisés ou rentrés à l'intérieur. Éviter de se déplacer 
              en voiture, surtout si les vents sont violents, car cela peut être dangereux,
               surtout pour les véhicules légers et les conducteurs inexpérimentés. En cas 
               de besoin, se réfugier dans un endroit sûr et solide, comme un sous-sol ou 
               un abri anti-tempête.
          </Text>
        )}
      </SafeAreaView>
    </View>
  );
}

// Styles pour le composant Wind
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
  text: {
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
});
