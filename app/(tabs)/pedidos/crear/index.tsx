import { CrearOrdenScreen } from '@/src/modules/pedidos/views/OrdenCrearForm'
import React from 'react'
import { View } from 'react-native'

export default function index() {
  return (
    <View>
        <CrearOrdenScreen tipoPedido='entrada'></CrearOrdenScreen>
    </View>
  )
}
