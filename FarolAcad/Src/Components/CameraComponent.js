import React, { useState, useRef } from 'react';
import { Camera } from 'expo-camera';
import { View, Text, TouchableOpacity, StyleSheet, Button, Image } from 'react-native';

export default function CameraComponent() {
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
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
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

  function savePhoto() {
    // Lógica para enviar a foto para o Cloudinary
    // Substitua este trecho com a lógica real de envio para o Cloudinary
    console.log('Salvando foto:', photo);
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
          <Text style={styles.text}>Alterar Câmera</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={takePicture}>
          <Text style={styles.text}>Capturar!</Text>
        </TouchableOpacity>
        {showSaveButton && (
          <TouchableOpacity style={styles.button} onPress={savePhoto}>
            <Text style={styles.text}>Definir foto de Perfil</Text>
          </TouchableOpacity>
        )}
        {photo && (
          <TouchableOpacity style={styles.button} onPress={resetPhoto}>
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
  },
  cameraContainer: {
    width: '100%',
    aspectRatio: 1,
    overflow: 'hidden',
    flex: 0,
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
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 5,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
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