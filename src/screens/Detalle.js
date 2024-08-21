import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, ActivityIndicator, Alert, TouchableOpacity, SafeAreaView, FlatList, ScrollView, TextInput, } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import ModalCompra from "../components/Modales/ModalCompra";
import ProductoCard from "../components/Productos/ProductoCard";
import * as Constantes from "../utils/constantes";
import { useFocusEffect } from "@react-navigation/native";
import Constants from "expo-constants";

export default function Detalle({ route, navigation }) {
  const { idProducto } = route.params;
  const ip = Constantes.IP;
  const [modalVisible, setModalVisible] = useState(false);
  const [idProductoModal, setIdProductoModal] = useState("");
  const [nombreProductoModal, setNombreProductoModal] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comentarios, setComentarios] = useState([]);
  const [calificacionPromedio, setCalificacionPromedio] = useState(null);
  const [nuevoComentario, setNuevoComentario] = useState("");
  const [nuevaCalificacion, setNuevaCalificacion] = useState(0);

  const volver = () => {
    navigation.navigate("TabNavigator");
  };

  const handleCompra = (nombre, id) => {
    setModalVisible(true);
    setIdProductoModal(id);
    setNombreProductoModal(nombre);
  };

  //Metodo para obtener los detalles de un solo producto
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
      Alert.alert(
        "Error",
        "Ocurrió un error al obtener los detalles del producto."
      );
      setLoading(false);
    }
  };

  //Metodo para obtener los comentarios y la calificacion de el producto
  const obtenerComentariosYCalificacion = async () => {
    try {
      const formData = new FormData();
      formData.append("idProducto", idProducto);

      // Obtener comentarios
      const responseComentarios = await fetch(
        `${ip}/Sport_Development_3/api/services/public/producto.php?action=readComments`,
        {
          method: "POST",
          body: formData,
        }
      );

      const dataComentarios = await responseComentarios.json();

      if (dataComentarios.status) {
        setComentarios(dataComentarios.dataset);
      } else {
        Alert.alert("Error", dataComentarios.error);
      }

      // Obtener calificación promedio
      const responseCalificacion = await fetch(
        `${ip}/Sport_Development_3/api/services/public/producto.php?action=averageRating`,
        {
          method: "POST",
          body: formData,
        }
      );

      const dataCalificacion = await responseCalificacion.json();

      if (dataCalificacion.status) {
        setCalificacionPromedio(dataCalificacion.dataset.promedio);
      } else {
        Alert.alert("Error", dataCalificacion.error);
      }
    } catch (error) {
      console.error("Error al obtener los comentarios o calificación:", error);
      Alert.alert(
        "Error",
        "Ocurrió un error al obtener los comentarios o calificación."
      );
    }
  };

  //Metodo para agregar comentario
  const agregarComentario = async () => {
    if (!nuevoComentario || nuevaCalificacion === 0) {
      Alert.alert("Error", "Por favor, ingrese un comentario y calificación.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("idProducto", idProducto);
      formData.append("calificacion", nuevaCalificacion);
      formData.append("comentario_producto", nuevoComentario);

      const response = await fetch(
        `${ip}/Sport_Development_3/api/services/public/producto.php?action=addComment`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (DATA.status) {
        sweetAlert(1, DATA.message, false);
      } else if (DATA.session) {
        sweetAlert(2, DATA.error, false);
      } else {
        sweetAlert(3, DATA.error, true);
      }
    } catch (error) {
      setNuevoComentario("");
      setNuevaCalificacion(0);
      obtenerComentariosYCalificacion();
    }
  };

  const renderStars = (rating, onPress) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => onPress(i + 1)}>
          <FontAwesome
            name="star"
            size={20}
            color={i < rating ? "#000" : "#ddd"}
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  useFocusEffect(
    React.useCallback(() => {
      obtenerDetallesProducto();
      obtenerComentariosYCalificacion();
    }, [idProducto])
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!producto) {
    return <Text>No se encontraron detalles para este producto.</Text>;
  }

  return (
    <View style={styles.container}>
      

      <ModalCompra
        visible={modalVisible}
        cerrarModal={setModalVisible}
        nombreProductoModal={nombreProductoModal}
        idProductoModal={idProductoModal}
        cantidad={cantidad}
        setCantidad={setCantidad}
      />

      <ScrollView contentContainerStyle={styles.scrollViewStyle}>
      <TouchableOpacity style={styles.ButtonVolver} onPress={volver}>
        <AntDesign name="arrowleft" size={20} color="white" />
      </TouchableOpacity>
        <View style={styles.card}>
          <Image
            source={{
              uri: `${ip}/Sport_Development_3/api/images/productos/${producto.imagen_producto}`,
            }}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.textTitle}>{producto.nombre_producto}</Text>
          <Text style={styles.text}>{producto.descripcion_producto}</Text>
          <Text style={styles.textTitle}>
            Precio:{" "}
            <Text style={styles.textDentro}>${producto.precio_producto}</Text>
          </Text>
          <Text style={styles.textTitle}>
            Existencias:{" "}
            <Text style={styles.textDentro}>
              {producto.existencias_producto}{" "}
              {producto.existencias_producto === 1 ? "Unidad" : "Unidades"}
            </Text>
          </Text>

          {/* Sección de calificación promedio */}
          <View style={styles.ratingContainer}>
            <Text style={styles.textTitle}>Calificación: </Text>
            <View style={styles.ratingStars}>
              {renderStars(calificacionPromedio || 0)}
            </View>
            <Text style={styles.textDentro}>
              {" "}
              {calificacionPromedio !== null
                ? calificacionPromedio.toFixed(1)
                : "No disponible"}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.cartButton}
            onPress={() =>
              handleCompra(producto.nombre_producto, producto.id_producto)
            }
          >
            <Text style={styles.cartButtonText}>Agregar al Carrito</Text>
          </TouchableOpacity>

          {/* Sección de comentarios */}
          <View style={styles.commentsSection}>
            <Text style={styles.commentsTitle}>Comentarios</Text>

            {/* Botón para agregar comentario */}
            <View style={styles.addCommentSection}>
              <View style={styles.ratingStars}>
                {renderStars(nuevaCalificacion, setNuevaCalificacion)}
              </View>
              <TextInput
                style={styles.textInput}
                placeholder="Escribe tu comentario"
                value={nuevoComentario}
                onChangeText={setNuevoComentario}
              />
              <TouchableOpacity
                style={styles.cartButton}
                onPress={agregarComentario}
              >
                <Text style={styles.cartButtonText}>Agregar Comentario</Text>
              </TouchableOpacity>
            </View>

            {comentarios.length === 0 ? (
              <Text>No hay comentarios para este producto.</Text>
            ) : (
              comentarios.map((comentario, index) => (
                <View key={index} style={styles.comment}>
                  <Text style={styles.commentAuthor}>
                    {comentario.nombre_cliente} {comentario.apellido_cliente}
                  </Text>
                  <Text style={styles.commentDate}>
                    {comentario.fecha_valoracion}
                  </Text>
                  <View style={styles.ratingContainer}>
                    {renderStars(comentario.calificacion_producto)}
                  </View>
                  <Text style={styles.commentText}>
                    {comentario.comentario_producto}
                  </Text>
                </View>
              ))
            )}
          </View>

          {/* Lista de productos relacionados */}
          <View style={styles.containerFlat}>
            {producto.relacionados &&
              producto.relacionados.map((item) => (
                <ProductoCard
                  key={item.id_producto}
                  ip={ip}
                  idProducto={item.id_producto}
                  nombreProducto={item.nombre_producto}
                  descripcionProducto={item.descripcion_producto}
                  precioProducto={item.precio_producto}
                  existenciasProducto={item.existencias_producto}
                  accionBotonProducto={() =>
                    handleCompra(item.nombre_producto, item.id_producto)
                  }
                  Detalle={() =>
                    navigation.navigate("Detalle", {
                      idProducto: item.id_producto,
                    })
                  }
                />
              ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff0",
    paddingTop: Constants.statusBarHeight,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 16,
    marginVertical: 12,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 200,
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
  textTitle: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "500",
  },
  textDentro: {
    fontWeight: "400",
  },
  ButtonVolver: {
    flexDirection: "row",
    marginRight: "81%",
    marginTop: 10,
    marginLeft: "5%",
    backgroundColor: "#16537E",
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 18,
  },
  cartButton: {
    marginTop: 20,
    flexDirection: "row",
    alignSelf: "flex-end",
    backgroundColor: "#16537E",
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 10,
    alignItems: "center",
  },
  cartButtonText: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "500",
    alignItems: "center",
  },
  commentsSection: {
    marginTop: 20,
  },
  addCommentSection: {
    marginBottom: 20,
  },
  commentsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  comment: {
    marginBottom: 15,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  commentAuthor: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  commentDate: {
    fontSize: 12,
    color: "#888",
    marginBottom: 5,
  },
  commentText: {
    fontSize: 14,
    color: "#333",
  },
  ratingContainer: {
    flexDirection: "row",
    marginVertical: 5,
  },
  ratingStars: {
    flexDirection: "row",
    marginVertical: 5,
  },
  containerFlat: {
    flex: 1,
  },
  scrollViewStyle: {
    flexGrow: 1,
    width: "auto",
  },
  textInput: {
    height: 80,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 1,
    paddingHorizontal: 8,
    paddingVertical: 10,
    marginTop: 15,
    borderRadius: 20,
    textAlignVertical: "top",
  },
});
