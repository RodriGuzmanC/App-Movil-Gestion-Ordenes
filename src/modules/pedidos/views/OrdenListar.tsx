import { ErrorItemsComponent, LoadingComponent, NoItemsComponent } from '@/src/shared/components/StatusComponents'
import { OrderWithFullRelations } from '@/src/shared/interfaces/OrderModel'
import { useRouter } from 'expo-router'
import React from 'react'
import { FlatList, View } from 'react-native'
import { Button, Card, Text } from 'react-native-paper'
import { useOrdenesEntrada, useOrdenesSalida } from '../hooks/useOrdenes'

interface ListadoPedidosProps {
  tipoPedido: 'entrada' | 'salida'
}

export const ListadoPedidos: React.FC<ListadoPedidosProps> = ({ tipoPedido }) => {
  const { ordenes, cargando, error } =
    tipoPedido === 'entrada' ? useOrdenesEntrada() : useOrdenesSalida()

    const router = useRouter()

    const handleCrearOrden = () => {
      router.navigate(
        {
          pathname: '/pedidos/crear',
          params: { tipoPedido }
        }
      )
    }

    const handleVerDetalleOrden = (id: number) => {
      router.navigate(
        {
          pathname: '/pedidos/[id]',
          params: { id }
        }
      )
    }

  if (cargando) return <LoadingComponent message='Cargando pedidos'></LoadingComponent>

  if (error) return <ErrorItemsComponent message='A ocurrido un error al obtener los items'></ErrorItemsComponent>

  if (!ordenes || ordenes.data.length === 0) return <NoItemsComponent message='No se encontraron ordenes, empieza creando tu primera orden'></NoItemsComponent>

  const renderItem = ({ item }: { item: OrderWithFullRelations }) => (
    <Card className="mb-4 mx-2">
      <Card.Title title={`Código: ${item.codigo}`} subtitle={`Cliente: ${item.clientes.nombre}`} />
      <Card.Content>
        <Text>Fecha Pedido: {item.fecha_pedido}</Text>
        <Text>Fecha Entrega: {item.fecha_entrega}</Text>
        <Text>Estado: {item.estados_pedidos.nombre}</Text>
        <Text>Entrega: {item.metodos_entregas.nombre}</Text>
        <Text>Tipo Pedido: {item.tipo_pedido}</Text>
      </Card.Content>
      <Card.Actions>
        <Button onPress={() =>  handleVerDetalleOrden(item.id)}>Ver Detalle</Button>
      </Card.Actions>
    </Card>
  )

  return (
    <View className="flex-1">
      <FlatList
        data={ordenes.data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingVertical: 8 }}
      />
      <Button mode='contained' onPress={handleCrearOrden}>Crear</Button>
    </View>
  )
}
