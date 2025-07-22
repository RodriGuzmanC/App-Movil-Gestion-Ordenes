import { OrderDetailWithFullRelations } from '@/src/shared/interfaces/OrderDetailModel'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { ActivityIndicator, Button, Card, Divider, Text } from 'react-native-paper'
import { useOrdenById } from '../../hooks/useOrdenes'
import { OrdenDetalleEditar } from './OrdenDetalleEditar'
import { ModalEliminarDetallePedido } from './OrdenDetalleEliminar'

interface OrderDetailsListProps {
  orderId: number
}

const OrderDetailsList: React.FC<OrderDetailsListProps> = ({ orderId }) => {
  const { ordenById, cargando, error } = useOrdenById(orderId)

  const [openModalEliminar, setOpenModalEliminar] = useState(false)
  const [openModalEditar, setOpenModalEditar] = useState(false)

  const [detallePedidoIndividualObject, setDetallePedidoIndividualObject] = useState<OrderDetailWithFullRelations | null>(null)

  const router = useRouter()

  const handleCrearDetalle = () => {
    const order = orderId.toString()
    router.navigate({
      pathname: '/pedidos/detalle/crear/[orden]',
      params: { orden: order },
    })
  }

  const handlerEliminar = (detallePedidoObj: OrderDetailWithFullRelations) => {
    setOpenModalEliminar(true)
    setDetallePedidoIndividualObject(detallePedidoObj)
  }

  const handlerEditar = (detallePedidoObj: OrderDetailWithFullRelations) => {
    setOpenModalEditar(true)
    setDetallePedidoIndividualObject(detallePedidoObj)
  }

  if (cargando) {
    return (
      <View style={styles.center}>
        <ActivityIndicator animating size="large" />
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{ color: 'red' }}>Error: {error}</Text>
      </View>
    )
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {openModalEliminar && detallePedidoIndividualObject && (
        <ModalEliminarDetallePedido
          visible={openModalEliminar}
          onDismiss={() => setOpenModalEliminar(false)}
          orderId={orderId}
          detalleId={detallePedidoIndividualObject.id}
        />
      )}

      {openModalEditar && detallePedidoIndividualObject && (
        <OrdenDetalleEditar
          visible={openModalEditar}
          onClose={() => setOpenModalEditar(false)}
          orderId={orderId}
          detalleId={detallePedidoIndividualObject.id}
          orderDetailObj={detallePedidoIndividualObject}
        />
      )}

      <Text variant="titleLarge" style={styles.title}>Detalles de la Orden</Text>

      {ordenById?.data.detalles_pedidos.map((detalle) => (
        <Card key={detalle.id} style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium">Producto: {detalle.variaciones.productos?.nombre_producto ?? 'Sin nombre'}</Text>
            <Text>Variación: {detalle.variaciones.variaciones_atributos.map(attr => `${attr.atributos.valor}`).join(' - ')}</Text>
            <Text>Cantidad: {detalle.cantidad}</Text>
            <Text>Precio: S/ {detalle.precio}</Text>
            {detalle.precio_rebajado && (
              <Text>Precio Rebajado: S/ {detalle.precio_rebajado}</Text>
            )}
          </Card.Content>
          <Card.Actions>
            <Button
              mode="outlined"
              onPress={() => handlerEditar(detalle)}
            >
              Editar
            </Button>
            <Button
              mode="contained"
              style={{ marginLeft: 8 }}
              onPress={() => handlerEliminar(detalle)}
            >
              Eliminar
            </Button>
          </Card.Actions>
        </Card>
      ))}

      <Divider style={{ marginVertical: 16 }} />

      <Button
        mode="contained"
        onPress={handleCrearDetalle}
      >
        Agregar Detalle
      </Button>
    </ScrollView>
  )
}

export default OrderDetailsList

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    marginBottom: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginVertical: 16,
    fontSize: 16,
    color: 'gray',
  },
})
