import { useProductoById } from '@/src/modules/productos/hooks/useProductos'
import { ErrorItemsComponent, LoadingComponent, NoItemsComponent } from '@/src/shared/components/StatusComponents'
import { Product } from '@/src/shared/interfaces/ProductModel'
import { VariationWithRelations } from '@/src/shared/interfaces/VariationModel'
import { Image } from 'expo-image'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Card, Chip, Text } from 'react-native-paper'

export default function ListaVariacionesFiltro(
    {
        productoId,
        handlerAgregarDePedido,
        productos
    }:
        {
            productoId: number,
            handlerAgregarDePedido: (variacion: VariationWithRelations) => void
            productos: Product[]
        }
) {
    const { productoById, cargando, error } = useProductoById(productoId)

    if (cargando) return <LoadingComponent></LoadingComponent>
    if (productoById == undefined || !productoById.data) return <NoItemsComponent />
    if (error) return <ErrorItemsComponent></ErrorItemsComponent>

    return (
        <View style={{ gap: 16, marginTop: 16 }}>
            <Text variant="titleMedium">Variaciones Encontradas</Text>

            {productoById?.data.variaciones.map((variation) => (

                <Card key={variation.id} style={styles.variationCard}>
                    <Card.Title title={`Variación #${variation.id}`} />

                    <Card.Content style={styles.content}>
                        <View style={{ flexDirection: 'row', gap: 16 }}>
                            <Image
                                source={{ uri: productos.find(p => p.id === variation.producto_id)?.url_imagen }}
                                style={styles.image}
                                contentFit='cover'
                            />

                            <View style={styles.details}>
                                <Text variant="titleMedium" style={styles.productName}>
                                    {productos.find(p => p.id === variation.producto_id)?.nombre_producto}
                                </Text>

                                <Text variant="bodyMedium">Precio Unitario: S/{variation.precio_unitario}</Text>
                                <Text variant="bodyMedium">Precio Mayorista: S/{variation.precio_mayorista}</Text>
                                <Text variant="bodyMedium">Stock: {variation.stock}</Text>


                            </View>
                        </View>
                        <View style={styles.chipsContainer}>
                            {variation.variaciones_atributos.map((varAtr, index) => (
                                <Chip key={index} style={styles.chip} icon="tag">
                                    {varAtr.atributos?.tipos_atributos.nombre} : {varAtr.atributos?.valor}
                                </Chip>
                            ))}
                        </View>
                    </Card.Content>

                    <Card.Actions style={styles.actions}>
                        <Button mode="contained" onPress={() => handlerAgregarDePedido(variation)}>
                            Agregar
                        </Button>
                    </Card.Actions>
                </Card>
            ))}
        </View>
    )
}


const styles = StyleSheet.create({
    variationCard: {
        marginVertical: 10,
        borderRadius: 10,
        elevation: 2,
    },
    content: {
        flexDirection: 'column',
        gap: 16,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 8,
        backgroundColor: '#eee',
    },
    details: {
        flex: 1,
    },
    productName: {
        marginBottom: 4,
        fontWeight: 'bold',
    },
    chipsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 8,
        gap: 6,
    },
    chip: {
        marginRight: 6,
        marginBottom: 6,
    },
    actions: {
        justifyContent: 'flex-end',
        paddingHorizontal: 8,
        paddingBottom: 8,
    },
});
