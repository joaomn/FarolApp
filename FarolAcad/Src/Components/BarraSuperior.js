import * as React from 'react';
import { Appbar, Tooltip} from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';



function BarraSuperior(){ 
 const navigation = useNavigation();

 return(
<Appbar.Header style={styles.customHeader} >
    <Appbar.Content  titleStyle={styles.customTitle} title="Farol Academy"/>
    <Appbar.Action icon="account" onPress={() => {navigation.navigate('Login')}} />
  </Appbar.Header>
 ) 
};

const styles = StyleSheet.create({
  customHeader: {
    backgroundColor: 'rgba(194, 237, 194)', // Ajuste o valor de opacidade conforme necessário
  },
  customTitle: {
    color: '#078856'
  },
});

export default BarraSuperior;