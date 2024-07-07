// Importaciones necesarias desde React Native
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Platform } from 'react-native';

// Componente Input que recibe varias props para gestionar el valor y los cambios de texto
export default function Input({ placeHolder, setValor, contra, setTextChange }) {
    return (
        <TextInput
            style={styles.Input}
            placeholder={placeHolder}
            value={setValor}
            placeholderTextColor={'#4092CE'}
            secureTextEntry={contra}
            onChangeText={setTextChange}
        />
    );
}

// Estilos para el componente Input
const styles = StyleSheet.create({
    Input: {
        backgroundColor: '#FFF',
        color: "#4092CE",
        fontWeight: '500',
        width: 350,
        height: 45,
        borderRadius: 5,
        padding: 10,
        marginVertical: 10
    },
});
