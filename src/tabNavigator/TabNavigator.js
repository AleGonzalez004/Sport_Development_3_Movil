import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Platform } from 'react-native';

// Importa tus componentes de pantalla aquí
import Productos from '../screens/Productos';
import Home from '../screens/Home';
import Carrito from '../screens/Carrito';
import Historial from '../screens/Historial';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (

<Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false, // Oculta el header
            tabBarActiveTintColor: '#FFF', // Color de los íconos activos
            tabBarInactiveTintColor: '#FFF', // Color de los íconos inactivos
            tabBarStyle: { backgroundColor: '#16537E', 
              height: Platform.OS === 'ios' ? 80 : 60, // Estilo de la barra de pestañas, altura diferente para iOS y Android
           borderTopWidth: 0 }, // Estilo de la barra de pestañas
            tabBarIcon: ({ focused, color, size }) => { // Función que define el ícono de la pestaña
              let iconName;
              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Productos') {
                iconName = focused ? 'football' : 'football-outline';
              } else if (route.name === 'Carrito') {
                iconName = focused ? 'cart' : 'cart-outline';
              } else if (route.name === 'Historial') {
                iconName = focused ? 'time' : 'time-outline';
              }   
              return <Ionicons name={iconName} color={color} size={size} />;
            },
          })}
        >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ title: 'Inicio' }}
      />
      <Tab.Screen
        name="Productos"
        component={Productos}
        options={{ title: 'Productos' }}
      />
      <Tab.Screen
        name="Carrito"
        component={Carrito}
        options={{ title: 'Carrito' }}
      />
      <Tab.Screen
        name="Historial"
        component={Historial}
        options={{ title: 'Historial' }}
      />
    </Tab.Navigator>
    );
};

export default TabNavigator;

