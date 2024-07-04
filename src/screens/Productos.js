import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
  ScrollView,
  SafeAreaView,
  Image,
  Modal,
} from "react-native";
import { useState, useEffect } from "react";
import * as Constantes from "../utils/constantes";
import Buttons from "../components/Buttons/Button";
import ProductoCard from "../components/Productos/ProductoCard";
import ModalCompra from "../components/Modales/ModalCompra";
import RNPickerSelect from "react-native-picker-select";
import Constants from "expo-constants";
import { FontAwesome } from "@expo/vector-icons"; // Importamos el ícono
import AntDesign from "@expo/vector-icons/AntDesign";

export default function Productos({ navigation }) {
  const ip = Constantes.IP;
  // Estados para almacenar los datos de los productos y categorías
  const [dataProductos, setDataProductos] = useState([]);
  const [dataCategorias, setDataCategorias] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const [cantidad, setCantidad] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [idProductoModal, setIdProductoModal] = useState("");
  const [nombreProductoModal, setNombreProductoModal] = useState("");

  // Función para navegar a la pantalla de inicio
  const volverInicio = async () => {
    navigation.navigate("Home");
  };

  // Función para manejar la apertura del modal de compra
  const handleCompra = (nombre, id) => {
    setModalVisible(true);
    setIdProductoModal(id);
    setNombreProductoModal(nombre);
  };

  // Función para obtener los productos por categoría
  const getProductos = async (idCategoriaSelect = 1) => {
    try {
      if (idCategoriaSelect <= 0) {
        // Validar que se haya seleccionado una categoría
        return;
      }
      const formData = new FormData();
      formData.append("idCategoria", idCategoriaSelect);
      //utilizar la direccion IP del servidor y no localhost
      const response = await fetch(
        `${ip}/Sport_Development_3/api/services/public/producto.php?action=readProductosCategoria`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      console.log("data al obtener productos  \n", data);
      if (data.status) {
        console.log("trae datos el dataset", data);
        setDataProductos(data.dataset);
      } else {
        console.log("Data en el ELSE error productos", data);
        // Alert the user about the error
        Alert.alert("Error productos", data.error);
      }
    } catch (error) {
      console.error(error, "Error desde Catch");
      Alert.alert("Error", "Ocurrió un error al listar los productos");
    }
  };

  // Función para obtener las categorías
  const getCategorias = async () => {
    try {

      const response = await fetch(
        `${ip}/Sport_Development_3/api/services/public/categoria.php?action=readAll`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      if (data.status) {
        setDataCategorias(data.dataset);
      } else {
        console.log(data);
        // Alert the user about the error
        Alert.alert("Error categorias", data.error);
      }
    } catch (error) {
      Alert.alert("Error", "Ocurrió un error al listar las categorias");
    }
  };

  // Uso del React Hook useEffect para cargar los productos y categorías al montar el componente
  useEffect(() => {
    getProductos();
    getCategorias();
  }, []);

  // Función para navegar a la pantalla de Carrito
  const irCarrito = () => {
    navigation.navigate("Carrito");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.ButtonVolver} onPress={volverInicio}>
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
      <View>
        <Text style={styles.subtitle}>
          /////////////////////////////////////////////////////////////////////
        </Text>
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            style={{ inputAndroid: styles.picker }}
            onValueChange={(value) => getProductos(value)}
            placeholder={{ label: "Selecciona una categoría...", value: null }}
            items={dataCategorias.map((categoria) => ({
              label: categoria.nombre,
              value: categoria.id_categoria,
            }))}
          />
        </View>
      </View>
      <SafeAreaView style={styles.containerFlat}>
        <FlatList
          data={dataProductos}
          keyExtractor={(item) => item.id_producto}
          renderItem={(
            { item } // Util izamos destructuración para obtener directamente el item
          ) => (
            <ProductoCard
              ip={ip}
              imagenProducto={item.imagen_producto}
              idProducto={item.id_producto}
              nombreProducto={item.nombre_producto}
              descripcionProducto={item.descripcion_producto}
              precioProducto={item.precio_producto}
              existenciasProducto={item.existencias_producto}
              accionBotonProducto={() =>
                handleCompra(item.nombre_producto, item.id_producto)
              }
            />
          )}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  containerFlat: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 8,
    marginLeft: 8,
  },
  button: {
    backgroundColor: "#4092CE",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "500",
  },
  image: {
    width: "65%",
    height: 150,
    borderRadius: 8,
    marginBottom: 12,
  },
  imageContainer: {
    alignItems: "center",
  },
  textDentro: {
    fontWeight: "400",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
    color: "#000000",
  },
  cartButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4092CE",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  ButtonVolver: {
    flexDirection: "row",
    marginRight: 320,
    marginTop: 20,
    backgroundColor: "#4092CE",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  cartButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "500",
    marginVertical: 5,
    marginHorizontal: 5,
    color: "#FFF", // Brown color for the title
  },
  pickerContainer: {
    borderWidth: 0,
    borderColor: "#4092CE", // Color del borde
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginBottom: 5,
    backgroundColor: "#4092CE", // Color de fondo
    color: "#FFF",
  },
  picker: {
    color: "#FFF",
  },
});
