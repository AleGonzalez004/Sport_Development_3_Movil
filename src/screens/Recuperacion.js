import { StyleSheet, Text, View, Alert } from 'react-native';
import { useState } from 'react';
import * as Constantes from '../utils/constantes';
import Constants from 'expo-constants';
import Buttons from '../components/Buttons/Button';
import InputEmail from '../components/Inputs/InputEmail';

export default function Recuperacion({ navigation }) {
    const ip = Constantes.IP;

    const [email, setEmail] = useState('');

    const Codigo = async () => {
        if (!email.trim()) {
            Alert.alert("Por favor, ingresa un correo electrónico.");
            return;
        }
    
        try {
            const response = await fetch(`${ip}/Sport_Development_3/api/helpers/recuperacion.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    email: email,
                }),
            });
    
            const data = await response.json();
    
            if (data.status) {
                Alert.alert('Código enviado', 'Un código de recuperación ha sido enviado a tu correo.');
                navigation.navigate('Codigo'); // Navegar al siguiente paso
            } else {
                Alert.alert('Error', data.error || 'No se pudo enviar el código.');
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error al enviar el código.');
        }
    };
    

    const handleLogout = async () => {
        navigation.navigate('Sesion');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.texto}>Recuperar Contraseña</Text>
            <InputEmail
                placeHolder='Email'
                valor={email}
                setTextChange={setEmail} />
            <Buttons
                textoBoton='Enviar código'
                accionBoton={Codigo}
            />
            <Buttons
                textoBoton='Regresar'
                accionBoton={handleLogout}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#16537E',
        paddingTop: Constants.statusBarHeight + 0, 
        alignItems: 'center',
        justifyContent: 'center',
    },
    texto: {
        color: '#FFF', 
        fontWeight: '500',
        fontSize: 20,
        marginVertical: 20,
    },
});
