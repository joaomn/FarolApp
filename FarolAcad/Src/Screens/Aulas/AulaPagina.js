import React , { useState, useEffect }from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import request from '../../Servico/Request';


const AulaPagina = ({route}) => {


  const aulaID = route.params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await request.get(`/aula/${aulaID}`);
        const apiData = response.data;
  
        setAula(apiData);
      } catch (error) {
        console.error('Erro ao obter dados da API:', error);
      }
    };
   
  
    fetchData();
  }, [aulaID]);
  const [aula, setAula] = useState([]);


  

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: aula.url }}
        style={styles.webview}
        allowsFullscreenVideo
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default AulaPagina;