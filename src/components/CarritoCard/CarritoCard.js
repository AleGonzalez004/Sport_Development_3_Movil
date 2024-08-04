// Importaciones necesarias desde React y React Native
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, FlatList, Alert, Image } from 'react-native';
import Constants from 'expo-constants';
import * as Constantes from '../../utils/constantes';
import { FontAwesome } from '@expo/vector-icons';

// Componente CarritoCard que recibe varias props para gestionar los elementos del carrito
const CarritoCard = ({
  item,
  cargarCategorias,
  modalVisible,
  setModalVisible,
  cantidadProductoCarrito,
  setCantidadProductoCarrito,
  accionBotonDetalle,
  idDetalle,
  setIdDetalle,
  getDetalleCarrito,
  updateDataDetalleCarrito
}) => {
  const ip = Constantes.IP;

  // Función para manejar la eliminación de un detalle del carrito
  const handleDeleteDetalleCarrito = async (idDetalle) => {
    try {
      // Mostrar un mensaje de confirmación antes de eliminar
      Alert.alert(
        'Confirmación',
        '¿Estás seguro de que deseas eliminar este elemento del carrito?',
        [
          {
            text: 'Cancelar',
            style: 'cancel'
          },
          {
            text: 'Eliminar',
            onPress: async () => {
              const formData = new FormData();
              formData.append('idDetalle', idDetalle);
              const response = await fetch(`${ip}/Sport_Development_3/api/services/public/pedido.php?action=deleteDetail`, {
                method: 'POST',
                body: formData
              });
              const data = await response.json();
              if (data.status) {
                Alert.alert('Datos eliminados correctamente del carrito');
                // Llamar a la función de actualización para actualizar la lista
                updateDataDetalleCarrito(prevData => prevData.filter(item => item.id_detalle !== idDetalle));
              } else {
                Alert.alert('Error al eliminar del carrito', data.error);
              }
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert("Error al eliminar del carrito")
    }
  };

  return (
    <View style={styles.itemContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: `${ip}/Sport_Development_3/api/images/productos/${item.imagen_producto}` }}
          style={styles.image}
          resizeMode="contain" // Ajustar la imagen al contenedor
        />
      </View>
      <Text style={styles.itemText}>ID: {item.id_detalle}</Text>
      <Text style={styles.itemText}>Nombre: {item.nombre_producto}</Text>
      <Text style={styles.itemText}>Precio: ${item.precio_producto}</Text>
      <Text style={styles.itemText}>Cantidad: {item.cantidad_producto}</Text>
      <Text style={styles.itemText}>SubTotal: ${(parseFloat(item.cantidad_producto) * parseFloat(item.precio_producto)).toFixed(2)}</Text>
      <View style={styles.ratingContainer}>
          <Text style={styles.textTitle}>Calificación:</Text>
          <FontAwesome name="star" size={20} color="#FFD700" />
          <FontAwesome name="star" size={20} color="#FFD700" />
          <FontAwesome name="star" size={20} color="#FFD700" />
          <FontAwesome name="star" size={20} color="#FFD700" />
          <FontAwesome name="star-half-o" size={20} color="#FFD700" />
        </View>
      <TouchableOpacity
        style={styles.modifyButton}
        onPress={() => accionBotonDetalle(item.id_detalle, item.cantidad_producto)}
      >
        <Text style={styles.buttonText}>Modificar Cantidad</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteDetalleCarrito(item.id_detalle)}
      >
        <Text style={styles.buttonText}>Eliminar del carrito</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CarritoCard;

// Estilos para el componente CarritoCard
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAD8C0',
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
    color: '#5C3D2E',
  },
  itemContainer: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 4,
    color: '#000000',
  },
  modifyButton: {
    borderWidth: 1,
    borderColor: '#16537E',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#16537E',
    marginVertical: 4,
  },
  deleteButton: {
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#000000',
    marginVertical: 4,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
  },
  finalButton: {
    backgroundColor: '#16537E',
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
  },
  finalButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  containerButtons: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '65%',
    height: 150,
    borderRadius: 8,
    marginBottom: 12,
  },
  imageContainer: {
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  textTitle: {
    fontSize: 16,
    marginBottom: 8, fontWeight: '500'
  },
});
