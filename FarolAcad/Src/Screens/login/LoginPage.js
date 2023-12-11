import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {  Card, Button, TextInput, Snackbar } from 'react-native-paper';
import { useForm, Controller} from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import request from '../../Servico/Request';




function LoginPage () {
  const [visible, setVisible] = React.useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  const navigation = useNavigation();
  async function logar(data) {
   
    try{
  
      const log = await request.post('usuario/login/', data)
      .then(r =>{
        navigation.navigate('PainelUsuario', data.email);
      })
      .catch(e =>{
        setVisible(true);
      })
  
    }catch{
      console.log("nem foi")
  
    }
  }

  const { control, handleSubmit, formState: {errors}} = useForm({
  });
  
    return (
      <SafeAreaProvider style={styles.container}>
        <Image style={styles.logo} source={require('../../../assets/farolacad.png')} resizeMode="cover"/>
         <View style={styles.content}>
         <Text style={styles.titulo}>Login Page</Text>
        <Card style={styles.card}>
        <Controller
            control={control}
            name='email'
            render={({field: {onChange, onBlur,value}}) => (
                 <TextInput
                 style={styles.input}
                 onChangeText={onChange}
                 onBlur={onBlur}
                 value={value}
                 placeholder='Digite seu Email'
                 underlineColor='transparent'
                 />
            )}
            />

              <Controller
                control={control}
                name='password'
                render={({field: {onChange, onBlur,value}}) => (
               <TextInput
                 style={styles.input}
                 onChangeText={onChange}
                 onBlur={onBlur}
                 value={value}
                 placeholder='Digite sua Senha'
                 secureTextEntry={true}
                 underlineColor='transparent'
                 />
            )}
            />
             <Button icon="account-plus" mode="elevated" buttonColor='#03ad14' textColor='#FFF' onPress={handleSubmit(logar) }>
                Entrar
            </Button>

            <TouchableOpacity style={styles.recoverContainer}>
              <Text style={styles.recover}>
                Esqueceu sua senha? clique aqui
              </Text>
            </TouchableOpacity>


        </Card>
      </View>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Fechar',
          onPress: onDismissSnackBar,
        }}>
        Usuário ou senha incorretos.
      </Snackbar>
      </SafeAreaProvider>
     
    )
  
}

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#078856', 
  },
  content: {
    width: '90%', 
  },
  titulo: {
    fontSize: 23,
    marginBottom: 20,
    textAlign: 'center',
    margin: 5,
    fontWeight: '900',
    color: '#e8e809',
    shadowColor: '#FFF',
   
    
  },
  card: {
    padding: 20,
    borderRadius: 50,
    paddingTop:40
  },
  input: {
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: '#ebebae'
  },
  logo:{
    width: '40%',
    height:'19%',
    marginTop: 20
  },
  recover:{
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 5,
    fontStyle: 'italic',
  },
  recoverContainer: {
    alignItems: 'center', // Centraliza os itens horizontalmente
    marginTop: 20, // Ajuste conforme necessário
  },
})