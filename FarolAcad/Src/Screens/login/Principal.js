import React from 'react'
import { Card, Text, Button } from 'react-native-paper';
import { StyleSheet , ImageBackground} from 'react-native';
import BarraSuperior from '../../Components/BarraSuperior';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';





const fundo = require('../../../assets/fundo.jpg');

export default function Principal() {
  const navigation = useNavigation();
  return (
    <SafeAreaProvider>

      <BarraSuperior />
    <ImageBackground source={fundo}  resizeMode="cover"
    style={styles.container}>
        <Text style={styles.textoTitulo}> Já conhece a Farol Academy?</Text>
        <Text  style={styles.textoDescricao}> Conheça nossa plataforma de capacitação, e fique atualizado com diversos cursos de forma divertida.</Text>
          <Button icon="account-plus" mode="contained" style={styles.botaoCadastro} uppercase={true} onPress={() => navigation.navigate('Cadastro')}>
         Cadastre-se
         </Button>
    </ImageBackground>
    </SafeAreaProvider>
    
    
      
  )
}

const styles = StyleSheet.create({
    titulo: {
      alignContent: 'center',
      justifyContent:  'center',
      backgroundColor: 'rgba(0, 0, 0, 0)',
      top: 250,
      left: 0,
      


    },
    container: {
      flex: 1,
    },
    textoTitulo:{
        fontSize: 40,
        color: "#FFF",
        alignContent:'center',
        justifyContent:'center',
        top:20,
        maxWidth: 400,
        fontWeight: 900,
        marginBottom: 80,
        padding: 10
    },
    textoDescricao:{
       
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'space-between',
        color: '#FFFF',
        fontWeight: 800,
        fontSize: 30,
        lineHeight: 35,
        padding: 30,
        minWidth: 200,
        width: '80%',
        paddingBottom: 0,
        textTransform: 'capitalize'
        
        
        
        
        
        
    },
    botaoCadastro:{
      width: 200,
      alignItems: 'stretch',
      backgroundColor: '#094fdb',
      justifyContent: 'flex-end',
      left:90,
      marginTop: 15

      

    }
  });

  
