// SplashScreen.js

import React, { useEffect } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Simular una carga o proceso
    setTimeout(() => {
      // Navegar a la siguiente pantalla después de cierto tiempo
      navigation.replace('Sesion'); // Reemplaza la pantalla actual en la navegación
    }, 3000); // Tiempo de carga simulado en milisegundos (3 segundos en este caso)

    // El return en useEffect se usa para limpiar efectos secundarios, aunque en este caso no es necesario
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../img/logo.png')}
        style={styles.image}
      />
      <ActivityIndicator size="large" color="#FFF" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#16537E',
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
    color: '#FFF',
  },
  image: {
    width: 75,
    height: 75,
    marginBottom: 10
  },
});

export default SplashScreen;
