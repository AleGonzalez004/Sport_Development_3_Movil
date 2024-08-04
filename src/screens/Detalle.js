import { StyleSheet, Text, View, Image, ActivityIndicator, Alert, TouchableOpacity, SafeAreaView, FlatList, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { FontAwesome } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import ModalCompra from '../components/Modales/ModalCompra';
import ProductoCard from '../components/Productos/ProductoCard';
import * as Constantes from "../utils/constantes";

export default function Detalle({ route, navigation }) {
  const { idProducto } = route.params;
  const ip = Constantes.IP;
  const [modalVisible, setModalVisible] = useState(false);
  const [idProductoModal, setIdProductoModal] = useState("");
  const [nombreProductoModal, setNombreProductoModal] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);

  const volver = async () => {
    navigation.navigate("TabNavigator");
  };

  const handleCompra = (nombre, id) => {
    setModalVisible(true);
    setIdProductoModal(id);
    setNombreProductoModal(nombre);
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
      <ModalCompra
        visible={modalVisible}
        cerrarModal={setModalVisible}
        nombreProductoModal={nombreProductoModal}
        idProductoModal={idProductoModal}
        cantidad={cantidad}
        setCantidad={setCantidad}
      />
        <ScrollView contentContainerStyle={styles.scrollViewStyle}>
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
        
        <View style={styles.ratingContainer}>
          <Text style={styles.textTitle}>Calificación:</Text>
          <FontAwesome name="star" size={20} color="#FFD700" />
          <FontAwesome name="star" size={20} color="#FFD700" />
          <FontAwesome name="star" size={20} color="#FFD700" />
          <FontAwesome name="star" size={20} color="#FFD700" />
          <FontAwesome name="star-half-o" size={20} color="#FFD700" />
        </View>
        
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => handleCompra(producto.nombre_producto, producto.id_producto)}>
          <FontAwesome name="plus-circle" size={24} color="white" />
          <Text style={styles.cartButtonText}>Agregar al Carrito</Text>
        </TouchableOpacity>
        
        <View style={styles.commentsSection}>
          <Text style={styles.commentsTitle}>Comentarios</Text>
          <View style={styles.comment}>
            <Text style={styles.commentAuthor}>Autor del Comentario</Text>
            <View style={styles.ratingContainer}>
              {[...Array(5)].map((_, index) => (
                <FontAwesome key={index} name="star" size={20} color={index < 4 ? '#FFD700' : '#ccc'} />
              ))}
            </View>
            <Text style={styles.commentText}>
              Este es un comentario de ejemplo. El texto del comentario debe ser lo suficientemente largo para mostrar cómo se ve el diseño.
            </Text>
          </View>
          <View style={styles.comment}>
            <Text style={styles.commentAuthor}>Autor del Comentario</Text>
            <View style={styles.ratingContainer}>
              {[...Array(5)].map((_, index) => (
                <FontAwesome key={index} name="star" size={20} color={index < 4 ? '#FFD700' : '#ccc'} />
              ))}
            </View>
            <Text style={styles.commentText}>
              Este es un comentario de ejemplo. El texto del comentario debe ser lo suficientemente largo para mostrar cómo se ve el diseño.
            </Text>
          </View>
          <View style={styles.comment}>
            <Text style={styles.commentAuthor}>Autor del Comentario</Text>
            <View style={styles.ratingContainer}>
              {[...Array(5)].map((_, index) => (
                <FontAwesome key={index} name="star" size={20} color={index < 4 ? '#FFD700' : '#ccc'} />
              ))}
            </View>
            <Text style={styles.commentText}>
              Este es un comentario de ejemplo. El texto del comentario debe ser lo suficientemente largo para mostrar cómo se ve el diseño.
            </Text>
          </View>
        </View>
        <SafeAreaView style={styles.containerFlat}>
          <FlatList
            keyExtractor={(item) => item.id_producto}
            renderItem={({ item }) => (
              <ProductoCard
                ip={ip}
                imagenProducto={item.imagen_producto}
                idProducto={item.id_producto}
                nombreProducto={item.nombre_producto}
                descripcionProducto={item.descripcion_producto}
                precioProducto={item.precio_producto}
                existenciasProducto={item.existencias_producto}
                accionBotonProducto={() => handleCompra(item.nombre_producto, item.id_producto)}
                Detalle={() => navigation.navigate("Detalle", { idProducto: item.id_producto })}
              />
            )}
          />
        </SafeAreaView>
      </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
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
    marginVertical: 15,
    marginTop: 20,
    backgroundColor: "#16537E",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  cartButton: {
    marginTop: 20,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    backgroundColor: '#16537E',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 25, 
    marginVertical: 10,
    alignItems: 'center', 
  },
  cartButtonText: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "500",
    marginLeft: 10,
  },
  commentsSection: {
    marginTop: 20,
  },
  commentsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  comment: {
    marginBottom: 15,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  commentAuthor: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  commentText: {
    fontSize: 14,
    color: '#333',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  containerFlat: {
    flex: 1,
  },
  scrollViewStyle: {
    flexGrow: 1,
  },
});
