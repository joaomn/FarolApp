import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import request from '../Servico/Request';
import Principal from '../Screens/login/Principal';
import CadastroUsuario from '../Screens/Cadastro.js/CadastroUsuario';
import LoginPage from '../Screens/login/LoginPage'
import PainelUsuario from '../Screens/PainelUsuario/PainelUsuario';
import CameraComponent from '../Components/CameraComponent';
import RecuperarSenha from '../Screens/login/RecuperarSenha';

const Stack = createStackNavigator();

const Rotas = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen options={{ headerTransparent: true,  headerTitle: ''}} name="Home" component={Principal} />
        <Stack.Screen options={{ headerTransparent: true,  headerTitle: '' }} name="Cadastro" component={CadastroUsuario} />
        <Stack.Screen options={{ headerTransparent: true,  headerTitle: ''}} name="Login" component={LoginPage} />
        <Stack.Screen options={{ headerTransparent: true,  headerTitle: ''}} name="PainelUsuario" component={PainelUsuario} />
        <Stack.Screen options={{ headerTransparent: true,  headerTitle: ''}} name="Camera" component={CameraComponent} />
        <Stack.Screen options={{ headerTransparent: true,  headerTitle: ''}} name="RecuperarSenha" component={RecuperarSenha} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Rotas;