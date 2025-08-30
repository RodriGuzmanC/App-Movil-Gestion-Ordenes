import OrderDetailCreateScreen from '@/src/modules/pedidos/detalle/views/OrdenDetalleCrear';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

export default function crearDetallePedido() {
    const { orden } = useLocalSearchParams<{
        orden: string,

    }>();
    return (
        <View style={{ flex: 1 }}>
            <OrderDetailCreateScreen orderId={parseInt(orden)} tipoOrden='entrada' ></OrderDetailCreateScreen>
        </View>
    )
}
