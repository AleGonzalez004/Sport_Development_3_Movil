import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importa las pantallas necesarias
import SplashScreen from './src/screens/SplashScreen';
import Sesion from './src/screens/Sesion';
import SignUp from './src/screens/SignUp';
import UpdateUser from './src/screens/UpdateUser';
import TabNavigator from './src/tabNavigator/TabNavigator';
import Recuperacion from './src/screens/Recuperacion';
import Codigo from './src/screens/Codigo';
import Historial from './src/screens/Historial';
import Detalle from './src/screens/Detalle';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='SplashScreen'>
        <Stack.Screen
          name='SplashScreen'
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Sesion'
          component={Sesion}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='SignUp'
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='UpdateUser'
          component={UpdateUser}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='TabNavigator'
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Recuperacion'
          component={Recuperacion}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name='Codigo'
          component={Codigo}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name='Historial'
          component={Historial}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Detalle'
          component={Detalle}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
