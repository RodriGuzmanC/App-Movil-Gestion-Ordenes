import { ErrorItemsComponent, LoadingComponent, NoItemsComponent } from '@/src/shared/components/StatusComponents'
import { VariationWithRelations } from '@/src/shared/interfaces/VariationModel'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Button, Card, Chip, Divider, List, Text } from 'react-native-paper'
import { useProductoById } from '../hooks/useProductos'
import { VariacionCrearModal } from '../variaciones/views/VariacionesCrearModal'
import { VariacionEditarModal } from '../variaciones/views/VariacionesEditarModal'
import { VariacionEliminarModal } from '../variaciones/views/VariacionesEliminarModal'

export const ProductoDetalle = ({ id }: { id: number | string }) => {
  const { productoById, cargando, error } = useProductoById(id)


  // Estado para manejar la apertura del modal de eliminacion, creacion y edicion
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false)
  const [modalCreateVisible, setModalCreateVisible] = useState(false)
  const [modalEditVisible, setModalEditVisible] = useState(false)

  const [variacionIndividual, setVariacionIndividual] = useState<VariationWithRelations | null>(null)

  const handleEliminar = (variacion: VariationWithRelations) => {
    setVariacionIndividual(variacion)
    setModalDeleteVisible(true)
  }

  const handleEditarVariaciones = (variacion: VariationWithRelations) => {
    setVariacionIndividual(variacion)
    setModalEditVisible(true)
  }

  const router = useRouter()

  const handleEditarDetalle = () => {
    router.navigate({
      pathname: '/productos/[id]',
      params: { "id": id.toString() }
    })
  }


  if (cargando) return <LoadingComponent />
  if (error) return <ErrorItemsComponent />
  if (!productoById) return <NoItemsComponent message="No se encontró el producto." />

  const producto = productoById.data


  return (
    <>
      <VariacionCrearModal
        onClose={() => setModalCreateVisible(false)}
        visible={modalCreateVisible}
        productoId={producto.id}
      ></VariacionCrearModal>

      {variacionIndividual && modalEditVisible && (
        <VariacionEditarModal
          visible={modalEditVisible}
          onClose={() => setModalEditVisible(false)}
          idProducto={producto.id}
          idVariacion={variacionIndividual.id}
          variacionObj={variacionIndividual}
        />
      )}

      {variacionIndividual && modalDeleteVisible && (
        <VariacionEliminarModal
          visible={modalDeleteVisible}
          onClose={() => setModalDeleteVisible(false)}
          idProducto={producto.id}
          idVariacion={variacionIndividual.id}
          variacionObj={variacionIndividual}
        />
      )}

      <ScrollView contentContainerStyle={styles.container}>
        <Card style={styles.card}>
          {producto.url_imagen ? (
            <Card.Cover source={{ uri: producto.url_imagen }} />
          ) : (
            <Card.Title title="Sin Imagen" />
          )}
          <Card.Content>
            <Text variant="titleLarge" style={styles.title}>{producto.nombre_producto}</Text>
            <Text variant="bodyMedium" style={styles.description}>{producto.descripcion}</Text>
            <Text variant="bodyMedium">Estado: {producto.estados_productos?.nombre}</Text>
            <Text variant="bodyMedium">Precio Unitario: ${producto.precio_unitario}</Text>
            <Text variant="bodyMedium">Precio Mayorista: ${producto.precio_mayorista}</Text>
            <Text variant="bodyMedium">Stock Total: {producto.stock}</Text>
          </Card.Content>
          <Card.Actions>
            <Button mode="contained" onPress={handleEditarDetalle}>Editar Producto</Button>
          </Card.Actions>
        </Card>

        <Divider style={styles.divider} />

        <List.Section title="Variaciones del Producto">
          {producto.variaciones.map((variacion) => (
            <Card key={variacion.id} style={styles.variacionCard}>
              <Card.Content>
                <Text variant="titleMedium">Variación ID: {variacion.id}</Text>
                <Text>Precio Unitario: ${variacion.precio_unitario}</Text>
                <Text>Precio Mayorista: ${variacion.precio_mayorista}</Text>
                <Text>Stock: {variacion.stock}</Text>

                <View style={styles.chipsContainer}>
                  {variacion.variaciones_atributos.map((atributo) => (
                    <Chip key={atributo.id} style={styles.chip}>
                      {atributo.atributos.tipos_atributos.nombre}: {atributo.atributos.valor}
                    </Chip>
                  ))}
                </View>

                <View style={styles.actionsRow}>
                  <Button mode="outlined" onPress={() => handleEditarVariaciones(variacion)}>Editar</Button>
                  <Button mode="outlined" textColor="red" onPress={() => handleEliminar(variacion)}>Eliminar</Button>
                </View>
              </Card.Content>
            </Card>
          ))}

          <Button mode="contained" style={styles.addButton} onPress={() => setModalCreateVisible(true)}>
            Agregar Variación
          </Button>
        </List.Section>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  title: {
    marginBottom: 8,
  },
  description: {
    marginBottom: 8,
  },
  divider: {
    marginVertical: 16,
  },
  variacionCard: {
    marginBottom: 16,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    gap: 8,
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    gap: 10,
  },
  addButton: {
    marginTop: 16,
  },
})
