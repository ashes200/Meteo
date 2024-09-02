import React, { useContext } from "react";
import { View, Text, SafeAreaView, StyleSheet, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { ThemeContext } from "../context/ThemeContext"; // Import du contexte de thème

export default function SunRise(){    
  const THEME = useContext(ThemeContext); // Récupération du thème depuis le contexte
    return (
        <View style={{ flex: 1, position: "relative" }}>
            <StatusBar style="light" />
            <Image
            blurRadius={70}
            source={require('../assets/back_01.jpg')}
            style={{ position: "absolute", height: "100%", width: "100%" }}
            />
            <SafeAreaView style={styles.safeArea}>
                <Text  style={styles.title}>SunRise</Text>
                <Text style={[styles.text, { backgroundColor: THEME.bgWhite(0.2) }]}>
                    Les levers de soleil jouent un rôle essentiel dans la météorologie en influençant les conditions 
                    atmosphériques et en déterminant les tendances météorologiques quotidiennes. Un lever de soleil se 
                    produit lorsque le soleil commence à émerger à l'horizon, illuminant progressivement le ciel et 
                    dissipant l'obscurité de la nuit.

                    En météorologie, les levers de soleil peuvent fournir des indices sur les conditions météorologiques à venir. 
                    Par exemple, un ciel dégagé au lever du soleil indique souvent une journée ensoleillée et agréable. À l'inverse,
                     des nuages bas ou des bancs de brouillard au lever du soleil peuvent présager une journée nuageuse ou même pluvieuse.

                    De plus, la manière dont la lumière du soleil interagit avec l'atmosphère au lever peut produire des effets
                     visuels intéressants tels que des couleurs vives et des nuages ​​lumineux, ce qui peut donner des indications 
                     sur la présence d'humidité, de poussière atmosphérique ou d'autres particules en suspension.

                    Les levers de soleil ne sont pas seulement esthétiquement agréables, mais ils fournissent également des informations 
                    utiles aux météorologues pour évaluer les tendances météorologiques immédiates et anticiper les conditions 
                    atmosphériques à venir tout au long de la journée.
                </Text>
            </SafeAreaView>
        </View>
    )
}

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
  