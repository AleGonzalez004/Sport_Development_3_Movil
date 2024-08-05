import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert, Modal, Pressable, TextInput } from 'react-native';
import * as Constantes from '../utils/constantes';
import Constants from 'expo-constants';

export default function Recuperacion({ navigation }) {
    const ip = Constantes.IP;

    const [email, setEmail] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const enviarCodigo = async () => {
        if (!email.trim()) {
            Alert.alert("Por favor, ingresa tu correo electrónico.");
            return;
        }
        try {
            const formData = new FormData();
            formData.append('email', email);

            const response = await fetch(`${ip}/Sport_Development_3/api/helpers/recuperacionmovil.php`, {
                method: 'POST',
                body: formData,
            });

            // Leer la respuesta en formato texto
            const textResponse = await response.text(); 

            console.log('Respuesta del servidor:', textResponse); // Imprimir respuesta para depuración

            // Intentar analizar JSON si la respuesta es JSON
            try {
                const result = JSON.parse(textResponse);
                if (result.status === 1) {
                    Alert.alert('Pin de seguridad', 'Revise su correo electrónico');
                } else {
                    Alert.alert('Error', 'No se pudo enviar el código.');
                }
            } catch (jsonError) {
                // Si no se puede analizar JSON, manejar la respuesta como texto
                Alert.alert('Error', 'La respuesta del servidor no es JSON válido. Respuesta recibida: ' + textResponse);
                console.error('Error al analizar JSON:', jsonError);
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', error.toString());
        }
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
            const response = await fetch(`${ip}/Sport_Development_3/api/helpers/recuperacion.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    accion: 'cambiar_contrasena',
                    codigo: code.trim(),
                    nueva_contrasena: newPassword.trim(),
                }),
            });

            // Leer la respuesta en formato texto
            const textResponse = await response.text(); 

            console.log('Respuesta del servidor:', textResponse); // Imprimir respuesta para depuración

            if (textResponse.includes('Contraseña cambiada correctamente.')) {
                Alert.alert('Éxito', 'Tu contraseña ha sido cambiada.');
                setModalVisible(false);
                navigation.navigate('Sesion');
            } else {
                Alert.alert('Error', textResponse || 'No se pudo cambiar la contraseña.');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            Alert.alert('Error', 'Ocurrió un error al cambiar la contraseña.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.texto}>Recuperar Contraseña</Text>
            <TextInput
                style={styles.input}
                placeholder='Email'
                value={email}
                onChangeText={setEmail}
                keyboardType='email-address'
            />
            <Pressable style={styles.button} onPress={enviarCodigo}>
                <Text style={styles.buttonText}>Enviar código</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => setModalVisible(true)}>
                <Text style={styles.buttonText}>Colocar código</Text>
            </Pressable>

            {/* Modal para cambiar contraseña */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Cambiar Contraseña</Text>
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
                        <Pressable style={styles.button} onPress={cambiarContrasena}>
                            <Text style={styles.buttonText}>Guardar</Text>
                        </Pressable>
                        <Pressable style={styles.button} onPress={() => setModalVisible(false)}>
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        marginBottom: 15,
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
    }
});
