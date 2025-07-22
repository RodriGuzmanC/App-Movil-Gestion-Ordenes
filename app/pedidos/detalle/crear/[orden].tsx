import OrderDetailCreateScreen from '@/src/modules/pedidos/detalle/views/OrdenDetalleCrear';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

export default function crearDetallePedido() {
    const { orden } = useLocalSearchParams<{
        orden: string
    }>();
    return (
        <View>
            <Text>Crear detalle</Text>
            <Text>{orden}</Text>
            <OrderDetailCreateScreen orderId={parseInt(orden)} ></OrderDetailCreateScreen>
        </View>
    )
}
