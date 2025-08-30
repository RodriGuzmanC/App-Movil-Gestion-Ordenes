import { ListadoPedidos } from '@/src/modules/pedidos/views/OrdenListar'
import React from 'react'
import { View } from 'react-native'

export default function VentasHome() {
  return (
    <View>
        <ListadoPedidos tipoPedido='salida'></ListadoPedidos>
    </View>
  )
}
