
import { StyleSheet, Text, View,TextInput, TouchableOpacity, Alert, Platform} from 'react-native';


export default function Input({placeHolder, setValor, contra, setTextChange}) {

  return (

    <TextInput
    style={styles.Input}
    placeholder={placeHolder}
    value={setValor}
    placeholderTextColor={'#FFF'}
    secureTextEntry={contra} 
    onChangeText={setTextChange}
    />

  );
}

const styles = StyleSheet.create({
  Input: {
    backgroundColor:'#4092CE',
    color: "#fff", fontWeight:'500',
    width:350,
    height: 45, // Estilo de la barra de pestañas, altura diferente para iOS y Android
    borderRadius:5,
    padding: 10,
    marginVertical:10
  },

});