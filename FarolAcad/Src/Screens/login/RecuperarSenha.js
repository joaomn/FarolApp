import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import React, {useState}from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {  Card, Button, TextInput, Snackbar,ActivityIndicator } from 'react-native-paper';
import { useForm, Controller} from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import request from '../../Servico/Request';




function LoginPage () {
  const [visible, setVisible] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const onDismissSnackBar = () => setVisible(false);

  const navigation = useNavigation();
  async function recuperarSenha(data) {
    try{
        setLoading(true);
      const log = await request.post(`usuario/${data.email}/senha`)
      .then(r =>{
        alert("Senha Recuperada com Sucesso")
        navigation.navigate('Login');

      })
      .catch(e =>{
        setVisible(true);
      })
    }catch{
      console.log("nem foi")
    }finally{
        setLoading(false);
    }
  }
  const { control, handleSubmit, formState: {errors}} = useForm({
  });
    return (
      <SafeAreaProvider style={styles.container}>
        <Image style={styles.logo} source={require('../../../assets/farolacad.png')} resizeMode="cover"/>
         <View style={styles.content}>
         <Text style={styles.titulo}>Recuperar Senha</Text>
        <Card style={styles.card}>
            <Text style={styles.recoverContainer}> Esqueceu sua senha? não se preocupe, digite seu email cadastrado
                que te enviaremos uma novinha!
            </Text>
            {loading && <ActivityIndicator animating={true} color="#078856" style={{margin: 20}} size='70'/>}
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
             <Button icon="email-send" mode="elevated" buttonColor='#100dbf' textColor='#FFF' onPress={handleSubmit(recuperarSenha) }>
                Enviar
               
            </Button>
        </Card>
      </View>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Fechar',
          onPress: onDismissSnackBar,
        }}>
        Email incorreto ou não cadastrado.
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
    marginBottom: 20,
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
  
  recoverContainer: {
    alignItems: 'center', // Centraliza os itens horizontalmente
    margin: 10,
    marginTop: 0, 
    fontSize: 20,
    fontStyle: 'italic',

  },
})