import React, { useState } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

export default function MaskedInputDui({dui, setDui}) {
    return (
            <TextInputMask
                style={styles.Input}
                placeholder="Dui"
                placeholderTextColor="#fff"
                type={'custom'}
                options={{
                    mask: '99999999-9' // Formato para el número de teléfono
                }}
                value={dui}
                onChangeText={setDui}
            />
    );
}

const styles = StyleSheet.create({
    Input: {
      backgroundColor:'#4092CE',
      color: "#fff",
      fontWeight:'500',
      width:350,
      height: 45,
      borderRadius:5,
      padding: 10, // Estilo de la barra de pestañas, altura diferente para iOS y Android,
      marginVertical:10
    },
  
  });