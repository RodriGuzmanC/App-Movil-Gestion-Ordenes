import { ListadoPedidos } from '@/src/modules/pedidos/views/OrdenListar'
import React from 'react'
import { View } from 'react-native'

export default function PedidosHome() {
  return (
    <View>
        <ListadoPedidos tipoPedido='entrada'></ListadoPedidos>
    </View>
  )
}
