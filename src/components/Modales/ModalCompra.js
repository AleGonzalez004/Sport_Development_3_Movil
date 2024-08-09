import React from "react";
import { View, Text, Modal, StyleSheet, TextInput, Alert } from "react-native";
import Buttons from "../Buttons/Button";
import * as Constantes from "../../utils/constantes";
import { useNavigation } from "@react-navigation/native"; // Importa el hook useNavigation

// Componente ModalCompra que muestra un modal para la compra de productos
const ModalCompra = ({
  visible,
  cerrarModal,
  nombreProductoModal,
  idProductoModal,
  cantidad,
  setCantidad,
}) => {
  const ip = Constantes.IP;
  const navigation = useNavigation(); // Usa el hook useNavigation

  // Convierte la cantidad a un número y asegura que sea válida
  const handleCantidadChange = (text) => {
    const number = parseInt(text, 10);
    if (!isNaN(number) && number > 0) {
      setCantidad(number.toString());
    } else {
      Alert.alert("Error", "Ingrese una cantidad válida.");
    }
  };

  // Función para manejar la creación del detalle de compra
  const handleCreateDetail = async () => {
    const cantidadProducto = parseInt(cantidad, 10);

    try {
      if (cantidadProducto <= 0) {
        Alert.alert("Error", "La cantidad debe ser mayor a 0.");
        return;
      }

      const formData = new FormData();
      formData.append("idProducto", idProductoModal);
      formData.append("cantidadProducto", cantidadProducto);

      const response = await fetch(
        `${ip}/Sport_Development_3/api/services/public/pedido.php?action=createDetail`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      console.log("Datos después del response:", data);

      if (data.status) {
        Alert.alert("Éxito", "Producto añadido al carrito correctamente.");
        cerrarModal(false);
        setCantidad("");
        navigation.navigate("Home"); // Navegar a la pantalla de inicio
      } else {
        Alert.alert("Error", data.error);
      }
    } catch (error) {
      Alert.alert("Error", "Ocurrió un error al crear el detalle del pedido.");
      console.error(error);
    }
  };

  // Función para cancelar la acción de agregar al carrito
  const handleCancelCarrito = () => {
    cerrarModal(false);
    setCantidad(""); // Limpiar el campo de cantidad
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => {
        cerrarModal(false);
        setCantidad(""); // Limpiar el campo de cantidad
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{nombreProductoModal}</Text>
          <Text style={styles.modalText}>Cantidad:</Text>
          <TextInput
            style={styles.input}
            value={cantidad}
            onChangeText={handleCantidadChange}
            keyboardType="numeric"
            placeholder="Ingrese la cantidad"
          />
          <View style={styles.buttonContainer}>
            {/* Botón para agregar al carrito */}
            <Buttons
              textoBoton="Agregar al carrito"
              accionBoton={handleCreateDetail}
            />
            {/* Botón para cancelar */}
            <Buttons textoBoton="Cancelar" accionBoton={handleCancelCarrito} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

// Estilos para el componente ModalCompra
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
    width: 200,
    textAlign: "center",
  },
});

export default ModalCompra;
