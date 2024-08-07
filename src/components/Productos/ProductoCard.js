import { StatusBar, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

// Componente ProductoCard para mostrar la información de un producto
export default function ProductoCard({
  ip, imagenProducto, idProducto, nombreProducto, descripcionProducto,
  precioProducto, existenciasProducto, calificacionPromedio, accionBotonProducto, Detalle
}) {

  // Función para renderizar las estrellas de calificación
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(calificacionPromedio);
    const hasHalfStar = calificacionPromedio % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FontAwesome key={`star-${i}`} name="star" size={20} color="#000" />);
    }

    if (hasHalfStar) {
      stars.push(<FontAwesome key="star-half" name="star-half-o" size={20} color="#000" />);
    }

    return stars;
  };

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: `${ip}/Sport_Development_3/api/images/productos/${imagenProducto}` }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.text}>{idProducto}</Text>
      <Text style={styles.textTitle}>{nombreProducto}</Text>
      <Text style={styles.text}>{descripcionProducto}</Text>
      <Text style={styles.textTitle}>Precio: <Text style={styles.textDentro}>${precioProducto}</Text></Text>
      <Text style={styles.textTitle}>Existencias: <Text style={styles.textDentro}>{existenciasProducto} {existenciasProducto === 1 ? 'Unidad' : 'Unidades'}</Text></Text>

      <View style={styles.ratingContainer}>
        <Text style={styles.textTitle}>Calificación:</Text>
        {renderStars()}
        <Text style={styles.ratingText}>{calificacionPromedio.toFixed(1)}</Text>
      </View>

      <TouchableOpacity
        style={styles.cartButton}
        onPress={accionBotonProducto}>
        <FontAwesome name="plus-circle" size={24} color="white" />
        <Text style={styles.cartButtonText}>Agregar al Carrito</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.cartButton}
        onPress={Detalle}>
        <FontAwesome name="address-card" size={24} color="white" />
        <Text style={styles.cartButtonText}>Ver detalle</Text>
      </TouchableOpacity>
    </View>
  );
}

// Estilos para el componente ProductoCard
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 12,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
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
    fontWeight: '500',
  },
  textDentro: {
    fontWeight: '400',
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
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 10,
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  ratingText: {
    fontSize: 16,
    marginLeft: 8,
    fontWeight: '500',
    color: '#000',
  },
});
