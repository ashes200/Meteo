import React, { useContext} from "react";
import { View, Text, SafeAreaView, StyleSheet, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { ThemeContext } from "../context/ThemeContext"; // Import du contexte de thème

export default function Humidity(){
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
                <Text style={styles.title}>Humidity</Text>
                <Text style={[styles.text, { backgroundColor: THEME.bgWhite(0.2) }]}>
                    L'humidité est un élément clé en météorologie, jouant un rôle important dans la compréhension et la prédiction des 
                    conditions atmosphériques. En météorologie, l'humidité fait référence à la quantité de vapeur d'eau présente dans l'air.
                     Cette mesure est généralement exprimée en pourcentage sous forme de taux d'humidité relative.

                    L'humidité atmosphérique peut avoir un impact significatif sur le temps qu'il fait. Par exemple, une humidité élevée 
                    peut rendre la chaleur plus étouffante en été, tandis qu'une humidité basse peut accroître la sensation de froid en hiver.

                    En météorologie, l'humidité est souvent mesurée à l'aide d'un hygromètre. Les météorologues utilisent ces données pour
                     évaluer l'humidité relative, qui est la quantité de vapeur d'eau présente dans l'air par rapport à la quantité maximale
                      que l'air peut contenir à une température donnée. Une humidité relative élevée indique que l'air est proche de la 
                      saturation en vapeur d'eau, ce qui peut favoriser la formation de nuages, de brouillard et éventuellement de précipitations.

                    En résumé, l'humidité en météorologie est un aspect crucial pour comprendre et prévoir les conditions atmosphériques, et 
                    elle joue un rôle majeur dans de nombreux phénomènes météorologiques, de la formation des nuages à la régulation de la 
                    température et de la sensation de confort.
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