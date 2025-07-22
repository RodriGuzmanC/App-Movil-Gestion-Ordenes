import ClienteListScreen from '@/src/modules/clientes/views/ClienteListar'
import React from 'react'
import { Text, View } from 'react-native'

export default function index() {
  return (
    <View>
        <Text>Clientes</Text>
        <ClienteListScreen></ClienteListScreen>
    </View>
  )
}
