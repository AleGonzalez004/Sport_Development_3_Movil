import { StyleSheet, Text, View, Image, ActivityIndicator, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import * as Constantes from "../utils/constantes";

export default function Detalle({ route }) {
  const { idProducto } = route.params; // Obtener el ID del producto desde las props de navegación
  const ip = Constantes.IP;
  
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  
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
      <Image
        source={{ uri: `${ip}/Sport_Development_3/api/images/productos/${producto.imagen_producto}` }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>{producto.nombre_producto}</Text>
      <Text>{producto.descripcion_producto}</Text>
      <Text>Precio: ${producto.precio_producto}</Text>
      <Text>Existencias: {producto.existencias_producto}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
