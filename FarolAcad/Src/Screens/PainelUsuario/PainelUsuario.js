import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import CameraComponent from '../../Components/CameraComponent';

export default function PainelUsuario() {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <CameraComponent />
      </View>
      <Text>PainelUsuario</Text>
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
