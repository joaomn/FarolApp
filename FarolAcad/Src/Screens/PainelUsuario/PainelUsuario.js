import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity,  FlatList} from 'react-native';
import CameraComponent from '../../Components/CameraComponent';
import request from '../../Servico/Request';
import { Button, Avatar, Card, Icon, IconButton} from 'react-native-paper';
import { useNavigation,  useFocusEffect } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';


export default function PainelUsuario({route}) {
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
      const [cardsData, setCardsData] = useState([]);
    async function carregarUsr (usrEmail){
        try {
            const getinfo = await request.get('usuario/email/' + usrEmail)
            .then(resp => {
               let usrData = resp.data;
               setUsr(usrData);
               const dadosDosCards = [
                { id: 1, title: 'Nome', subtitle: usrData.nome },
                { id: 2, title: 'Email', subtitle: usrData.email },
                {id: 3, title: 'CPF', subtitle: usrData.cpf},
                {id: 4, title :'Setor', subtitle: usrData.setor}
              ];
        
              setCardsData(dadosDosCards);
            })
            .catch(err =>{
                console.log(err);
            })
        } catch (error) {
        }
    }


    const renderItem = ({ item }) => (
      <Card style={styles.gridCard}>
        <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
      </Card>
    );    
  return (
    <SafeAreaProvider style={styles.container}>
    <View style={styles.containerFoto}>      
      <View style={styles.avatarContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('Camera', usr.id)}>
        {usr.foto && typeof usr.foto === 'string' ? (
          <>
            <Avatar.Image size={150} source={{ uri: usr.foto }} />
            <View style={styles.overlay}>
              <Text style={styles.overlayText}>Editar</Text>
            </View>
          </>
        ) : (
           <>
            <Avatar.Image size={150} source={{ uri: 'https://e7.pngegg.com/pngimages/626/838/png-clipart-computer-icons-avatar-user-profile-contact-heroes-silhouette.png'}} />
            <View style={styles.overlaySFoto}>
              <Text style={styles.overlayText}>Adicionar Foto</Text>
            </View>
          </>
        )}
      </TouchableOpacity>
      </View> 
      <View style={styles.rank}>
        <Text style={{ fontSize: 25 }}>
          {usr.rank}
        </Text>
        <Icon source='podium' size={80}/>
      </View>
    </View>
    <View style={styles.containerInfo}>
    <FlatList
          data={cardsData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}  // Certifique-se de ter uma chave única para cada item
          numColumns={1}  
        />
    </View>
    <View style={styles.buttons}>
        <Button icon="google-classroom" textColor='#000' compact={true} buttonColor='#6e99bf' mode="elevated" onPress={() => navigation.navigate('CursosPrincipal')}>
        Cursos
       </Button>
      <Button icon="file-certificate" textColor='#000' compact={true} buttonColor='#99BF6E'  mode="elevated" onPress={() => console.log('Pressed')}>
        Certificados
      </Button>
      <Button icon="account-edit" textColor='#000' compact={true} buttonColor='#BF956E' mode="elevated" onPress={() => navigation.navigate('EditarUsuario', usrEmail)}>
        Editar Perfil
       </Button>
    </View>
   

    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d4fcd7',
  },
  avatarContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: 'hidden',
    marginTop: 50,
    justifyContent: 'flex-start',
    alignContent:'center',
    
  },
  containerFoto: {
    flexDirection: 'row',
    justifyContent:  'space-between',
    alignItems: 'stretch',
    gap: 10,
    flex: 1,
    marginLeft: 10,
  },
  rank:{
    padding: 100,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'

  },
  containerInfo:{
    flex: 1,
    justifyContent: 'center',
    marginTop: -150,
    borderTopColor: '#078856',
    borderTopWidth: 4,
    paddingTop: 8,


  },
  gridCard: {
    width: '90%',  // Ajuste conforme necessário
    marginBottom: 10,
    justifyContent: 'center',
    alignItems:'flex-start',
    marginLeft: 20,
    backgroundColor: '#dbb509'
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#FFF',
    padding: 8,
    textTransform: 'uppercase',
    fontWeight: '900',
    
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingBottom: 5
  },
  overlaySFoto:{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 20

  },
  overlayText: {
    color: '#FFF', // Cor do texto do overlay
    fontSize: 15,
    
  },
  buttons:{
    felx: 1,
    marginBottom: 50,
    gap: 15,
    marginTop: -60,
    width:'90%',
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'column',
    marginLeft: 18
  }
});
