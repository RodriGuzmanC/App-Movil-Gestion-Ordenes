import OrderDetailsList from '@/src/modules/pedidos/detalle/views/OrdenDetalleListar';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

export default function detallePedido() {
  const { id } = useLocalSearchParams();
  const parsedId = parseInt(Array.isArray(id) ? id[0] : id)
  
  return (
    <View>
        <Text>Detalle del Pedido</Text>
        <OrderDetailsList orderId={parsedId} ></OrderDetailsList>
    </View>
  )
}
