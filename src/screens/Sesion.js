import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import Input from "../components/Inputs/Input";
import InputEmail from "../components/Inputs/InputEmail";
import Buttons from "../components/Buttons/Button";
import * as Constantes from "../utils/constantes";
import { useFocusEffect } from "@react-navigation/native";

export default function Sesion({ navigation }) {
  const ip = Constantes.IP;

  // Estado para controlar la visibilidad de la contraseña
  const [isContra, setIsContra] = useState(true);
  // Estados para almacenar el usuario y la contraseña
  const [usuario, setUsuario] = useState("");
  const [contrasenia, setContrasenia] = useState("");

  // Efecto para validar la sesión al cargar la pantalla o al enfocarse en ella
  useFocusEffect(
    React.useCallback(() => {
      // Limpia los campos cuando se desenfoca la pantalla
      return () => {
        setUsuario("");
        setContrasenia("");
      };
    }, [])
  );

  // Función para manejar el inicio de sesión
  const handlerLogin = async () => {
    // Validar que se hayan ingresado el usuario y la contraseña
    if (!usuario || !contrasenia) {
      Alert.alert("Error", "Por favor ingrese su correo y contraseña");
      return;
    }

    try {
      // Crear un FormData con los datos de inicio de sesión
      const formData = new FormData();
      formData.append("correo", usuario);
      formData.append("clave", contrasenia);

      // Enviar la solicitud de inicio de sesión al servidor
      const response = await fetch(
        `${ip}/Sport_Development_3/api/services/public/cliente.php?action=logIn`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.status) {
        // Si el inicio de sesión es exitoso, limpiar los campos y navegar a la pantalla TabNavigator
        setContrasenia("");
        setUsuario("");
        navigation.navigate("TabNavigator");
      } else {
        console.log(data);
        Alert.alert("Error sesión", data.error);
      }
    } catch (error) {
      console.error(error, "Error desde Catch");
      Alert.alert("Correo no encontrado");
    }
  };

  // Funciones para navegar a las pantallas de Registro y Recuperación de contraseña
  const irRegistrar = () => {
    navigation.navigate("SignUp");
  };
  const irRecuperacion = () => {
    navigation.navigate("Recuperacion");
  };

  return (
    <View style={styles.container}>
      <Image source={require("../img/logo_azul.png")} style={styles.image} />
      <Text style={styles.texto}>Iniciar Sesión</Text>
      <View style={styles.containerlog}>
        <InputEmail
          placeHolder="Correo"
          valor={usuario}
          setTextChange={setUsuario}
        />
        <Input
          placeHolder="Contraseña"
          valor={contrasenia}
          setTextChange={setContrasenia}
          contra={isContra} // Pasa el estado isContra para ocultar la contraseña
        />
      </View>
      <Buttons textoBoton="Iniciar Sesión" accionBoton={handlerLogin} />
      <TouchableOpacity onPress={irRegistrar}>
        <Text style={styles.textRegistrar}>
          ¿No tienes cuenta? Regístrate aquí
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={irRecuperacion}>
        <Text style={styles.textRegistrar}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
  },
  containerlog: {
    alignItems: "center",
    justifyContent: "center",
    
    borderRadius: 20,
    padding: 10,
  },
  texto: {
    color: "#16537E",
    fontWeight: "500",
    fontSize: 20,
  },
  textRegistrar: {
    color: "#16537E",
    fontWeight: "500",
    fontSize: 18,
    marginTop: 10,
  },
  image: {
    width: 75,
    height: 75,
    marginBottom: 15,
  },
});
