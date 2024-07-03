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
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [direccion, setDireccion] = useState('');
  const [dui, setDui] = useState('');
  const [telefono, setTelefono] = useState('');

  const volverInicio = async () => {
    navigation.navigate('Home'); // Navegar de vuelta a la pantalla 'Home'
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewStyle}>
        <Text style={styles.texto}>Editar Perfil</Text>
        
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
          setTextChange={setEmail}
        />
        
        <InputMultiline
          placeHolder='Dirección Cliente'
          setValor={setDireccion}
          valor={direccion}
          setTextChange={setDireccion}
        />
        
        <MaskedInputDui
          dui={dui}
          setDui={setDui}
        />
        
        <MaskedInputTelefono
          telefono={telefono}
          setTelefono={setTelefono}
        />
        
        <Buttons
          textoBoton='Editar Datos'
          accionBoton={() => { /* Función para editar datos */ }}
        />

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
    paddingTop: Constants.statusBarHeight + 5, // Ajustar según sea necesario
  },
  scrollViewStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto: {
    color: '#322C2B',
    fontWeight: '900',
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4092CE',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});
