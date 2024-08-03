import { StyleSheet, TextInput } from 'react-native';
import React from 'react';

// Componente InputMultiline que recibe varias props para gestionar el valor, el texto y si es seguro
export default function Input({ placeHolder, valor, contra, setTextChange }) {
  return (
    <TextInput
      style={styles.Input}
      placeholder={placeHolder}
      value={valor}
      onChangeText={setTextChange}
      placeholderTextColor={'#16537E'}
      secureTextEntry={contra}
      multiline={true}
      numberOfLines={4}
    />
  );
}

// Estilos para el componente InputMultiline
const styles = StyleSheet.create({
  Input: {
    backgroundColor: '#FFF',
    color: "#16537E",
    fontWeight: '500',
    width: 350,
    height: 45,  // Ajuste la altura para multiline
    borderRadius: 5,
    padding: 10,
    marginVertical: 10
  },
});
