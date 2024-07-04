import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import Constants from 'expo-constants';

// Componentes importados (sin lógica)
import Input from '../components/Inputs/Input';
import InputMultiline from '../components/Inputs/InputMultiline';
import MaskedInputTelefono from '../components/Inputs/MaskedInputTelefono';
import MaskedInputDui from '../components/Inputs/MaskedInputDui';
import InputEmail from '../components/Inputs/InputEmail';
import Buttons from '../components/Buttons/Button';

export default function SignUp({ navigation }) {
  // Estado de los campos de entrada
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [direccion, setDireccion] = useState('');
  const [dui, setDui] = useState('');
  const [telefono, setTelefono] = useState('');

  // Función para navegar de vuelta a la pantalla 'Home'
  const volverInicio = async () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewStyle}>
        <Text style={styles.texto}>Editar Perfil</Text>

        {/* Campos de entrada */}
        <Input
          placeHolder='Nombre Cliente'
          value={nombre}
          onChangeText={setNombre}
          style={styles.input}
        />

        <Input
          placeHolder='Apellido Cliente'
          value={apellido}
          onChangeText={setApellido}
          style={styles.input}
        />

        <InputEmail
          placeHolder='Email Cliente'
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />

        <InputMultiline
          placeHolder='Dirección Cliente'
          value={direccion}
          onChangeText={setDireccion}
          style={styles.inputMultiline}
        />

        <MaskedInputDui
          dui={dui}
          setDui={setDui}
          style={styles.input}
        />

        <MaskedInputTelefono
          telefono={telefono}
          setTelefono={setTelefono}
          style={styles.input}
        />

        {/* Botones de acción */}
        <TouchableOpacity style={styles.button} onPress={volverInicio}>
          <Text style={styles.buttonText}>Editar Datos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={volverInicio}>
          <Text style={styles.buttonText}>Ir a inicio</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 55, // Ajustar según sea necesario
  },
  scrollViewStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  texto: {
    color: '#322C2B',
    fontWeight: '500',
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4092CE',
    borderRadius: 10,
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 24,
    marginBottom: 10,
    width: '55%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: '500', // Aplicar el mismo peso de fuente para coherencia
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
    fontSize: 16,
    fontWeight: '500', // Aplicar el mismo peso de fuente que los botones
    color: '#333', // Color de texto oscuro
    minHeight: 100, // Altura mínima para InputMultiline
  },
});
