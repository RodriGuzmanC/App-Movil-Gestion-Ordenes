import { Order } from '@/src/shared/interfaces/OrderModel'
import { VariationWithRelations } from '@/src/shared/interfaces/VariationModel'
import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Card, HelperText, TextInput } from 'react-native-paper'
import { useDetalleOrdenCrearForm } from '../hooks/useForms'
import { TipoModificador } from '../schemas/OrdenDetalleSchema'



export default function TarjetaVariacionOrden(
    {
        orderId,
        variacion,
        tipoOrden,
        registrarSubmit,
        handlerQuitarDePedido,
        modificarCantidad,
        modificarPrecio,
    }:
        {
            orderId: number,
            variacion: VariationWithRelations,
            tipoOrden: Order['tipo_pedido'],
            registrarSubmit: (variacionId: number, submitFunction: () => void) => void
            modificarCantidad: (variacionId: number, nuevaCantidad: number) => void
            modificarPrecio: (variacionId: number, nuevoPrecio: number) => void
            handlerQuitarDePedido: (variacionId: number) => void
        }) {

    const { errors, enProceso, handleSubmit, handleChange, values, touched } = useDetalleOrdenCrearForm(orderId, variacion, tipoOrden)


    const modificarCantidadHandler = (val: string) => {
        handleChange("cantidad")(val)
        modificarCantidad(variacion.id, parseInt(val))
    }

    const modificarPrecioHandler = (val: string) => {
        handleChange("precio_rebajado")(val)
        modificarPrecio(variacion.id, parseFloat(val))
    }


    const sumarRestarCantidad = (tipo: TipoModificador['nombre']) => {
        const cantidad = parseInt(values.cantidad.toString())
        const nuevaCantidad = tipo === 'aumentar' ? Math.max(1, cantidad + 1) : Math.max(1, cantidad - 1);
        // Actualiza formik
        handleChange("cantidad")(nuevaCantidad.toString());
        // Actualiza el estado global
        modificarCantidad(variacion.id, nuevaCantidad)

    };

    const sumarRestarPrecio = (tipo: TipoModificador['nombre']) => {
        const precio_rebajado = parseFloat(values.precio_rebajado.toString())
        const nuevoPrecio = tipo === 'aumentar' ? Math.max(0.5, precio_rebajado + 0.5) : Math.max(0.5, precio_rebajado - 0.5);
        // Actualiza formik
        handleChange("precio_rebajado")(nuevoPrecio.toString());
        // Actualiza el estado global
        modificarPrecio(variacion.id, nuevoPrecio)

    };

    useEffect(() => {
        registrarSubmit(variacion.id, handleSubmit)
    }, [])


    return (
        <Card key={orderId} style={styles.card}>
            <Button mode='outlined' onPress={() => handlerQuitarDePedido(variacion.id)} >Quitar</Button>

            <Card.Content>
                {/* Cantidad */}
                <View style={styles.row}>
                    <Text style={styles.label}>Cantidad:</Text>
                    <Button mode="outlined" onPress={() => sumarRestarCantidad("disminuir")} compact>-</Button>
                    <TextInput
                        value={values.cantidad.toString()}
                        onChangeText={modificarCantidadHandler}
                        keyboardType="numeric"
                        style={styles.input}
                    />
                    <Button mode="outlined" onPress={() => sumarRestarCantidad("aumentar")} compact>+</Button>

                    <HelperText type="error" visible={!!errors.cantidad && touched.cantidad}>
                        {errors.cantidad}
                    </HelperText>
                </View>

                {/* Precio */}
                <View style={styles.row}>
                    <Text style={styles.label}>Precio (S/):</Text>
                    <Button mode="outlined" onPress={() => sumarRestarPrecio("disminuir")} compact>-</Button>
                    <TextInput
                        value={values.precio_rebajado.toString()}
                        onChangeText={modificarPrecioHandler}
                        keyboardType="numeric"
                        style={styles.input}
                    />
                    <Button mode="outlined" onPress={() => sumarRestarPrecio("aumentar")} compact>+</Button>

                    <HelperText type="error" visible={!!errors.precio_rebajado && touched.precio_rebajado}>
                        {errors.precio_rebajado}
                    </HelperText>
                </View>
            </Card.Content>
        </Card>
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