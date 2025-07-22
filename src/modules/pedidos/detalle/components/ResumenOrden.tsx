import { Order } from '@/src/shared/interfaces/OrderModel'
import { VariationWithRelations } from '@/src/shared/interfaces/VariationModel'
import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Button, Divider } from 'react-native-paper'
import { Cantidades, Precios } from '../schemas/OrdenDetalleSchema'
import TarjetaVariacionOrden from './TarjetaVariacionOrden'

interface Props {
    variacionesSeleccionadas: VariationWithRelations[]
    orderId: number
    tipoOrden: Order['tipo_pedido']
    cantidades: Cantidades[]
    precios: Precios[]
    registrarSubmit: (variacionId: number, submitFunction: () => void) => void
    modificarCantidad: (variacionId: number, nuevaCantidad: number) => void
    modificarPrecio: (variacionId: number, nuevoPrecio: number) => void
    handlerQuitarDePedido: (variacionId: number) => void
    submits: Record<number, () => void>
}


export default function ResumenOrden({
    variacionesSeleccionadas,
    orderId,
    tipoOrden,
    cantidades,
    precios,
    registrarSubmit,
    handlerQuitarDePedido,
    modificarCantidad,
    modificarPrecio,
    submits
}: Props) {


    const totalCantidad = cantidades.reduce((total, item) => total + item.cantidad, 0)

    const totalSoles = precios.reduce((total, itemPrecios) => {
        const cantidadInd = cantidades.find(itemCantidad => itemCantidad.variacionId === itemPrecios.variacionId)

        const subtotal = (cantidadInd?.cantidad ?? 0) * itemPrecios.precio;

        return +(total + subtotal).toFixed(2);  // Redondea después de cada suma
    }, 0)

    const handleCrearPedido = () => {
        Object.values(submits).forEach(submit => submit())
    }

    return (
        <View style={styles.container}>
            <ScrollView style={{ flex: 1 }}>

                {variacionesSeleccionadas.map((variacion) => (
                    <TarjetaVariacionOrden
                        key={variacion.id}
                        orderId={orderId}
                        variacion={variacion}
                        tipoOrden={tipoOrden}
                        registrarSubmit={registrarSubmit}
                        handlerQuitarDePedido={handlerQuitarDePedido}
                        modificarCantidad={modificarCantidad}
                        modificarPrecio={modificarPrecio}
                    ></TarjetaVariacionOrden>
                ))}
            </ScrollView>

            {/* Footer - Totales */}
            <Divider />
            <View style={styles.footer}>
                <Text style={styles.totalText}>Total: {totalCantidad} unidades</Text>
                <Text style={styles.totalText}>Monto: S/ {totalSoles}</Text>
            </View>

            <Button
                mode='contained-tonal'
                disabled={Object.keys(submits).length === 0}
                onPress={handleCrearPedido}
            >Crear</Button>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
        margin: 8,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 6,
    },
    label: {
        width: 80,
        fontWeight: 'bold',
    },
    input: {
        flex: 1,
        marginHorizontal: 8,
        backgroundColor: 'white',
    },
    footer: {
        padding: 12,
        backgroundColor: '#f2f2f2',
        flexDirection: 'column',
        alignItems: 'center',
    },
    totalText: {
        fontSize: 16,
        fontWeight: '600',
        marginVertical: 4,
    },
})
