import { Text, View , StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Image} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { TextInput, Card, Button } from 'react-native-paper';
import { useForm, Controller} from 'react-hook-form';
import DateTimePicker  from '@react-native-community/datetimepicker';
import request from '../../Servico/Request';
import { useNavigation } from '@react-navigation/native';


export default function CadastroUsuario() {
  const navigation = useNavigation();

const { control, handleSubmit, formState: {errors}} = useForm({
});

const [selectedDate, setSelectedDate] = useState(new Date());
const [showDatePicker, setShowDatePicker] = useState(false);
const [isPasswordVisible, setPasswordVisible] = useState(false);

 async function persistir(data) {
  try{

    const pers = await request.post('usuario', data)
    .then(r =>{
      alert(data.nome + " Cadastrado com sucesso!")
      navigation.navigate('Login');
    })
    .catch(e =>{
      console.log("nao bateu la");
    })

  }catch{

  }
}

  
const openDatePicker = () => {
  setShowDatePicker(true);
};

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
                 placeholder='Digite seu nome'
                 underlineColor='transparent'
                 mode= 'flat'
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
                 underlineColor='transparent'
                 placeholder='Digite sua Senha'
                 secureTextEntry={!isPasswordVisible}
                 right={<TextInput.Icon icon={isPasswordVisible ? 'eye-off' : 'eye'} onPress={()=>{ setPasswordVisible(!isPasswordVisible)}} />}
                 />
            )}
            />
             <Controller
            control={control}
            name='cpf'
            render={({field: {onChange, onBlur,value}}) => (
                 <TextInput
                 style={styles.input}
                 onChangeText={onChange}
                 onBlur={onBlur}
                 value={value}
                 placeholder='Digite seu CPF'
                 underlineColor='transparent'
                 keyboardType='numeric'
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
                 placeholder='Digite seu Setor'
                 underlineColor='transparent'
                 />
            )}
            />
             <Controller
            control={control}
            name='dtNascimento'
            render={({field: {onChange, onBlur,value}}) => (
              <>
             <TouchableWithoutFeedback onPress={openDatePicker}>
              <View>
                <TextInput
                  style={styles.input}
                  placeholder='Data Nascimento'
                  value={selectedDate.toISOString().split('T')[0]}
                  editable={false}
                  underlineColor='transparent'
                />
              </View>
            </TouchableWithoutFeedback>
              {showDatePicker && (
                <DateTimePicker
                  value={selectedDate}
                  mode="date"
                  display="spinner"
                  onChange={(event, selectedDate) => {
                    const currentDate = selectedDate || date;
                    setSelectedDate(currentDate);
                    onChange(currentDate);
                    setShowDatePicker(false); // Defina como false ao fechar o DateTimePicker
                  }}
                />
              )}
            </>
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