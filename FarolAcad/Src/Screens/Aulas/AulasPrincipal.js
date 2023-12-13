import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Button } from 'react-native';
import request from '../../Servico/Request';


export default function AulasPrincipal({ route, navigation }) {
  const cursoID = route.params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await request.get(`/curso/cursos/aulas/${cursoID}`);
        const apiData = response.data;
  
        setAulas(apiData);
      } catch (error) {
        console.error('Erro ao obter dados da API:', error);
      }
    };
    const fetchCurso = async () => {
        try {
          const response = await request.get(`/curso/${cursoID}`);
          const apicurso = response.data;
    
          setCursoo(apicurso);
        } catch (error) {
          console.error('Erro ao obter dados da API:', error);
        }
      };
  
    fetchData();
    fetchCurso();
  }, [cursoID]);
 

  const [aulas, setAulas] = useState([]);
  const [cursoo, setCursoo] = useState([]);

 

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => openAula(item.link)}>
      <View style={styles.aulaCard}>
        <Text style={styles.aulaNome}>{item.titulo}</Text>
      </View>
    </TouchableOpacity>
  );

  const openAula = (link) => {
    // Implemente a lógica para abrir o link do YouTube ou navegar para outra tela, se necessário
    console.log('Abrindo aula:', link);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.cursoTitle}>Aulas de {cursoo.nome}</Text>
      <FlatList
        data={aulas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => openAula(item.link)}
            style={styles.aulaCard}
          >
            <Text style={styles.aulaNome}>{item.titulo}</Text>
          </TouchableOpacity>
        )}
      />
      {aulas.length > 0 && (
        <TouchableOpacity
          style={styles.botaoProva}
          onPress={() => navigation.navigate('PaginaDeProva')}
          disabled={aulas.length === 0 || aulas.length - 1 !== aulas.length - 1}
        >
          <Text style={styles.botaoTexto}>Ir para a Prova</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d4fcd7',
  },
  cursoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textTransform: 'uppercase',
    marginTop: 10,
    width: '95%',
    marginLeft: 5,
  },
  aulaCard: {
    backgroundColor: '#dbb509',
    borderRadius: 10,
    padding: 20,
    marginVertical: 15,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 15,
    marginLeft: 15
  },
  aulaNome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    textTransform: 'uppercase',
  },
  botaoProva: {
    marginBottom: 50,
    width: '90%',
    backgroundColor: '#094fdb',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  botaoTexto: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
});