import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Principal from '../Screens/login/Principal';
import CadastroUsuario from '../Screens/Cadastro.js/CadastroUsuario';
import LoginPage from '../Screens/login/LoginPage'
import PainelUsuario from '../Screens/PainelUsuario/PainelUsuario';
import CameraComponent from '../Components/CameraComponent';
import RecuperarSenha from '../Screens/login/RecuperarSenha';
import EditarUsuario from '../Screens/Cadastro.js/EditarUsuario';
import CursosPrincipal from '../Screens/Cursos/CursosPrincipal';
import AulasPrincipal from '../Screens/Aulas/AulasPrincipal';
import AulaPagina from '../Screens/Aulas/AulaPagina';
import Porvapage from '../Screens/Provas/Porvapage';
import CertificadoPrincipal from '../Screens/Certificado/CertificadoPrincipal';





const Stack = createStackNavigator();

const Rotas = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen options={{ headerTransparent: true,  headerTitle: ''}} name="Home" component={Principal} />
        <Stack.Screen options={{ headerTransparent: true,  headerTitle: '' }} name="Cadastro" component={CadastroUsuario} />
        <Stack.Screen options={{ headerTransparent: true,  headerTitle: ''}} name="Login" component={LoginPage} />
        <Stack.Screen options={{ headerTransparent: true,  headerTitle: ''}} name="PainelUsuario" component={PainelUsuario} />
        <Stack.Screen options={{headerTitle: 'Camera', headerStyle:{backgroundColor: '#078856'}}} name="Camera" component={CameraComponent} />
        <Stack.Screen options={{ headerTransparent: true,  headerTitle: ''}} name="RecuperarSenha" component={RecuperarSenha} />
        <Stack.Screen options={{ headerTransparent: true,  headerTitle: ''}} name="EditarUsuario" component={EditarUsuario} />
        <Stack.Screen options={{headerTitle: 'Cursos', headerStyle:{backgroundColor: '#078856'}}} 
        name="CursosPrincipal" component={CursosPrincipal} />
        <Stack.Screen options={{headerTitle: 'Aulas', headerStyle:{backgroundColor: '#078856'}}} 
        name="AulasPrincipal" component={AulasPrincipal} />
        <Stack.Screen options={{headerTitle: 'Aula', headerStyle:{backgroundColor: '#078856'}}} name="AulaPage" component={AulaPagina} />
        <Stack.Screen  options={{headerTitle: 'Prova', headerStyle:{backgroundColor: '#078856'}}} name="PaginaDeProva" component={Porvapage} />
        <Stack.Screen options={{headerTitle: 'Certificados', headerStyle:{backgroundColor: '#078856'}}} 
        name="CertificadoPrincipal" component={CertificadoPrincipal} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Rotas;