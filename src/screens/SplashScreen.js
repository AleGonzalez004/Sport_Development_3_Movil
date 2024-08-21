// SplashScreen.js

import React, { useEffect } from "react";
import { View, Text, Image, ActivityIndicator, StyleSheet } from "react-native";
import * as Constantes from "../utils/constantes";

const ip = Constantes.IP;

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      validarSesion(); // Llama a la función validarSesion
    // Simular una carga o proceso
      // Navegar a la siguiente pantalla después de cierto tiempo
    }, 5000); // Tiempo de carga simulado en milisegundos (3 segundos en este caso)

    // El return en useEffect se usa para limpiar efectos secundarios, aunque en este caso no es necesario
  }, [navigation]);

   // Función para validar la sesión del usuario
 const validarSesion = async () => {
  try {
    const response = await fetch(
      `${ip}/Sport_Development_3/api/services/public/cliente.php?action=getUser`,
      {
        method: "GET",
      }
    );

    const data = await response.json();

    if (data.status === 1) {
      // Si hay una sesión activa, navegar a la pantalla TabNavigator
      navigation.navigate("TabNavigator");
      console.log("Se ingresa con la sesión activa");
    } else {
      navigation.navigate("Sesion");
      console.log("No hay sesión activa");
      return;
    }
  } catch (error) {
    console.error(error);
    Alert.alert("Error", "Ocurrió un error al validar la sesión");
  }
};

  return (
    <View style={styles.container}>
      <Image source={require("../img/logo.png")} style={styles.image} />
      <ActivityIndicator size="large" color="#FFF" />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#16537E",
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
    color: "#FFF",
  },
  image: {
    width: 75,
    height: 75,
    marginBottom: 10,
  },
});

export default SplashScreen;
