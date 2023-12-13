import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const PerguntaComponente = ({ pergunta, onResponder }) => {
  return (
    <View>
      <Text>Pergunta: {pergunta.titulo}</Text>
      {pergunta.alternativas.map((alternativa, index) => (
        <Text key={index + 1}>{`Opção ${index + 1}: ${alternativa}`}</Text>
      ))}
      {pergunta.tipo === 'input' && (
        <>
          <TextInput placeholder="Resposta" />
          <Button title="Responder" onPress={onResponder} />
        </>
      )}
    </View>
  );
};

export default PerguntaComponente;