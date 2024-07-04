
import { StyleSheet, TextInput, Platform} from 'react-native';

export default function InputEmail({placeHolder, setValor, setTextChange}) {

  return (

    <TextInput
    style={styles.Input}
    placeholder={placeHolder}
    value={setValor}
    placeholderTextColor={'#FFF'}
    onChangeText={setTextChange}
    keyboardType="email-address"
    />

  );
}

const styles = StyleSheet.create({
  Input: {
    backgroundColor:'#4092CE',
    color: "#fff", fontWeight:'500',
    width:350,
    height: 45,
    borderRadius:5,
    padding: 10, // Estilo de la barra de pestañas, altura diferente para iOS y Android,
    marginVertical:10
  },

});