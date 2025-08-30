import { Order } from '@/src/shared/interfaces/OrderModel'
import { VariationWithRelations } from '@/src/shared/interfaces/VariationModel'
import { Image } from 'expo-image'
import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Card, Chip, HelperText, TextInput } from 'react-native-paper'
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
        nombreProducto,
        imagenProducto
    }:
        {
            orderId: number,
            variacion: VariationWithRelations,
            tipoOrden: Order['tipo_pedido'],
            registrarSubmit: (variacionId: number, submitFunction: () => void) => void
            modificarCantidad: (variacionId: number, nuevaCantidad: number) => void
            modificarPrecio: (variacionId: number, nuevoPrecio: number) => void
            handlerQuitarDePedido: (variacionId: number) => void
            nombreProducto: string
            imagenProducto: string
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
            <Card.Title
                title={`Variación N° ${variacion.id}`}

                right={(props) => (
                    <Button
                        mode="contained"
                        onPress={() => handlerQuitarDePedido(variacion.id)}
                        compact
                        style={styles.quitarBtn}
                    >
                        Quitar
                    </Button>
                )}
            />
            <Card.Content style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <View style={styles.atributosContainer}>
                    {variacion.variaciones_atributos.map((varAttr, index) => (
                        <Chip
                            key={index}
                            compact
                        >
                            {varAttr.atributos?.tipos_atributos.nombre}: {varAttr.atributos?.valor}
                        </Chip>
                    ))}
                </View>
                {/* Imagen + Atributos */}
                <View style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 8 }}>
                    <View style={styles.topRow}>
                        <Image
                            source={{ uri: imagenProducto }}
                            style={styles.productImage}
                        />
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{nombreProducto}</Text>
                    </View>

                    <View style={{ display: 'flex', flexDirection: 'row'}}>
                        {/* Cantidad */}
                        <View style={styles.row}>
                            <Text style={styles.label}>Cantidad:</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                                <Button mode='contained-tonal' onPress={() => sumarRestarCantidad("disminuir")} compact>-</Button>
                                <TextInput
                                    value={values.cantidad.toString()}
                                    onChangeText={modificarCantidadHandler}
                                    keyboardType="numeric"
                                    style={styles.input}
                                    mode="outlined"
                                />
                                <Button mode='contained-tonal' onPress={() => sumarRestarCantidad("aumentar")} compact>+</Button>
                            </View>
                        </View>
                        <HelperText type="error" visible={!!errors.cantidad && touched.cantidad}>
                            {errors.cantidad}
                        </HelperText>

                        {/* Precio */}
                        <View style={styles.row}>
                            <Text style={styles.label}>Precio (S/):</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                                <Button mode='contained-tonal' onPress={() => sumarRestarPrecio("disminuir")} compact>-</Button>
                                <TextInput
                                    value={values.precio_rebajado.toString()}
                                    onChangeText={modificarPrecioHandler}
                                    keyboardType="numeric"
                                    style={styles.input}
                                    mode="outlined"
                                />
                                <Button mode='contained-tonal' onPress={() => sumarRestarPrecio("aumentar")} compact>+</Button>
                            </View>
                        </View>
                        <HelperText type="error" visible={!!errors.precio_rebajado && touched.precio_rebajado}>
                            {errors.precio_rebajado}
                        </HelperText>
                    </View>
                </View>
            </Card.Content>
        </Card>
    )
}


const styles = StyleSheet.create({
    card: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 10,
    },
    quitarBtn: {
        marginTop: 4,
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    productImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 12,
    },
    atributosContainer: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        gap: 6,
        fontSize: 12
    },
    chip: {
        marginRight: 6,
        marginBottom: 6,
    },
    row: {
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8
    },
    label: {
        width: 80,
        fontWeight: 'bold',
    },
    input: {
        width: 60
    },
});