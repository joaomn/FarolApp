import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import PagerView from 'react-native-pager-view';
import request from '../../Servico/Request';
import { TextInput } from 'react-native-paper';

const ProvaPage = ({ route }) => {
  const cursoID = 3;

  const [prova, setProva] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [texto, setTexto] = useState('');

  const { control, handleSubmit, formState: {errors}} = useForm({
});


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await request.get(`/prova/curso/${cursoID}`);
        const apiData = response.data;
        setProva(apiData);
      } catch (error) {
        console.error('Erro ao obter dados da API:', error);
      }
    };
    fetchData();

    const delay = 2000;
    const timeoutId = setTimeout(() => {
        // Código a ser executado após o atraso
        setTexto('Arraste para o lado para ver as proximas perguntas');
      }, delay);
  }, [cursoID]);

  const onNextPage = () => {
    if (currentPage < prova.perguntas.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const onPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const onSubmit = (data) => {
    // Faça o que quiser com os dados do formulário aqui
    console.log('Dados do formulário:', data);
    onNextPage(); // Avança para a próxima pergunta após enviar respostas
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
    <Text style={styles.questionText}>{pergunta.titulo}</Text>

    <View style={styles.cardContainer}>
    {pergunta.alternativa.map((alternativa) => (
  <Controller
    key={alternativa.id}
    control={control}
    name={`respostas[${index}]`}
    defaultValue=""
    render={({ field }) => (
      <TouchableOpacity
        onPress={() => {
          // Se a alternativa já estiver selecionada, desmarque-a
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

        {/* Adiciona um campo de controle para as respostas */}
        <Controller
          control={control}
          name='respostas'
          defaultValue={[]}
          render={({field: {value}}) => (
            <Button title="Enviar Respostas" onPress={handleSubmit(onSubmit)} disabled={!value || value.length === 0} />
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
  },
});

export default ProvaPage;
