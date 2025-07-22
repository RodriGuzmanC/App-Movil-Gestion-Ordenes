import { CrearOrdenScreen } from '@/src/modules/pedidos/views/OrdenCrearForm'
import React from 'react'
import { Text, View } from 'react-native'

export default function index() {
  return (
    <View>
        <Text>Crear</Text>
        <CrearOrdenScreen tipoPedido='entrada'></CrearOrdenScreen>
    </View>
  )
}
