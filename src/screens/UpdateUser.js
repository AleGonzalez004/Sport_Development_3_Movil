
import { StyleSheet, Text, Image, View, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Constantes from '../utils/constantes'
//Import de componentes
import Input from '../components/Inputs/Input'
import InputMultiline from '../components/Inputs/InputMultiline'
import Buttons from '../components/Buttons/Button';
import MaskedInputTelefono from '../components/Inputs/MaskedInputTelefono';
import MaskedInputDui from '../components/Inputs/MaskedInputDui';
import InputEmail from '../components/Inputs/InputEmail';
import AntDesign from "@expo/vector-icons/AntDesign";


export default function readProfile({ navigation }) {
  const ip = Constantes.IP;

  // Estado para el DateTimePicker
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  // Estados de los campos de entrada
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [email, setEmail] = useState('')
  const [direccion, setDireccion] = useState('')
  const [dui, setDui] = useState('')
  const [telefono, setTelefono] = useState('')
  const [fechaNacimiento, setFechaNacimiento] = useState('')
  const [clave, setClave] = useState('')
  const [confirmarClave, setConfirmarClave] = useState('')

  // Expresiones regulares para validar DUI y teléfono
  const duiRegex = /^\d{8}-\d$/;
  const telefonoRegex = /^\d{4}-\d{4}$/;

  /*
  Codigo para mostrar el datetimepicker
  */

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    /*
    Codigo para convertir la fecha al formato año-mes-dia */

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    const fechaNueva = `${year}-${month}-${day}`;
    setFechaNacimiento(fechaNueva)
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const volverInicio = async () => {
    navigation.navigate("Home");
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const handleLogout = async () => {
    navigation.navigate('Sesion');
  };

  const Cambio = async () => {
    navigation.navigate('Cambio');
  };

  // Función para crear un nuevo usuario
  const handleEdit = async () => {
    try {
      // Validación de los campos de entrada
      if (!nombre.trim() || !apellido.trim() || !email.trim() || !direccion.trim() ||
        !dui.trim() || !fechaNacimiento.trim() || !telefono.trim()) {
        Alert.alert("Debes llenar todos los campos");
        return;
      } else if (!duiRegex.test(dui)) {
        Alert.alert("El DUI debe tener el formato correcto (########-#)");
        return;
      } else if (!telefonoRegex.test(telefono)) {
        Alert.alert("El teléfono debe tener el formato correcto (####-####)");
        return;
      } else if (date > fechaMinima) {
        Alert.alert('Error', 'Debes tener al menos 18 años para registrarte.');
        return;
      }

      // Si todos los campos son válidos, proceder con la edición del perfil
      const formData = new FormData();
      formData.append('nombre_cliente', nombre);
      formData.append('apellido_cliente', apellido);
      formData.append('correo_cliente', email);
      formData.append('dui_cliente', dui);
      formData.append('telefono_cliente', telefono);
      formData.append('direccion_cliente', direccion);
      formData.append('nacimiento_cliente', fechaNacimiento);

      const response = await fetch(`${ip}/Sport_Development_3/api/services/public/cliente.php?action=readProfile`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      if (data.status) {
        Alert.alert('Perfil actualizado correctamente');
        navigation.navigate('Home');
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      Alert.alert('Ocurrió un error al intentar actualizar el perfil');
    }
  };



  return (
    <View style={styles.container}>

      <ScrollView contentContainerStyle={styles.scrollViewStyle}>
        <TouchableOpacity style={styles.ButtonVolver} onPress={volverInicio}>
          <AntDesign name="arrowleft" size={20} color="white" />
        </TouchableOpacity>
        <Text style={styles.texto}>Editar Perfil</Text>
        <Image source={require('../img/user.png')} style={styles.image} />
        <Buttons textoBoton='Cambiar foto de perfil' accionBoton={handleLogout} />


        <Input
          placeHolder='Nombre Cliente'
          setValor={nombre}
          setTextChange={setNombre}
        />
        <Input
          placeHolder='Apellido Cliente'
          setValor={apellido}
          setTextChange={setApellido}
        />
        <InputEmail
          placeHolder='Email Cliente'
          setValor={email}
          setTextChange={setEmail} />
        <InputMultiline
          placeHolder='Dirección Cliente'
          setValor={setDireccion}
          valor={direccion}
          setTextChange={setDireccion} />
        <MaskedInputDui
          dui={dui}
          setDui={setDui} />
        <View style={styles.contenedorFecha}>
          <TouchableOpacity onPress={showDatepicker}><Text style={styles.fechaSeleccionar}>Seleccionar Fecha de Nacimiento:  <Text style={styles.fecha}> {fechaNacimiento}</Text></Text></TouchableOpacity>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              minimumDate={new Date(new Date().getFullYear() - 100, new Date().getMonth(), new Date().getDate())} // Fecha mínima permitida (100 años atrás desde la fecha actual)
              maximumDate={new Date()} // Fecha máxima permitida (fecha actual)
              onChange={onChange}
            />
          )}
        </View>

        <MaskedInputTelefono
          telefono={telefono}
          setTelefono={setTelefono} />


        <Buttons
          textoBoton='Editar perfil'
          accionBoton={handleEdit}
        />

        <Buttons
          textoBoton='Cambiar contraseña'
          accionBoton={Cambio}
        />

      </ScrollView>

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 55,
    alignItems: 'center',
    justifyContent: 'center'
  },
  ButtonVolver: {
    flexDirection: "row",
    marginRight: 310,
    marginTop: 10,
    backgroundColor: "#16537E",
    borderRadius: 8,
    paddingHorizontal: 15,
  },
  scrollViewStyle: {
    backgroundColor: '#16537E',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 15,
  },
  texto: {
    color: '#FFF', fontWeight: '500',
    fontSize: 25,
    marginVertical: 10
  },
  textRegistrar: {
    color: '#FFF', fontWeight: '500',
    fontSize: 25
  },

  fecha: {
    fontWeight: '500',
    color: '#16537E'
  },
  fechaSeleccionar: {
    fontWeight: '500',
    color: '#16537E',
  },
  contenedorFecha: {
    backgroundColor: '#FFF',
    color: "#16537E", fontWeight: '500',
    width: 350,
    height: 45,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10
  },
  image: {
    width: 75,
    height: 75,
    marginBottom: 5,
    backgroundColor: '#FFF',
    borderRadius: 50,
  },

});

