import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import PagerView from 'react-native-pager-view';
import request from '../../Servico/Request';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator, Snackbar } from 'react-native-paper';

const CertificadoPrincipal = ({ route }) => {
  const userDI = route.params;
  const navigation = useNavigation();
  const [certificados, setcertificados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const onDismissSnackBar = () => setVisible(false);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const response = await request.get(`certificado/usuario/${userDI}`);
        const data = response.data;
        setcertificados(data);
        // Agora, configure um temporizador para exibir o Snackbar após 3 segundos
        setTimeout(() => {
          onToggleSnackBar();
        }, 3000);
      } catch (error) {
        console.error('Erro ao obter dados da API:', error);
      }
    };

    fetchDataFromApi();
  }, []);

  const enviarCertificado = async (id) => {
    try {
      setLoading(true);
      const response = await request.post(`certificado/entrega/${id}`);
      alert('O certificado foi entregue com sucesso!');
      navigation.navigate('PainelUsuario', userDI);
    } catch (error) {
      console.error('Erro ao obter dados da API:', error);
    } finally {
      setLoading(false);
    }
  };

  const onToggleSnackBar = () => setVisible(!visible);

  return (
    <View style={{ flex: 1 }}>
      <PagerView style={styles.viewPager} >
        {certificados.map((course, index) => (
          <View style={styles.page} key={index.toString()}>
            <Image
              source={{
                uri: 'https://static.vecteezy.com/system/resources/previews/014/585/856/original/certificate-luxury-golden-medal-png.png',
              }}
              style={styles.courseImage}
            />
            <View style={styles.card}>
              {loading && (
                <ActivityIndicator
                  animating={true}
                  color="#078856"
                  style={{ margin: 20 }}
                  size="70"
                />
              )}
              <TouchableOpacity onPress={() => enviarCertificado(course.id)}>
                <Text style={styles.courseTitle}>{course.curso.nome}</Text>
              </TouchableOpacity>
              <View style={styles.bottomRow}>
                <Text style={styles.courseArea} numberOfLines={1} ellipsizeMode="tail">
                  Data de Emissão: {course.dataEmissao}
                </Text>
                <Text style={styles.courseHours} numberOfLines={1} ellipsizeMode="tail">
                  {' '}
                  Nota: {course.nota}
                </Text>
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
    backgroundColor: '#d4fcd7',
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  courseImage: {
    width: '100%',
    height: 350,
    resizeMode: 'contain',
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
    position: 'absolute',
  },
  courseTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  bottomRow: {
    flexDirection: 'column',
    alignItems: 'flex-start', // Alinha os itens à esquerda
    marginTop: 8,
  },
  courseArea: {
    fontSize: 16,
    fontWeight: '500',
  },
  courseHours: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default CertificadoPrincipal;
