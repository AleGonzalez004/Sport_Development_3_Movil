// Importaciones necesarias desde React y React Native
import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import Buttons from '../Buttons/Button';
import * as Constantes from '../../utils/constantes';

// Componente ModalEditarCantidad para editar la cantidad de un producto en el carrito
const ModalEditarCantidad = ({ setModalVisible, modalVisible, idDetalle, setCantidadProductoCarrito, cantidadProductoCarrito, getDetalleCarrito }) => {

  const ip = Constantes.IP;

  // Función para manejar la actualización del detalle del carrito
  const handleUpdateDetalleCarrito = async () => {
    try {
      if (cantidadProductoCarrito <= 0) {
        Alert.alert("La cantidad no puede ser igual o menor a 0");
        return; // Corrige la lógica aquí
      }

      const formData = new FormData();
      formData.append('idDetalle', idDetalle);
      formData.append('cantidadProducto', cantidadProductoCarrito);

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
      Alert.alert("Error en editar carrito", error);
      setModalVisible(false);
    }
  };

  // Función para cancelar la edición de la cantidad del carrito
  const handleCancelEditarCarrito = () => {
    setModalVisible(false);
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
            value={cantidadProductoCarrito}
            onChangeText={setCantidadProductoCarrito}
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
