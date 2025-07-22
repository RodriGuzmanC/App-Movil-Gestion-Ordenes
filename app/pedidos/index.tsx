import { ListadoPedidos } from '@/src/modules/pedidos/views/OrdenListar'
import React from 'react'
import { Text, View } from 'react-native'

export default function index() {
  return (
    <View>
        <Text>Listado de Pedidos</Text>
        <ListadoPedidos tipoPedido='entrada'></ListadoPedidos>
    </View>
  )
}
