import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogBox } from 'react-native';
import { ThemeProvider } from '../context/ThemeContext'; // Importez le ThemeProvider

// Importez tous vos écrans ici
import HomeScreen from '../screens/HomeScreen';
import AllDay from '../screens/AllDay';
import Humidity from '../screens/Humidity';
import Login from '../screens/Login';
import Parameter from '../screens/Parametre';
import SunRise from '../screens/SunRise';
import Wind from '../screens/Wind';
import Maps from '../screens/Maps';

const Stack = createNativeStackNavigator();

LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {/* Ajoutez une entrée pour chaque écran */}
          <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
          <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
          <Stack.Screen name="AllDay" component={AllDay} />
          <Stack.Screen name="Humidity" component={Humidity} />
          <Stack.Screen name="Parameter" component={Parameter} />
          <Stack.Screen name="SunRise" component={SunRise} />
          <Stack.Screen name="Wind" component={Wind} />
          <Stack.Screen name="Maps" component={Maps} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
