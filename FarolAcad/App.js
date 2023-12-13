import CadastroUsuario from "./Src/Screens/Cadastro.js/CadastroUsuario";
import Principal from "./Src/Screens/login/Principal";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Rotas from './Src/Rotas/Rotas'
import PainelUsuario from "./Src/Screens/PainelUsuario/PainelUsuario";
import CameraComponent from "./Src/Components/CameraComponent";
import { StatusBar } from "react-native";
import ProvaPage from "./Src/Screens/Provas/Porvapage";





export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar />

      <Rotas />


    </SafeAreaProvider>
    
    
   
  );
}


