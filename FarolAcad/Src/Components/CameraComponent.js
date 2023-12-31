import React, { useState, useRef } from 'react';
import { Camera } from 'expo-camera';
import { View, Text, TouchableOpacity, StyleSheet, Button, Image } from 'react-native';
import { Icon } from 'react-native-paper';
import  axios  from 'axios';
import request from '../Servico/Request';



export default function CameraComponent({route}) {
    const usrID = route.params;
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [photo, setPhoto] = useState(null);
  const [showSaveButton, setShowSaveButton] = useState(false); // Novo estado para controlar a visibilidade do botão
  const cameraRef = useRef(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>É preciso que voce permita que a plataforma
        use sua camera, não se preocupe ela só será usada durante o uso do aplicativo.</Text>
        <Button onPress={requestPermission} title="Concender Permissão" />
      </View>
    );
  }

  async function takePicture() {
    if (cameraRef.current) {
      const { uri } = await cameraRef.current.takePictureAsync();
      setPhoto(uri);
      setShowSaveButton(true); // Mostrar o botão de salvar após tirar a foto
    }
  }

  function toggleCameraType() {
    setType((current) =>
      current === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  }

  function resetPhoto() {
    setPhoto(null);
    setShowSaveButton(false); // Esconder o botão de salvar ao redefinir a foto
  }

  async function savePhoto() {
    
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: photo,
        type: 'image/jpeg',
        name: 'photo.jpg',
      });
  
      const response = await axios.post('https://api.cloudinary.com/v1_1/dbpsqttrs/image/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        params: {
          upload_preset: 'ml_default', 
        },
      }).then(resp =>{
        const imageUrl = resp.data.url;
        try{
            const uploadusr =  request.put(`usuario/${usrID}`, {
                foto: imageUrl,
              })
            .then(foi =>{
              alert("Foto Alterada Com sucesso")
              
            })
            .catch(e=>{
            })

        }catch{
            console.warn("nem chegou a tenter mudar user");

        }

      })
      
  
      
      
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        {!photo ? (
          <Camera ref={cameraRef} style={styles.camera} type={type} />
        ) : (
          <View style={styles.previewContainer}>
            <Image source={{ uri: photo }} style={styles.previewImage} />
          </View>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Icon
            source="camera-front-variant"
            color={'#FFF'}
            size={25}
             />
          <Text style={styles.text}>Alterar Câmera</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={takePicture}>
        <Icon
            source="camera-enhance"
            color={'#FFF'}
            size={25}
             />
          <Text style={styles.text}>Capturar!</Text>
        </TouchableOpacity>
        {showSaveButton && (
          <TouchableOpacity style={styles.button} onPress={savePhoto}>
             <Icon
            source="camera"
            color={'#FFF'}
            size={25}
             />
            <Text style={styles.text}>Definir foto de Perfil</Text>
          </TouchableOpacity>
        )}
        {photo && (
          <TouchableOpacity style={styles.button} onPress={resetPhoto}>
             <Icon
            source="camera-retake"
            color={'#FFF'}
            size={25}
             />
            <Text style={styles.text}>Capturar novamente</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  cameraContainer: {
    width: '95%',
    aspectRatio: 1,
    overflow: 'hidden',
    flex: 0,
    borderRadius:105,
    borderColor: '#078856',
    borderWidth: 5
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#078856',
    padding: 10,
    borderRadius: 75,
    flexDirection: 'row',
    gap: 5,
    
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  previewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
});