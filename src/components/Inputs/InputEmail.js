// Importaciones necesarias desde React Native
import { StyleSheet, TextInput, Platform } from 'react-native';

// Componente InputEmail que recibe varias props para gestionar el valor y los cambios de texto
export default function InputEmail({ placeHolder, setValor, setTextChange }) {
    return (
        <TextInput
            style={styles.Input}
            placeholder={placeHolder}
            value={setValor}
            placeholderTextColor={'#4092CE'}
            onChangeText={setTextChange}
            keyboardType="email-address"
        />
    );
}

// Estilos para el componente InputEmail
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
