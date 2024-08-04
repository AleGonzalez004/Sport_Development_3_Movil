import React from 'react';
import { View, Text, Modal, StyleSheet, TextInput, Alert } from 'react-native';
import Buttons from '../Buttons/Button';
import * as Constantes from '../../utils/constantes';

// Componente ModalEditarCantidad para editar la cantidad de un producto en el carrito
const ModalEditarCantidad = ({ setModalVisible, modalVisible, idDetalle, setCantidadProductoCarrito, cantidadProductoCarrito, getDetalleCarrito }) => {

  const ip = Constantes.IP;

  // Función para manejar la actualización del detalle del carrito
  const handleUpdateDetalleCarrito = async () => {
    const cantidadProducto = parseInt(cantidadProductoCarrito, 10);

    try {
      if (isNaN(cantidadProducto) || cantidadProducto <= 0) {
        Alert.alert("La cantidad debe ser un número mayor a 0");
        return;
      }

      const formData = new FormData();
      formData.append('idDetalle', idDetalle);
      formData.append('cantidadProducto', cantidadProducto);

      const response = await fetch(`${ip}/Sport_Development_3/api/services/public/pedido.php?action=updateDetail`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      if (data.status) {
        Alert.alert('Se actualizó el detalle del producto');
        getDetalleCarrito();
      } else {
        Alert.alert('Error al editar detalle carrito', data.error);
      }
      setModalVisible(false);
    } catch (error) {
      Alert.alert("Error en editar carrito", error.toString());
      setModalVisible(false);
    }
  };

  // Función para cancelar la edición de la cantidad del carrito
  const handleCancelEditarCarrito = () => {
    setModalVisible(false);
  };

  // Convierte el texto ingresado en el TextInput a una cadena numérica
  const handleTextChange = (text) => {
    setCantidadProductoCarrito(text.replace(/[^0-9]/g, '')); // Elimina caracteres no numéricos y actualiza el estado
  };

  return (
    // Modal para mostrar la ventana emergente de edición de cantidad
    <Modal
      visible={modalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      {/* Vista centralizada para el modal */}
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Cantidad actual: {cantidadProductoCarrito}</Text>
          <Text style={styles.modalText}>Nueva cantidad:</Text>
          <TextInput
            style={styles.input}
            value={cantidadProductoCarrito.toString()} // Asegúrate de que el valor sea una cadena
            onChangeText={handleTextChange}
            keyboardType="numeric"
            placeholder="Ingrese la cantidad"
          />
          {/* Botón para editar la cantidad */}
          <Buttons
            textoBoton='Editar cantidad'
            accionBoton={handleUpdateDetalleCarrito}
          />
          {/* Botón para cancelar */}
          <Buttons
            textoBoton='Cancelar'
            accionBoton={handleCancelEditarCarrito}
          />
        </View>
      </View>
    </Modal>
  );
};

// Estilos para el componente ModalEditarCantidad
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
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
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: 200,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#16537E',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ModalEditarCantidad;
