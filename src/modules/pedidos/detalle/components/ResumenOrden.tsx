import { Order } from '@/src/shared/interfaces/OrderModel'
import { Product } from '@/src/shared/interfaces/ProductModel'
import { VariationWithRelations } from '@/src/shared/interfaces/VariationModel'
import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { Text as PaperText } from 'react-native-paper'
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
    productos: Product[]
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
    submits,
    productos
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
        <>
            <PaperText variant="titleLarge" style={{ marginTop: 16 }}>Resumen de Pedido</PaperText>

            <ScrollView style={{ flex: 1, display: 'flex', flexDirection: 'column', marginVertical: 8, paddingVertical: 8 }}>


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
                        nombreProducto={productos.find(p => p.id === variacion.producto_id)?.nombre_producto ?? 'No encontrado, error'}
                        imagenProducto={productos.find(p => p.id === variacion.producto_id)?.url_imagen ?? 'No encontrado, error'}
                    ></TarjetaVariacionOrden>
                ))}


            </ScrollView >
        </>
    )
}

const styles = StyleSheet.create({

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
    },
    footer: {
        padding: 12,
        flexDirection: 'column',
        alignItems: 'center',
    },
    totalText: {
        fontSize: 16,
        fontWeight: '600',
        marginVertical: 4,
    },

})
