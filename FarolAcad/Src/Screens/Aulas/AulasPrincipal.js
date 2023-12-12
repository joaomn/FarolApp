import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function AulasPrincipal({route}) {
    const cursoID = route.params;
  return (
    <View style={{flex:1, justifyContent:'center', alignContent: 'center'}}>
      <Text>AulasPrincipal  {cursoID}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})