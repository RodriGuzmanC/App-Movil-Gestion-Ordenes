import OrderDetailCreateScreen from '@/src/modules/pedidos/detalle/views/OrdenDetalleCrear';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

export default function crearDetalleVenta() {
    const { orden } = useLocalSearchParams<{
        orden: string,

    }>();
    return (
        <View style={{ flex: 1 }}>
            <OrderDetailCreateScreen orderId={parseInt(orden)} tipoOrden='salida' ></OrderDetailCreateScreen>
        </View>
    )
}
