import { StyleSheet, Text, View, Image, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import RNPickerSelect from "react-native-picker-select";
import * as Constantes from "../utils/constantes";
import { useFocusEffect } from '@react-navigation/native';
import { FontAwesome } from "@expo/vector-icons"; 
import AntDesign from "@expo/vector-icons/AntDesign";

export default function Detalle({ route, accionBotonProducto}) {
  const { idProducto } = route.params; // Obtener el ID del producto desde las props de navegación
  const ip = Constantes.IP;
  
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);

  const volver = async () => {
    navigation.navigate("Producto");
  };
  
  useEffect(() => {
    const obtenerDetallesProducto = async () => {
      try {
        const formData = new FormData();
        formData.append("idProducto", idProducto);
        
        const response = await fetch(
          `${ip}/Sport_Development_3/api/services/public/producto.php?action=readOne`,
          {
            method: "POST",
            body: formData,
          }
        );
        
        const data = await response.json();
        
        if (data.status) {
          setProducto(data.dataset);
        } else {
          Alert.alert("Error", data.error);
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los detalles del producto:", error);
        Alert.alert("Error", "Ocurrió un error al obtener los detalles del producto.");
        setLoading(false);
      }
    };
    
    obtenerDetallesProducto();
  }, [idProducto]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!producto) {
    return <Text>No se encontraron detalles para este producto.</Text>;
  }

  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.ButtonVolver} onPress={volver}>
        <AntDesign name="arrowleft" size={20} color="white" />
      </TouchableOpacity>
      <View style={styles.card}>
        <Image
          source={{ uri: `${ip}/Sport_Development_3/api/images/productos/${producto.imagen_producto}` }}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.textTitle}>{producto.nombre_producto}</Text>
        <Text style={styles.text}>{producto.descripcion_producto}</Text>
        <Text style={styles.textTitle}>Precio: <Text style={styles.textDentro}>${producto.precio_producto}</Text></Text>
        <Text style={styles.textTitle}>Existencias: <Text style={styles.textDentro}>{producto.existencias_producto} {producto.existencias_producto === 1 ? 'Unidad' : 'Unidades'}</Text></Text>
        <TouchableOpacity
        style={styles.cartButton}
        onPress={accionBotonProducto}>
        <FontAwesome name="plus-circle" size={24} color="white" />
        <Text style={styles.cartButtonText}>Seleccionar Producto</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    marginVertical: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 12,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
  textTitle: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  textDentro: {
    fontWeight: '400',
  },
  ButtonVolver: {
    flexDirection: "row",
    marginRight: 310,
    marginTop: 10,
    backgroundColor: "#16537E",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  cartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#16537E',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  cartButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 10,
  },
});
