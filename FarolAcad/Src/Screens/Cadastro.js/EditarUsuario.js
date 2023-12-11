import { Text, View , StyleSheet, Image, Modal} from 'react-native'
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

const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

async function deletarModal() {
    setDeleteModalVisible(true);
  }

 async function alterar(data) {
  try{

    const pers = await request.put(`usuario/${usr.id}`, data)
    .then(r =>{
      alert(" Alterado Com sucesso")
      navigation.navigate('PainelUsuario', usr.email);
    })
    .catch(e =>{
      console.log("nao bateu la");
    })

  }catch{
  }
}

async function deletar() {
    setDeleteModalVisible(false);
    try{
  
      const pers = await request.delete(`usuario/${usr.id}`)
      .then(r =>{
        alert("Deletado com Sucesso, foi um Prazer ter tido voce conosco!")
        navigation.navigate('Home');
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
            <Button icon="account-edit" mode="elevated" buttonColor='#dbc609' textColor='#FFF' onPress={handleSubmit(alterar) }>
                Editar
            </Button>
            <Button icon="account-remove" mode="elevated" buttonColor='#b80c09' style={{marginTop : 10}} textColor='#FFF' onPress={deletarModal}>
                Deletar
            </Button>

            
        </Card>
</View>
<Modal
        transparent={true}
        animationType="slide"
        visible={isDeleteModalVisible}
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Card style={styles.modalCard}>
            <Text style={styles.modalTitle}>Excluir Conta</Text>
            <Text style={styles.modalText}>
              Tem certeza que deseja deletar este usuário?
             
            </Text>
            <Button
              icon="check"
              mode="contained"
              buttonColor="#b80c09"
              onPress={deletar}
            >
              Confirmar
            </Button>
            <Button
              icon="cancel"
              mode="contained"
              buttonColor="#666"
              onPress={() => setDeleteModalVisible(false)}
              style={{ marginTop: 10 }}
            >
              Cancelar
            </Button>
          </Card>
        </View>
      </Modal>
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
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalCard: {
        padding: 20,
        borderRadius: 10,
        width: '80%',
        backgroundColor: '#FFF',
      },
      modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      modalText: {
        fontSize: 16,
        marginBottom: 20,
      }
  });