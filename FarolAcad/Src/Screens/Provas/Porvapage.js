import React, { useState, useEffect } from 'react';
import { View, Text,  TouchableOpacity, StyleSheet, Modal,Button } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import PagerView from 'react-native-pager-view';
import request from '../../Servico/Request';
import { TextInput , Card} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';


const PageIndicator = ({ currentPage, totalPages }) => (
  <View style={styles.pageIndicator}>
    <View style={styles.pageIndicatorContent}>
      <Text style={styles.pageIndicatorText}>{`${currentPage + 1}/${totalPages}`}</Text>
    </View>
  </View>
);

const ProvaPage = ({ route }) => {
  const cursoID = route.params;

  const [prova, setProva] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [texto, setTexto] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [provaID, setProvaID] = useState('');
  const [modalComCertificado, setModalComCertificado] = useState(false);
  const [modalSemCertificado, setModalSemCertificado] = useState(false);
  const [provaPontuacao, setProvaPontuacao] = useState('');

  const navigation = useNavigation();


  const { control, handleSubmit, formState: {errors}} = useForm({
});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await request.get(`/prova/curso/${cursoID}`);
        const apiData = response.data;
        setProva(apiData);
        setProvaID(apiData.id);
      } catch (error) {
        console.error('Erro ao obter dados da API:', error);
      }
    };
    fetchData();
    const delay = 2000;
    const timeoutId = setTimeout(() => {
        setTexto('Arraste para o lado para ver as proximas perguntas');
      }, delay);
  }, [cursoID]);
  const onSubmit = async (data) => {
    try {
      const response = await request.post(`/prova/${provaID}/responder`, data)
      .then(res =>{
        setProvaPontuacao(res.data.pontuacao);
        if(provaPontuacao >= 5){
          alert("Ficamos muito felizes por você ter chegado até aqui, marujo.\nNo entanto, infelizmente, você não obteve a pontuação mínima de 5 para obter um certificado.\nSua pontuação já foi adicionada ao seu rank. Continue tentando conseguir seu certificado.");
        }else{
          alert("PARABÉNS!!! Você obteve uma ótima pontuação e tem direito a receber seu certificado.\nAlém disso, sua pontuação já foi somada ao seu rank.");
        }
        navigation.navigate('PainelUsuario', emailValue)
      })

    } catch (error) {
      console.error('Erro ao obter dados da API:', error);
    }

    console.log('Dados do formulário:', data);
    
  };
  if (!prova || !prova.perguntas || prova.perguntas.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }
  return (
    <PagerView
      style={styles.container}
      initialPage={currentPage}
      onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
    >
      {prova.perguntas.map((pergunta, index) => (
  <View key={pergunta.id} style={styles.pageContainer}>
     <PageIndicator currentPage={index} totalPages={prova.perguntas.length} />
    <Text style={styles.questionText}>{pergunta.titulo}</Text>
    <View style={styles.cardContainer}>
    {pergunta.alternativa.map((alternativa) => (
    <Controller
        key={alternativa}
        control={control}
        name={`respostas[${index}]`}
        defaultValue=""
        render={({ field }) => (
      <TouchableOpacity
        onPress={() => {
          field.onChange(field.value === alternativa ? "" : alternativa);
        }}
        style={[styles.alternativeCard, field.value === alternativa ? { backgroundColor: 'lightblue' } : null]}
      >
        <Text>{alternativa}</Text>
      </TouchableOpacity>
    )}
  />
))}
      {index === 0 && <Text> {texto}</Text>} 
    </View>
    {index === prova.perguntas.length - 1 && (
      <View style={styles.submitButton}>
        <Controller
                control={control}
                name='email'
                render={({ field }) => (
                  <TextInput
                    style={styles.input}
                    onChangeText={(text) => {
                      field.onChange(text);
                      setEmailValue(text); // Atualiza o estado com o valor do email
                    }}
                    onBlur={field.onBlur}
                    value={field.value}
                    placeholder='Digite seu Email para enviar as respostas'
                    underlineColor='transparent'
                  />
                )}
              />
        <Controller
          control={control}
          name='respostas'
          defaultValue={[]}
          render={({field: {value}}) => (
            <Button title="Enviar Respostas" onPress={handleSubmit(onSubmit)} disabled={emailValue === ''} />
            // onPress={handleSubmit(onSubmit)} disabled={emailValue === ''}
          )}
        />
      </View>
    )}
  </View>
))}

    </PagerView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#d4fcd7',
  },
  questionText: {
    fontSize: 18,
    marginBottom: 10,
  },
  cardContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    width: '100%',
    backgroundColor: '#FFF',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  alternativeCard: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  submitButton: {
    marginTop: 30,
    gap: 10,
    flexDirection: 'column',
    width: '90%'
    

  },
  input:{
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
  pageIndicator: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
   
  },
  pageIndicatorContent: {
    backgroundColor: '#3498db', // Cor de fundo como um marcador de texto
    borderRadius: 10,
    padding: 10,
  },
  pageIndicatorText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15
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

export default ProvaPage;
