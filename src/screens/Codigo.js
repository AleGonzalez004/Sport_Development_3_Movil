import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert, TextInput, TouchableOpacity } from 'react-native';
import * as Constantes from '../utils/constantes';
import Constants from 'expo-constants';
import { FontAwesome } from "@expo/vector-icons"; 
import AntDesign from "@expo/vector-icons/AntDesign";

export default function Recuperacion({ navigation }) {
    const ip = Constantes.IP;

    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const volverInicio = async () => {
        navigation.navigate("Recuperacion");
      };

    const cambiarContrasena = async () => {
        if (!code.trim() || !newPassword.trim() || !confirmPassword.trim()) {
            Alert.alert("Por favor, completa todos los campos.");
            return;
        }
        if (newPassword !== confirmPassword) {
            Alert.alert("Las contraseñas no coinciden.");
            return;
        }

        try {
            const response = await fetch(`${ip}/Sport_Development_3/api/helpers/recuperacion_contrasena.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    code: code.trim(),
                    newPassword: newPassword.trim(),
                    confirmPassword: confirmPassword.trim(),
                }),
            });

            const result = await response.json();

            if (result.status) {
                Alert.alert('Éxito', 'Tu contraseña ha sido cambiada.');
                navigation.navigate('Sesion');
            } else {
                Alert.alert('Error', result.message || 'No se pudo cambiar la contraseña.');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            Alert.alert('Error', 'Ocurrió un error al cambiar la contraseña.');
        }
    };

    return (
        <View style={styles.container}>
              <TouchableOpacity style={styles.ButtonVolver} onPress={volverInicio}>
        <AntDesign name="arrowleft" size={20} color="white" />
      </TouchableOpacity>
            <Text style={styles.texto}>Cambiar Contraseña</Text>
            <TextInput
                style={styles.input}
                placeholder='Código'
                value={code}
                onChangeText={setCode}
            />
            <TextInput
                style={styles.input}
                placeholder='Nueva Contraseña'
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
            />
            <TextInput
                style={styles.input}
                placeholder='Confirmar Contraseña'
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />
            <TouchableOpacity style={styles.button} onPress={cambiarContrasena}>
                <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#16537E',
        paddingTop: Constants.statusBarHeight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    texto: {
        color: '#FFF',
        fontWeight: '500',
        fontSize: 20,
        marginVertical: 20,
    },
    input: {
        height: 40,
        borderColor: '#16537E',
        borderWidth: 2,
        marginVertical: 10,
        width: '80%',
        paddingHorizontal: 10,
        color: '#16537E',
        backgroundColor: '#FFF',
        borderRadius: 5,
    },
    button: {
        backgroundColor: '#16537E',
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
    },
    ButtonVolver: {
        flexDirection: "row",
        marginRight: 310,
        marginTop: 10,
        backgroundColor: "#16537E",
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 12,
      },
});
