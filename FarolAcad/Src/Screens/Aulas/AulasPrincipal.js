import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Button } from 'react-native';
import request from '../../Servico/Request';
import { useNavigation } from '@react-navigation/native';
import { Checkbox } from 'react-native-paper';


export default function AulasPrincipal({ route }) {
  const cursoID = route.params;
  const navigation = useNavigation();
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
  const [checked, setChecked] = React.useState(false);

 

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('AulaPage', item.id)}>
      <View style={styles.aulaCard}>
        <Text style={styles.aulaNome}>{item.titulo}</Text>
      </View>
    </TouchableOpacity>
  );

  

  return (
    <View style={styles.container}>
    <Text style={styles.cursoTitle}>Aulas de {cursoo.nome}</Text>
    <FlatList
      data={aulas}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate('AulaPage', item.id)}
          style={styles.aulaCard}
        >
          <Text style={styles.aulaNome}>{item.titulo}</Text>
        </TouchableOpacity>
      )}
    />

    <View style={styles.checkboxContainer}>
      <Checkbox
        color='#078856'
        status={checked ? 'checked' : 'unchecked'}
        onPress={() => {
          setChecked(!checked);
        }}
      />
      <Text style={styles.checkboxLabel}>Declaro que assisti todas as aulas</Text>
    </View>

    {aulas.length > 0 && (
      <TouchableOpacity
        style={[styles.botaoProva, { backgroundColor: checked ? '#094fdb' : '#999' }]}
        onPress={() => navigation.navigate('PaginaDeProva', cursoID)}
        disabled={!checked}
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
    zIndex: 20
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
    zIndex: 9999
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: '#3d3a3a',
    fontWeight: 'bold'
  },
});