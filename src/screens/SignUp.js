import { StyleSheet, Text, Image, View, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Constantes from '../utils/constantes';
//Import de componentes
import Input from '../components/Inputs/Input';
import InputMultiline from '../components/Inputs/InputMultiline';
import Buttons from '../components/Buttons/Button';
import MaskedInputTelefono from '../components/Inputs/MaskedInputTelefono';
import MaskedInputDui from '../components/Inputs/MaskedInputDui';
import InputEmail from '../components/Inputs/InputEmail';

export default function SignUp({ navigation }) {
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
    const [clave, setClave] = useState('');
    const [confirmarClave, setConfirmarClave] = useState('');

    // Expresiones regulares para validar DUI y teléfono
    const duiRegex = /^\d{8}-\d$/;
    const telefonoRegex = /^\d{4}-\d{4}$/;

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);

        // Convertir la fecha al formato año-mes-dia
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');

        const fechaNueva = `${year}-${month}-${day}`;
        setFechaNacimiento(fechaNueva);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const handleLogout = async () => {
        navigation.navigate('Sesion');
    };

    const handleCreate = async () => {
        try {
            const fechaMinima = new Date();
            fechaMinima.setFullYear(fechaMinima.getFullYear() - 18);
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
            } else if (new Date(date) > fechaMinima) {
                Alert.alert('Error', 'Debes tener al menos 18 años para registrarte.');
                return;
            }

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
                <View style={styles.offscroll}></View>
                <Text style={styles.texto}>Registrar Usuario</Text>
                <Image source={require('../img/logo.png')} style={styles.image} />

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
                    <TouchableOpacity onPress={showDatepicker}>
                        <Text style={styles.fecha}>{fechaNacimiento || 'Seleccionar Fecha de Nacimiento'}</Text>
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
                <Input
                    placeHolder='Clave'
                    contra={true}
                    setValor={clave}
                    setTextChange={setClave} />
                <Input
                    placeHolder='Confirmar Clave'
                    contra={true}
                    setValor={confirmarClave}
                    setTextChange={setConfirmarClave} />

                <Buttons
                    textoBoton='Registrar Usuario'
                    accionBoton={handleCreate}
                />

                <Buttons
                    textoBoton='Ir al Login'
                    accionBoton={handleLogout}
                />
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
    scrollViewStyle: {
        backgroundColor: '#16537E',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        padding: 15,
    },
    texto: {
        color: '#FFF', fontWeight: '500',
        fontSize: 25,
        padding: 15,
    },
    textRegistrar: {
        color: '#FFF', fontWeight: '500',
        fontSize: 25
    },
    fecha: {
        fontWeight: '500',
        color: '#16537E'
    },
    contenedorFecha: {
        backgroundColor: '#FFF',
        color: "#16537E", fontWeight: '500',
        width: 350,
        height: 45,
        borderRadius: 20,
        padding: 15,
        marginVertical: 10
    },
    image: {
        width: 75,
        height: 75,
        marginBottom: 1
    },
});
