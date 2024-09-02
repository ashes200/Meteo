import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity, TextInput } from "react-native";
import { StatusBar } from "expo-status-bar";
import { GET_DATA } from "../utils/AsyncStorage";
import { THEME } from "../theme";

// Composant Login pour permettre à l'utilisateur de se connecter
export default function Login({ navigation }) {
    const [isEnabled, setIsEnabled] = useState(false); // État pour gérer l'état du switch
    const [username, setUsername] = useState(""); // État pour stocker le nom d'utilisateur saisi par l'utilisateur
    const [password, setPassword] = useState(""); // État pour stocker le mot de passe saisi par l'utilisateur
    const USERNAME_TRUE = 'Username'; // Nom d'utilisateur prédéfini
    const PASSWORD_TRUE = 'Password'; // Mot de passe prédéfini

    //const THEME = useContext(ThemeContext); // Récupération du thème depuis le contexte
    // Effet pour charger la valeur actuelle du switch depuis le stockage local
    useEffect(() => {
        const FETCH_DATA = async () => {
            const STORE_SWITCH_VALUE = await GET_DATA("switchValue");
            if (STORE_SWITCH_VALUE !== null) {
                setIsEnabled(STORE_SWITCH_VALUE === "true");
            }
        };
        FETCH_DATA();
    }, []);

    // Effet pour appeler HANDLE_LOGIN lorsque isEnabled est mis à jour
    useEffect(() => {
        HANDLE_LOGIN();
    }, [isEnabled]);

    // ouvre la page d'accueil si on s'est garder connecter
    const HANDLE_LOGIN = () => {
        if (isEnabled) {
            navigation.navigate('Home');
        }
    };
    // Fonction pour vérifier la connexion de l'utilisateur
    const VERIF_LOGIN = () => {
        // Vérifie si les données saisies par l'utilisateur correspondent aux données prédéfinies
        if (username === USERNAME_TRUE && password === PASSWORD_TRUE) {
            navigation.navigate('Home'); // Redirige vers la page d'accueil si les informations sont correctes
        } else {
            alert("Username or Password is invalid"); // Affiche une alerte si les informations sont incorrectes
        }
    }

    return (
        <View style={{ flex: 1, position: "relative" }}>
            <StatusBar style="light" />
            <Image
                blurRadius={70}
                source={require('../assets/back_01.jpg')}
                style={{ position: "absolute", height: "100%", width: "100%" }}
            />
            <SafeAreaView style={styles.safeArea}>
                <Text style={styles.title}>Login</Text>
                <View style={styles.form}>
                    <Text style={styles.label}>Username</Text>
                    {/* Champ de saisie pour le nom d'utilisateur */}
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        onChangeText={(text) => setUsername(text)}
                    />
                    {/* Champ de saisie pour le mot de passe */}
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry={true}
                        onChangeText={(text) => setPassword(text)}
                    />
                    {/* Bouton de connexion */}
                    <TouchableOpacity onPress={VERIF_LOGIN} style={styles.button}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        marginHorizontal: 16,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'column',
    },
    
    form: {
        backgroundColor: THEME.bgWhite(0.2),
        //flex: 1,
        paddingBottom: 20,
        width: '100%',
        //justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#007bff",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 18,
    },
    label: {
        width: '100%',
        textAlign: "center",
        fontSize: 18,
        marginBottom: 10,
        marginTop: 10,
    },
    input: {
        backgroundColor: THEME.bgWhite(0.2),
        width: '100%',
        textAlign: "center",
        marginBottom: 10,
        marginTop: 10,
    }
});
