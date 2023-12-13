import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text , Image, TouchableOpacity} from 'react-native';
import PagerView from 'react-native-pager-view';
import request from '../../Servico/Request';
import { useNavigation } from '@react-navigation/native';


const CursosPrincipal = () => {
    const navigation = useNavigation();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Função assíncrona para buscar dados da API
    const fetchDataFromApi = async () => {
      try {
        const response = await request.get('curso'); // Substitua pela URL real da sua API
        const data = response.data;

        setCourses(data);
      } catch (error) {
        console.error('Erro ao obter dados da API:', error);
      }
    };

    fetchDataFromApi();
  }, []); // Executa apenas uma vez ao montar o componente

  return (
    <View style={{ flex: 1 }}>
      <PagerView style={styles.viewPager} initialPage={0}>
        {courses.map((course, index) => (
          <View style={styles.page} key={index.toString()}>
            <Image source={{ uri: course.foto }} style={styles.courseImage} />
            <View style={styles.card}>
              <TouchableOpacity onPress={() => navigation.navigate('AulasPrincipal', course.id)}>
                <Text style={styles.courseTitle}>{course.nome}</Text>
              </TouchableOpacity>
              <Text style={styles.courseDescription}>{course.descricao}</Text>
              <View style={styles.bottomRow}>
                <Text style={styles.courseArea} numberOfLines={1} ellipsizeMode="tail">Área: {course.area}</Text>
                <Text style={styles.courseHours} numberOfLines={1} ellipsizeMode="tail"> Carga Horaria: {course.cargaHoraria}</Text>
              </View>
            </View>
          </View>
        ))}
      </PagerView>
    </View>
  );
};

const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
    backgroundColor: '#d4fcd7'
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  courseImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginTop: -40,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  },
  courseTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 8,
    textTransform: 'uppercase'
  },
  courseDescription: {
    fontSize: 16,
    marginBottom: 8,
  },
  bottomRow: {
    flexDirection: 'column',
    alignItems: 'flex-start', // Alinha os itens à esquerda
    marginTop: 8,
  },
  courseArea: {
    fontSize: 16,
    fontWeight:'500'
    
  },
  courseHours: {
    fontSize: 16,
    fontWeight:'500'
  },
});


export default CursosPrincipal;
