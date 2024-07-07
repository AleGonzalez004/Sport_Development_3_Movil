// Importaciones necesarias desde react-native
import { StyleSheet, Text, TouchableOpacity, Platform } from 'react-native';

// Componente de botón personalizado
export default function Buttons({ textoBoton, accionBoton }) {
    return (
        <>
            <TouchableOpacity style={styles.button} onPress={accionBoton}>
                <Text style={styles.buttonText}>{textoBoton}</Text>
            </TouchableOpacity>
        </>
    );
}

// Estilos para el componente de botón
const styles = StyleSheet.create({
    button: {
        borderWidth: 1,
        borderColor: "#4092CE",
        width: Platform.OS === 'ios' ? 200 : 200,
        borderRadius: 10,
        backgroundColor: "#4092CE",
        padding: Platform.OS === 'ios' ? 15 : 10,
        marginVertical: 5,
    },
    buttonText: {
        textAlign: 'center',
        color: "#FFF",
        fontWeight: '500',
    },
});
