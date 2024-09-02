import React, { useCallback, useContext, useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
//import { THEME } from "../theme";
import { ThemeContext } from "../context/ThemeContext"; // Import du contexte de thème
import { debounce } from 'lodash'; // Import de la fonction debounce pour le texte en attente

import { MagnifyingGlassIcon, SunIcon, PlusIcon, MapIcon } from 'react-native-heroicons/outline' // Import des icônes
import { CalendarDaysIcon, MapPinIcon, Cog6ToothIcon, UserIcon } from 'react-native-heroicons/solid' // Import des icônes
import { FETCH_LOCATION, FETCH_WEATHER_FORCAST } from "../api/weather"; // Import des fonctions de l'API météo
import * as Progress from 'react-native-progress'; // Import de la barre de progression
import { GET_DATA, STORE_DATA } from "../utils/AsyncStorage"; // Import des fonctions AsyncStorage
import { useNavigation } from '@react-navigation/native'; // Import de la navigation

// Composant HomeScreen pour afficher les prévisions météorologiques
export default function HomeScreen(){
    const [showsearch, toogleSearch] = useState(false); // État pour afficher/masquer la barre de recherche
    const [locations, setLocations] = useState([]); // État pour stocker les emplacements trouvés
    const [weather, setWeather] = useState({}); // État pour stocker les données météorologiques
    const [loading, setLoading] = useState(true); // État pour gérer le chargement

    const navigation = useNavigation(); // Utilisation du hook de navigation
    let cityName = 'montreal' // Initialisation du nom de la ville par défaut
    
   const THEME = useContext(ThemeContext); // Récupération du thème depuis le contexte

    // Fonction pour gérer la sélection d'un emplacement dans la recherche
    const HANDLE_LOCATION = (loc) => {
        setLocations([]); // Réinitialisation des emplacements
        toogleSearch(false); // Masquage de la barre de recherche
        setLoading(true); // Activation du chargement
        FETCH_WEATHER_FORCAST({ // Appel à la fonction de l'API météo pour obtenir les prévisions
            cityName: loc.name,
            days: '7'
        }).then(data=>{
            setWeather(data); // Mise à jour des données météorologiques
            setLoading(false); // Désactivation du chargement
            STORE_DATA('city', loc.name); // Stockage du nom de la ville sélectionnée
        })
    }

    // Fonction pour gérer la recherche d'emplacements
    const HANDLE_SEARCH = value=> {
        console.log('la ville envoyer : ', value);
        if(value.length > 2) {
            FETCH_LOCATION({cityName: value}).then(data=>{
                setLocations(data); // Mise à jour des emplacements trouvés
            })
        }
    }

    // Fonction pour obtenir la ville sauvegardée dans AsyncStorage
    const GET_CITY = async () => {
        let myCity = await GET_DATA('city');
        if(myCity){
            cityName = myCity; // Mise à jour du nom de la ville
        }
    }

    // Fonction pour obtenir les données météorologiques de la ville sauvegardée
    const FETCH_MY_WEATHER_DATA = async ()=>{
        FETCH_WEATHER_FORCAST({
            cityName: cityName,
            days: '7'
        }).then(data =>{
            setWeather(data) // Mise à jour des données météorologiques
            setLoading(false); // Désactivation du chargement
        })
    }

    // Effet pour obtenir la ville sauvegardée lorsque le composant est monté
    useEffect( async ()=> {
        GET_CITY()
    }, []);

    // Effet pour obtenir les données météorologiques de la ville sauvegardée lorsque le composant est monté
    useEffect(()=> {
        FETCH_MY_WEATHER_DATA();
    }, []);

    // Fonction pour naviguer vers la page Wind
    const GO_TO_WIND_PAGE = async (wind)=> {
        let tempW = wind;
        STORE_DATA('windd', tempW); // Stockage de la vitesse du vent
        navigation.navigate('Wind'); // Navigation vers la page Wind
    }
    
    // Fonction pour naviguer vers la page AllDay
    const GO_TO_ALL_PAGE = (temp, hour)=> {
        const IMG = 'https:'+current?.condition?.icon; // URL de l'image météo

        console.log('img : ', IMG);

        STORE_DATA('img', IMG); // Stockage de l'URL de l'image
        STORE_DATA('temp',  temp); // Stockage de la température
        STORE_DATA('hour',  hour); // Stockage de l'heure
        navigation.navigate('AllDay'); // Navigation vers la page AllDay
    }

    // Fonction de recherche avec délai pour la barre de recherche
    const HANDLE_TEXT_DEBOUNCE = useCallback(debounce(HANDLE_SEARCH, 1200), [])
    const {current, location} = weather // Récupération des données météorologiques actuelles
    
    return (
        <View className="flex-1 relative">
            <StatusBar style="light" />
            <Image blurRadius={70} source={require('../assets/back_01.jpg')} 
                className="absolute h-full w-full"
            />
            {loading ? (
                <View className="flex-1 flex-row justify-center items-center">
                    {/* <Text className="text-white text-4xl">Loading ...</Text> */}
                    <Progress.CircleSnail thickness={10} size={140} color="white"/>
                </View>
            ) : (
            <SafeAreaView className="flex flex-1" style={styles.safeArea}>
                {/** search section */}
                <View className="mx-4 relative z-50 flex-row items-center"  style={styles.box}>
                    {
                        showsearch ? (
                            <TouchableOpacity onPress={() => navigation.navigate('Maps')}>
                                <MapIcon  size="40" color="white" style={styles.icon}/>
                            </TouchableOpacity>
                        ) : null
                    }
                    <View className="flex-row justify-end items-center rounded-full flex-1 "
                        style={{backgroundColor: showsearch ? THEME.bgWhite(0.2) : 'transparent'}}>
                            {
                                showsearch ? (
                                    <TextInput
                                        //style={styles.input}
                                        onChangeText={HANDLE_TEXT_DEBOUNCE}
                                        placeholder="Search city"
                                        placeholderTextColor={'lightgray'}
                                        className="pl-6 h-10 pb-1 flex-1 text-base text-white"
                                    />
                                ) : null
                            }

                        <TouchableOpacity
                            onPress={()=> toogleSearch(!showsearch)}
                            style={{backgroundColor: THEME.bgWhite(0.3)}}
                            className="rounded-full p-3 m-1"
                        >
                            <MagnifyingGlassIcon size="25" color="white" />
                        </TouchableOpacity>
                    </View>
                    {
                        locations.length>0 && showsearch? (
                            <View className="absolute w-full bg-gray-300 top-16 rounded-3xl" style={styles.trans}>
                                {
                                    locations.map((loc, index)=>{
                                        let showBorder = index+1 != locations.length;
                                        let borderClass = showBorder ? 'border-b-2 border-b-gray-400' : ''
                                        return (
                                            <TouchableOpacity
                                                onPress={() => HANDLE_LOCATION(loc)}
                                                key={index}
                                                className={"flex-row items-center border-0 p-3 px-4 mb-1 " + borderClass}
                                            >
                                                <MapPinIcon size="20" color="gray"/>
                                                <Text className="text-black text-lg ml-2">{loc?.name}, {loc?.country}</Text>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                        ) : null
                    }
                </View>
                
                {/** forecast section */}
                <View className="mx-4 flex justify-around flex-1 mb-2 ">
                    {/** location */}
                    <Text className="text-white text-center text-2xl font-bold">
                        {location?.name},
                        <Text className="text-lg font-semibold text-gray-300">
                                {" " + location?.country}
                        </Text>
                    </Text>
                    {/** weather image */}
                    <View className="flex-row justify-center">
                        <Image
                            source={{uri: 'https:'+current?.condition?.icon}}
                            // source={require('../assets/Icon/icon_01.webp')}
                            className="w-52 h-52"
                        />
                    </View>
                    {/** degree celcius */}
                    <View className="space-y-2">
                        <Text className="text-center font-bold text-white text-6xl ml-5">
                            {current?.temp_c}&#176;
                        </Text>
                        <Text className="text-center text-white text-xl tracking-widest">
                            {current?.condition?.text}
                        </Text>
                    </View>
                    {/** other stats */}
                    <View className="flex-row justify-between mx-4">
                        <View className="flex-row space-x-2 items-center">
                            <TouchableOpacity onPress={() => GO_TO_WIND_PAGE(current?.wind_kph)}>
                                <Image source={require('../assets/Icon/wind_icon.png')} className="h-4 w-4"/>
                                <Text className="text-white font-semibold text-base">
                                    {current?.wind_kph}km/h
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View className="flex-row space-x-2 items-center">
                            <TouchableOpacity onPress={() => navigation.navigate('Humidity')}>
                                <Image source={require('../assets/Icon/drop_icon.png')} className="h-4 w-4"/>
                                <Text className="text-white font-semibold text-base">
                                    {current?.humidity}%
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View className="flex-row space-x-2 items-center">
                        <TouchableOpacity onPress={() => navigation.navigate('SunRise')}>
                            <SunIcon size="25" color="white" />
                            <Text className="text-white font-semibold text-base">
                                {weather?.forecast?.forecastday[0]?.astro?.sunrise}
                            </Text>
                        </TouchableOpacity>
                        </View>
                    </View>

                    <View className="space-x-2 items-center ">
                        <TouchableOpacity onPress={() => GO_TO_ALL_PAGE(current?.temp_c, weather?.forecast?.forecastday[0]?.astro?.sunrise)}>
                            <PlusIcon size="25" color="white" />
                            <Text className="text-white font-semibold text-base">
                                24H
                            </Text>
                        </TouchableOpacity>
                    </View>
                    
                    
                </View>
                {/** forecast for next days */}
                <View className="mb-2 space-y-3">
                    <View className="flex-row items-center mx-5 space-x-2">
                        <CalendarDaysIcon size="22" color="white"/>
                        <Text className="text-white text-base">Daily forecast</Text>
                    </View>
                    <ScrollView
                        horizontal
                        contentContainerStyle={{paddingHorizontal: 15}}
                        showsHorizontalScrollIndicator={false}
                    >
                        {
                            weather?.forecast?.forecastday?.map((item, index)=>{
                                let date = new Date(item.date);
                                let options = {weekday: 'long'};
                                let dayName = date.toLocaleDateString('fr-FR', options);
                                console.log('index : ', index);
                                return (
                                    <View
                                    key={index}
                                        className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
                                        style={{backgroundColor: THEME.bgWhite(0.15)}}
                                    >
                                        <Image 
                                            source={{uri: 'https:'+ item?.day?.condition?.icon}}
                                            //source={{uri: 'https:'+current?.condition?.icon}}
                                            //source={require('../assets/Icon/weather_icon_02.png')} 
                                            className="h-11 w-11" />
                                        <Text className="text-white">{dayName}</Text>
                                        <Text className="text-white text-xl font-semibold">
                                            {item?.day?.avgtemp_c}&#176;
                                        </Text>
                                    </View>
                                )
                            })
                        }
                    </ScrollView>
                </View>
                
                <View  className="flex-row justify-between mx-4 mb-2">
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <UserIcon size="25" color="white" />
                        </TouchableOpacity>
                    </View>

                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate('Parameter')}>
                            <Cog6ToothIcon size="25" color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
            )}

        </View>
    )
}

const styles = StyleSheet.create({
    safeArea: {
      marginTop: '15%',
    },
    trans: {
        backgroundColor: 'rgb(229 229 229)',
    },
    box:{
        flexDirection: 'row',
        height: '7%',
        // borderWidth: 3,
        // borderColor: 'rgb(229 229 229)',
    },
    icon: {
        borderWidth: 3,
        borderColor: 'rgb(229 229 229)',
    },
    input: {
        borderWidth: 3,
        borderColor: 'rgb(229 229 229)',
    }
  });