import { useProductoById } from '@/src/modules/productos/hooks/useProductos'
import { VariationWithRelations } from '@/src/shared/interfaces/VariationModel'
import React from 'react'
import { View } from 'react-native'
import { Button, Card, Text } from 'react-native-paper'

export default function ListaVariacionesFiltro(
    { 
        productoId, 
        handlerAgregarDePedido }:
        {
            productoId: number,
            handlerAgregarDePedido: (variacion: VariationWithRelations) => void
        }
) {
    const { productoById, cargando, error } = useProductoById(productoId)

    /*const handlerAgregarVariacion = (variacion: VariationWithRelations) => {
        setVariacionesSeleccionadas((prev: VariationWithRelations[]) => {
            // Verifica si la variación ya está seleccionada
            const existe = prev.some(v => v.id === variacion.id);
            if (existe) {
                // Si ya está, la elimina
                return prev.filter(v => v.id !== variacion.id);
            } else {
                // Si no está, la agrega
                return [...prev, variacion];
            }
        });

        setCantidades((prev: Cantidades[]) => {
            // Verifica si la variación ya está seleccionada
            const existe = prev.some(v => v.variacionId === variacion.id);
            if (existe) {
                // Si ya está, la elimina
                return prev.filter(v => v.variacionId !== variacion.id);
            } else {
                // Si no está, la agrega con su precio por defecto
                return [...prev, { variacionId: variacion.id, cantidad: 1 }];
            }
        });

        setPrecios((prev: Precios[]) => {

            const precioDefecto = tipoOrden === 'mayorista' ? variacion.precio_mayorista : variacion.precio_unitario

            // Verifica si la variación ya está seleccionada
            const existe = prev.some(v => v.variacionId === variacion.id);
            if (existe) {
                // Si ya está, la elimina
                return prev.filter(v => v.variacionId !== variacion.id);
            } else {
                // Si no está, la agrega
                return [...prev, { variacionId: variacion.id, precio: precioDefecto }];
            }
        });
    }*/

    return (
        <View >
            <Text variant="titleMedium">Variaciones Encontradas</Text>

            {productoById?.data.variaciones.map((variation) => (
                <Card key={variation.id}>
                    <Card.Content>
                        <Text variant="bodyMedium">Precio Unitario: S/{variation.precio_unitario}</Text>
                        <Text variant="bodyMedium">Precio Mayorista: S/{variation.precio_mayorista}</Text>
                        <Text variant="bodyMedium">Stock: {variation.stock}</Text>
                    </Card.Content>
                    <Card.Actions>
                        <Button mode="contained" onPress={() => handlerAgregarDePedido(variation)}>Agregar</Button>
                    </Card.Actions>
                </Card>
            ))}
        </View>
    )
}
