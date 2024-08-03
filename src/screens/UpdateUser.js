import { StyleSheet, Text, Image, View, TouchableOpacity, Alert, ScrollView, Modal, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Constantes from '../utils/constantes';
import Input from '../components/Inputs/Input';
import InputMultiline from '../components/Inputs/InputMultiline';
import Buttons from '../components/Buttons/Button';
import MaskedInputTelefono from '../components/Inputs/MaskedInputTelefono';
import MaskedInputDui from '../components/Inputs/MaskedInputDui';
import InputEmail from '../components/Inputs/InputEmail';
import AntDesign from "@expo/vector-icons/AntDesign";

export default function UserProfile({ navigation }) {
  const ip = Constantes.IP;

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [direccion, setDireccion] = useState('');
  const [dui, setDui] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [claveActual, setClaveActual] = useState('');
  const [claveNueva, setClaveNueva] = useState('');
  const [confirmarClave, setConfirmarClave] = useState('');

  const duiRegex = /^\d{8}-\d$/;
  const telefonoRegex = /^\d{4}-\d{4}$/;

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    setFechaNacimiento(`${year}-${month}-${day}`);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const volverInicio = () => {
    navigation.navigate("Home");
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const handleLogout = () => {
    navigation.navigate('Sesion');
  };

  const Cambio = () => {
    navigation.navigate('Cambio');
  };

  const getUser = async () => {
    try {
      const response = await fetch(`${ip}/Sport_Development_3/api/services/public/cliente.php?action=getUser`, {
        method: 'GET'
      });
      const data = await response.json();
      if (data.status) {
        setNombre(data.name.nombre_cliente);
        setApellido(data.name.apellido_cliente);
        setEmail(data.name.correo_cliente);
        setDui(data.name.dui_cliente);
        setTelefono(data.name.telefono_cliente);
        setDireccion(data.name.direccion_cliente);
        setFechaNacimiento(data.name.nacimiento_cliente);
        const [year, month, day] = data.name.nacimiento_cliente.split('-');
        setDate(new Date(year, month - 1, day));
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al obtener los datos del usuario');
    }
  };

  const handleEdit = async () => {
    try {
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
      }

      const formData = new FormData();
      formData.append('nombreCliente', nombre);
      formData.append('apellidoCliente', apellido);
      formData.append('correoCliente', email);
      formData.append('duiCliente', dui);
      formData.append('telefonoCliente', telefono);
      formData.append('direccionCliente', direccion);
      formData.append('nacimientoCliente', fechaNacimiento);

      const response = await fetch(`${ip}/Sport_Development_3/api/services/public/cliente.php?action=editProfile`, {
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
      Alert.alert('Ocurrió un error al intentar editar el perfil');
    }
  };

  const handleChangePassword = async () => {
    // Validar si las contraseñas coinciden
    if (claveNueva !== confirmarClave) {
      Alert.alert("Las contraseñas nuevas no coinciden");
      return;
    }
  
    try {
      // Preparar los datos para enviar
      const formData = new FormData();
      formData.append('claveActual', claveActual);
      formData.append('claveNueva', claveNueva);
  
      // Hacer la petición al servidor
      const response = await fetch(`${ip}/Sport_Development_3/api/services/public/cliente.php?action=changePassword`, {
        method: 'POST',
        body: formData,
      });
  
      // Analizar la respuesta
      const data = await response.json();
      if (data.status) {
        // Si la respuesta es positiva
        Alert.alert("Contraseña cambiada con éxito");
        setModalVisible(false);
      } else {
        // Si la respuesta es negativa
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      // Manejar errores de red o de servidor
      Alert.alert('Ocurrió un error al intentar cambiar la contraseña');
    }
  };
  
  useEffect(() => {
    getUser();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewStyle}>
        <TouchableOpacity style={styles.ButtonVolver} onPress={volverInicio}>
          <AntDesign name="arrowleft" size={20} color="white" />
        </TouchableOpacity>
        <Text style={styles.texto}>Editar Perfil</Text>
        <Image source={require('../img/user.png')} style={styles.image} />
        <Input
          placeHolder='Nombre Cliente'
          valor={nombre}
          setTextChange={setNombre}
        />
        <Input
          placeHolder='Apellido Cliente'
          valor={apellido}
          setTextChange={setApellido}
        />
        <InputEmail
          placeHolder='Email Cliente'
          valor={email}
          setTextChange={setEmail} />
        <InputMultiline
          placeHolder='Dirección Cliente'
          valor={direccion}
          setTextChange={setDireccion} />
        <MaskedInputDui
          dui={dui}
          setDui={setDui} />
        <View style={styles.contenedorFecha}>
          <TouchableOpacity onPress={showDatepicker}>
            <Text style={styles.fechaSeleccionar}>
              Seleccionar Fecha de Nacimiento: <Text style={styles.fecha}> {fechaNacimiento}</Text>
            </Text>
          </TouchableOpacity>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              minimumDate={new Date(new Date().getFullYear() - 100, new Date().getMonth(), new Date().getDate())}
              maximumDate={new Date()}
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
          accionBoton={() => setModalVisible(true)}
        />

        {/* Modal para cambiar la contraseña */}
        <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
            // Opcionalmente, limpiar los campos de contraseña aquí
            setClaveActual('');
            setClaveNueva('');
            setConfirmarClave('');
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Cambiar Contraseña</Text>
              <TextInput
                style={styles.modalInput}
                placeholder='Contraseña Actual'
                secureTextEntry
                value={claveActual}
                onChangeText={setClaveActual}
              />
              <TextInput
                style={styles.modalInput}
                placeholder='Nueva Contraseña'
                secureTextEntry
                value={claveNueva}
                onChangeText={setClaveNueva}
              />
              <TextInput
                style={styles.modalInput}
                placeholder='Confirmar Nueva Contraseña'
                secureTextEntry
                value={confirmarClave}
                onChangeText={setConfirmarClave}
              />
              <Buttons
                textoBoton='Confirmar'
                accionBoton={handleChangePassword}
              />
              <Buttons
                textoBoton='Cancelar'
                accionBoton={() => {
                  setModalVisible(false);
                  // Limpiar campos de contraseña si es necesario
                  setClaveActual('');
                  setClaveNueva('');
                  setConfirmarClave('');
                }}
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#16537E',
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
  contenedorFecha: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    width: 350,
    height: 45,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10
  },
  fechaSeleccionar: {
    fontSize: 13,
    color: '#16537E',
    fontWeight: '500'
  },
  fecha: {
    fontSize: 13,
    color: '#16537E',
    fontWeight: '500'
  },
  image: {
    width: 75,
    height: 75,
    marginBottom: 5,
    backgroundColor: '#FFF',
    borderRadius: 50,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center'
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15
  },
  modalInput: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10
  },
  modalButton: {
    width: '100%',
    backgroundColor: '#16537E',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 5
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold'
  },
});

