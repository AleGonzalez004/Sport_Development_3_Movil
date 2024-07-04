
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Constantes from '../utils/constantes'
import Constants from 'expo-constants';
//Import de componentes
import Input from '../components/Inputs/Input'
import InputMultiline from '../components/Inputs/InputMultiline'
import Buttons from '../components/Buttons/Button';
import MaskedInputTelefono from '../components/Inputs/MaskedInputTelefono';
import MaskedInputDui from '../components/Inputs/MaskedInputDui';
import InputEmail from '../components/Inputs/InputEmail';


export default function SignUp({ navigation }) {
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

    // Funciones para mostrar y manejar el DateTimePicker
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

    const showDatepicker = () => {
        showMode('date');
    };

    /*
        Fin Codigo para mostrar el datetimepicker
        */

    const handleLogout = async () => {
        /*
                try {
                    const response = await fetch(`${ip}/Sport_Development_3/api/services/public/cliente.php?action=logOut`, {
                        method: 'GET'
                    });
        
                    const data = await response.json();
        
                    if (data.status) {
                        navigation.navigate('Sesion');
                    } else {
                        console.log(data);
                        // Alert the user about the error
                        Alert.alert('Error', data.error);
                    }
                } catch (error) {
                    console.error(error, "Error desde Catch");
                    Alert.alert('Error', 'Ocurrió un error al iniciar sesión con bryancito');
                } */
        navigation.navigate('Sesion');
    };

    //props que recibe input
    //placeHolder, setValor, contra, setTextChange

     // Función para crear un nuevo usuario
     const handleCreate = async () => {
        try {
            // Validación de los campos de entrada
            if (!nombre.trim() || !apellido.trim() || !email.trim() || !direccion.trim() ||
                !dui.trim() || !fechaNacimiento.trim() || !telefono.trim() || !clave.trim() || !confirmarClave.trim()) {
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

            // Si todos los campos son válidos, proceder con la creación del usuario
            const formData = new FormData();
            formData.append('nombreCliente', nombre);
            formData.append('apellidoCliente', apellido);
            formData.append('correoCliente', email);
            formData.append('direccionCliente', direccion);
            formData.append('duiCliente', dui);
            formData.append('nacimientoCliente', fechaNacimiento);
            formData.append('telefonoCliente', telefono);
            formData.append('claveCliente', clave);
            formData.append('confirmarClave', confirmarClave);

            const response = await fetch(`${ip}/Sport_Development_3/api/services/public/cliente.php?action=signUpMovil`, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            if (data.status) {
                Alert.alert('Datos Guardados correctamente');
                navigation.navigate('Sesion');
            } else {
                Alert.alert('Error', data.error);
            }
        } catch (error) {
            Alert.alert('Ocurrió un error al intentar crear el usuario');
        }
    };


return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewStyle}>
                <Text style={styles.texto}>Recuperar Contraseña</Text>
                

                <InputEmail
                    placeHolder='Email Cliente'
                    setValor={email}
                    setTextChange={setEmail} />
                
                <Buttons
                    textoBoton='Enviar correo'
                    accionBoton={handleCreate}
                />

                <Buttons
                    textoBoton='Regresar'
                    accionBoton={handleLogout}
                />


            </ScrollView>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundImage: '#FFF',
        paddingTop: Constants.statusBarHeight + 250, // el 5 es para darle un pequeño margen cuando hay una camara en el centro de la pantalla
      },
    scrollViewStyle: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    texto: {
        color: '#322C2B', fontWeight: '500',
        fontSize: 20
    },
    textRegistrar: {
        color: '#322C2B', fontWeight: '500',
        fontSize: 18
    },

    fecha: {
        fontWeight: '500',
        color: '#FFF'
    },
    fechaSeleccionar: {
        fontWeight: '500',
        color: '#FFF',
        textDecorationLine: 'underline'
    },
    contenedorFecha: {
        backgroundColor: '#4092CE',
        color: "#fff", fontWeight: '500',
        width: 250,
        borderRadius: 5,
        padding: 5,
        marginVertical: 10
    }
});

