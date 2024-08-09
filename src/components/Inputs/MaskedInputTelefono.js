// Importaciones necesarias desde React y React Native
import React from "react";
import { Platform, TextInput, StyleSheet } from "react-native";
import { TextInputMask } from "react-native-masked-text";

// Componente MaskedInputTelefono que muestra un campo de entrada con máscara para el teléfono
export default function MaskedInputTelefono({ telefono, setTelefono }) {
  return (
    <TextInputMask
      style={styles.Input}
      placeholder="Teléfono"
      placeholderTextColor="#16537E"
      type={"custom"}
      options={{
        mask: "9999-9999",
      }}
      value={telefono}
      onChangeText={setTelefono}
    />
  );
}

// Estilos para el componente MaskedInputTelefono
const styles = StyleSheet.create({
  Input: {
    backgroundColor: "#FFF",
    color: "#16537E",
    fontWeight: "500",
    width: 350,
    height: 45,
    borderRadius: 15,
    padding: 10,
    marginVertical: 10,
  },
});
