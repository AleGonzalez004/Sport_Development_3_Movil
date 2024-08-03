// Importaciones necesarias desde React y React Native
import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import Buttons from '../Buttons/Button';
import * as Constantes from '../../utils/constantes';

// Componente ModalCompra que muestra un modal para la compra de productos
const ModalCompra = ({ visible, cerrarModal, nombreProductoModal, idProductoModal, cantidad, setCantidad }) => {

  const ip = Constantes.IP;

  // Función para manejar la creación del detalle de compra
  const handleCreateDetail = async () => {
    try {
      if (cantidad <= 0) {  // Cambié la validación para permitir sólo cantidades positivas
        Alert.alert("Debes llenar todos los campos");
        return;
      } else {
        const formData = new FormData();
        formData.append('idProducto', idProductoModal);
        formData.append('cantidadProducto', cantidad);

        const response = await fetch(`${ip}/Sport_Development_3/api/services/public/pedido.php?action=createDetail`, {
          method: 'POST',
          body: formData
        });

        const data = await response.json();
        console.log("data despues del response", data);
        if (data.status) {
          Alert.alert('Datos Guardados correctamente');
          cerrarModal(false);
          setCantidad('');  // Limpiar el campo de cantidad
        } else {
          Alert.alert('Error', data.error);
        }
      }
    } catch (error) {
      Alert.alert('Ocurrió un error al crear detalle');
    }
  };

  // Función para cancelar la acción de agregar al carrito
  const handleCancelCarrito = () => {
    cerrarModal(false);
    setCantidad('');  // Limpiar el campo de cantidad
  };

  return (
    // Modal para mostrar la ventana emergente de compra
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => {
        cerrarModal(false);
        setCantidad('');  // Limpiar el campo de cantidad
      }}
    >
      {/* Vista centralizada para el modal */}
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{nombreProductoModal}</Text>
          <Text style={styles.modalText}>Cantidad:</Text>
          <TextInput
            style={styles.input}
            value={cantidad}
            onChangeText={text => setCantidad(text)}
            keyboardType="numeric"
            placeholder="Ingrese la cantidad"
          />
          {/* Botón para agregar al carrito */}
          <Buttons
            textoBoton='Agregar al carrito'
            accionBoton={() => handleCreateDetail()}
          />
          {/* Botón para cancelar */}
          <Buttons
            textoBoton='Cancelar'
            accionBoton={() => handleCancelCarrito()}
          />
        </View>
      </View>
    </Modal>
  );
};

// Estilos para el componente ModalCompra
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
});

export default ModalCompra;
