import { Text, View , StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Image} from 'react-native'
import React, {  useEffect, useState, useCallback  } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { TextInput, Card, Button } from 'react-native-paper';
import { useForm, Controller} from 'react-hook-form';
import request from '../../Servico/Request';
import { useNavigation,  useFocusEffect  } from '@react-navigation/native';


export default function EditarUsuario({route}) {
  const navigation = useNavigation();
  const usrEmail = route.params;
  const [usr, setUsr] = useState({});
    useEffect(() => {
        // Essa função será executada quando a página for montada
        carregarUsr(usrEmail);
      }, []);
      
      useFocusEffect(
        useCallback(() => {
          carregarUsr(usrEmail);
        }, [usrEmail])
      );

      async function carregarUsr (usrEmail){
        try {
            const getinfo = await request.get('usuario/email/' + usrEmail)
            .then(resp => {
               let usrData = resp.data;
               setUsr(usrData);
            })
            .catch(err =>{
                console.log(err);
            })
        } catch (error) {
        }
    }

const { control, handleSubmit, formState: {errors}} = useForm({
});

const [isPasswordVisible, setPasswordVisible] = useState(false);

 async function persistir(data) {
  try{

    const pers = await request.put(`usuario/${usr.id}`, data)
    .then(r =>{
      alert(" Alterado Com sucesso")
      navigation.navigate('PainelUsuario', usrEmail);
    })
    .catch(e =>{
      console.log("nao bateu la");
    })

  }catch{
  }
}
  return (
    <SafeAreaProvider style={styles.container}>
      <Image style={styles.logo} source={require('../../../assets/farolacad.png')} resizeMode="cover"/>
        <View style={styles.content}>
            <Text style={styles.titulo}>Cadastro de Usuário</Text>
        <Card style={styles.card}>
            <Controller
            control={control}
            name='nome'
            render={({field: {onChange, onBlur,value}}) => (
                 <TextInput
                 style={styles.input}
                 onChangeText={onChange}
                 onBlur={onBlur}
                 value={value}
                 placeholder= {usr.nome}
                 underlineColor='transparent'
                 />
            )}
            />
            <Controller
            control={control}
            name='email'
            render={({field: {onChange, onBlur,value}}) => (
                 <TextInput
                 style={styles.input}
                 onChangeText={onChange}
                 onBlur={onBlur}
                 value={value}
                 placeholder= {usr.email}
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
                 underlineColor='transparent'
                 placeholder='Digite sua nova Senha'
                 secureTextEntry={!isPasswordVisible}
                 right={<TextInput.Icon icon={isPasswordVisible ? 'eye-off' : 'eye'} onPress={()=>{ setPasswordVisible(!isPasswordVisible)}} />}
                 />
            )}
            />
             
            <Controller
            control={control}
            name='setor'
            render={({field: {onChange, onBlur,value}}) => (
                 <TextInput
                 style={styles.input}
                 onChangeText={onChange}
                 onBlur={onBlur}
                 value={value}
                 placeholder= {usr.setor}
                 underlineColor='transparent'
                 />
            )}
            />
            <Button icon="account-plus" mode="elevated" buttonColor='#03ad14' textColor='#FFF' onPress={handleSubmit(persistir) }>
                Cadastrar
            </Button>

            
        </Card>
</View>
</SafeAreaProvider>
  ) 
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#078856', // Fundo verde claro
      },
      content: {
        width: '90%', // Ajuste a largura conforme necessário
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
      }
  });