import { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Alert, Image } from "react-native";
import Buttons from "../components/Buttons/Button";
import * as Constantes from "../utils/constantes";
import { useFocusEffect } from "@react-navigation/native";

export default function Home({ navigation }) {
  const [nombre, setNombre] = useState(null);
  const ip = Constantes.IP;

  // Función para cerrar sesión
  const handleLogout = async () => {
    try {
      // Enviar una solicitud HTTP al servidor para cerrar la sesión
      const response = await fetch(
        `${ip}/Sport_Development_3/api/services/public/cliente.php?action=logOut`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      if (data.status) {
        // Si la solicitud es exitosa, navegar a la pantalla de Sesión
        navigation.navigate("Sesion");
      } else {
        // Si hay un error, mostrar una alerta
        Alert.alert("Error", data.error);
      }
    } catch (error) {
      // Si hay un error de red, mostrar una alerta
      Alert.alert("Error", "Ocurrió un error al cerrar la sesión");
    }
  };

  // Función para navegar a la pantalla de Productos
  const irActualizar = () => {
    navigation.navigate("Productos");
  };

  // Función para navegar a la pantalla de Editar Usuario
  const EditUser = () => {
    navigation.navigate("UpdateUser");
  };

  const Historial = () => {
    navigation.navigate("Historial");
  };

  const getUser = async () => {
    try {
      // Enviar una solicitud HTTP al servidor para obtener los datos del usuario
      const response = await fetch(
        `${ip}/Sport_Development_3/api/services/public/cliente.php?action=getUser`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      console.log("Data received:", data); // Agrega esta línea para ver la respuesta completa

      if (data.status === 1) {
        // Verifica el estado
        // Usar el campo 'name' que ya contiene el nombre completo
        setNombre(data.name || "Nombre no disponible");
      } else {
        // Si hay un error, mostrar una alerta
        Alert.alert("Error", data.error || "Error desconocido");
      }
    } catch (error) {
      // Si hay un error de red, mostrar una alerta
      Alert.alert("Error", "Ocurrió un error al obtener los datos del usuario");
    }
  };

  // Uso del React Hook useEffect para cargar los datos del usuario al montar el componente
  useFocusEffect(
    useCallback(() => {
      getUser();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/user.png")}
        style={styles.image}
      />
      <Text style={styles.title}>Bienvenid@</Text>
      <Text style={styles.subtitle}>
        {nombre ? nombre : "No hay Nombre para mostrar"}
      </Text>
      <Buttons textoBoton="Editar Usuario" accionBoton={EditUser} />
      <Buttons textoBoton="Cerrar Sesión" accionBoton={handleLogout} />
    </View>
  );
}
//Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 100,
  },
  button: {
    borderWidth: 2,
    borderColor: "black",
    width: 100,
    borderRadius: 20,
    backgroundColor: "#FFF",
  },

  buttonText: {
    textAlign: "center",
    color: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 5,
    color: "#16537E",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    marginVertical: 5,
    color: "#16537E",
  },
});
