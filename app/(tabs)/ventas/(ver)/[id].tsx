import OrderDetailsList from '@/src/modules/pedidos/detalle/views/OrdenDetalleListar';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function detalleVenta() {
    const { id } = useLocalSearchParams();
    const parsedId = parseInt(Array.isArray(id) ? id[0] : id)

    return (
        <>

            <View style={styles.container}>
                <View style={styles.content}>
                    <OrderDetailsList orderId={parsedId} tipoPedido='salida' />
                </View>

                
            </View>
        </>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingBottom: 70, // espacio para que no tape el footer
    },
    
});