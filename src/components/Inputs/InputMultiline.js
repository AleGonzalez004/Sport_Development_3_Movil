
import { StyleSheet, Platform, TextInput} from 'react-native';

export default function InputMultiline({placeHolder, setValor, contra, valor}) {

  return (

    <TextInput
    style={styles.Input}
    placeholder={placeHolder}
    value={valor}
    onChangeText={setValor}
    placeholderTextColor={'#FFF'}
    secureTextEntry={contra} 
    multiline={true}
    numberOfLines={4}
    />

  );
}

const styles = StyleSheet.create({
  Input: {
    backgroundColor:'#4092CE',
    color: "#fff", fontWeight:'500',
    width:250,
    borderRadius:5,
    padding: Platform.OS === 'ios' ? 15 : 10, // Estilo de la barra de pestañas, altura diferente para iOS y Android,
    marginVertical:10
  },

});