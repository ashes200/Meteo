import axios from 'axios';
import { API_KEY } from '../constants';

// Endpoint pour obtenir les prévisions météorologiques
const FORECAST_ENDPOINT = params => `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${params.cityName}&days=${params.days}&aqi=no&alerts=no`;

// Endpoint pour obtenir les informations de localisation
const LOCATION_ENDPOINT = params => `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${params.cityName}`;

// Fonction générique pour effectuer un appel API
const API_CALL = async (endpoint) => {
    const OPTIONS = {
        method: 'GET',
        url: endpoint
    };
    try {
        const RESPONSE = await axios.request(OPTIONS);
        return RESPONSE.data;
    } catch(err) {
        console.log(err);
        return null;
    }
};

// Fonction pour récupérer les prévisions météorologiques
export const FETCH_WEATHER_FORCAST = params => {
    return API_CALL(FORECAST_ENDPOINT(params));// Appeler la fonction générique avec l'endpoint des prévisions météorologiques
};
// Fonction pour récupérer les informations de localisation
export const FETCH_LOCATION = params => {
    return API_CALL(LOCATION_ENDPOINT(params));// Appeler la fonction générique avec l'endpoint des informations de localisation
};
