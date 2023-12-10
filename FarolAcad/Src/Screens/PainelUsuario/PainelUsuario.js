import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import CameraComponent from '../../Components/CameraComponent';
import request from '../../Servico/Request';
import { Button, Avatar} from 'react-native-paper';
import { useNavigation,  useFocusEffect } from '@react-navigation/native';


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

    
  return (
    <View style={styles.container}>      
      <View style={styles.avatarContainer}>
        {usr.foto && typeof usr.foto === 'string' && (
          <Avatar.Image size={150} source={{ uri: usr.foto }} />
        )}
      </View>
      
      <Button  mode="contained" onPress={() => navigation.navigate('Camera', usr.id)}>
    Press me
  </Button>
      <Text>PainelUsuario recebeu o email {usr.nome}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#baf7ca',
  },
  avatarContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: 'hidden',
    marginTop: 20,
  },
});
