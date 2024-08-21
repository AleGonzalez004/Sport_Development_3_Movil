// Importaciones necesarias
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Constants from "expo-constants";
import * as Constantes from "../utils/constantes";
import HistorialCard from "../components/HistorialCard/HistorialCard";

const Historial = ({ navigation }) => {
  // Estado para almacenar los detalles del Historial
  const [dataDetalleHistorial, setDataDetalleHistorial] = useState([]);
  // Estado para el id del detalle seleccionado para modificar
  const [idDetalle, setIdDetalle] = useState(null);
  // Estado para la cantidad del producto seleccionado en el Historial
  const [cantidadProductoHistorial, setCantidadProductoHistorial] = useState(0);
  // Estado para controlar la visibilidad del modal de edición de cantidad
  const [modalVisible, setModalVisible] = useState(false);
  // IP del servidor
  const ip = Constantes.IP;


  // Efecto para cargar los detalles del Historial al cargar la pantalla o al enfocarse en ella
  useFocusEffect(
    // La función useFocusEffect ejecuta un efecto cada vez que la pantalla se enfoca.
    React.useCallback(() => {
      getDetalleHistorial(); // Llama a la función getDetalleHistorial.
    }, [])
  );

  // Función para obtener los detalles del Historial desde el servidor
  const getDetalleHistorial = async () => {
    try {
      const response = await fetch(
        `${ip}/Sport_Development_3/api/services/public/order.php?action=readDetail`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      console.log(data, "Data desde getDetalleHistorial");
      if (data.status) {
        setDataDetalleHistorial(data.dataset);
      } else {
        console.log("No hay detalles del historial disponibles.");
        //Alert.alert('ADVERTENCIA', data.error);
      }
    } catch (error) {
      console.error(error, "Error desde Catch");
      Alert.alert("Error", "Ocurrió un error al listar las categorias");
    }
  };

  // Función para manejar la modificación de un detalle del Historial
  const handleEditarDetalle = (idDetalle, cantidadDetalle) => {
    setModalVisible(true);
    setIdDetalle(idDetalle);
    setCantidadProductoHistorial(cantidadDetalle);
  };

  // Función para renderizar cada elemento del Historial
  const renderItem = ({ item }) => (
    <HistorialCard
      item={item}
      imagenProducto={item.imagen_producto}
      cargarCategorias={getDetalleHistorial}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      setCantidadProductoHistorial={setCantidadProductoHistorial}
      cantidadProductoHistorial={cantidadProductoHistorial}
      idDetalle={idDetalle}
      setIdDetalle={setIdDetalle}
      accionBotonDetalle={handleEditarDetalle}
      getDetalleHistorial={getDetalleHistorial}
      updateDataDetalleHistorial={setDataDetalleHistorial} // Nueva prop para actualizar la lista
    />
  );

  return (
    <View style={styles.container}>

      {/* Título de la pantalla */}
      <Text style={styles.title}>Historial de compras</Text>

      {/* Lista de detalles del Historial */}
      {dataDetalleHistorial.length > 0 ? (
        <FlatList
          data={dataDetalleHistorial}
          renderItem={renderItem}
          keyExtractor={(item) => item.id_detalle.toString()}
        />
      ) : (
        <Text style={styles.titleDetalle}>
          No hay productos en el Historial :(
        </Text>
      )}
    </View>
  );
};

export default Historial;

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF0",
    marginTop: Constants.statusBarHeight,
    width: "auto",
  },
  scrollViewStyle: {
    flexGrow: 1,
    width: "auto",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    color: "#000000",
  },
  titleDetalle: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginVertical: 16,
    color: "#000000",
  },
  containerButtons: {
    marginVertical: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  ButtonVolver: {
    flexDirection: "row",
    marginRight: 310,
    marginTop: 10,
    backgroundColor: "#16537E",
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
});
