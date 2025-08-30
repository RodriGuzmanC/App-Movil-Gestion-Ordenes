import { EmptyComponent } from '@/src/shared/components/EmptyComponent'
import { LoadMore } from '@/src/shared/components/LoadMore'
import { ErrorItemsComponent, LoadingComponent, NoItemsComponent } from '@/src/shared/components/StatusComponents'
import queryKeys from '@/src/shared/constants/queryKeys'
import { PaginatedResponse } from '@/src/shared/interfaces/extras/ApiResponses'
import { Order, OrderWithFullRelations } from '@/src/shared/interfaces/OrderModel'
import { formatearFechaAmigable } from '@/src/shared/utils/datetimeConvert'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { FlatList, RefreshControl, View } from 'react-native'
import { Button, Card, Divider, Text } from 'react-native-paper'
import { mutate } from 'swr'
import { useOrdenesEntrada, useOrdenesSalida } from '../hooks/useOrdenes'

interface ListadoPedidosProps {
  tipoPedido: Order['categoria_pedido']
}

export const ListadoPedidos: React.FC<ListadoPedidosProps> = ({ tipoPedido }) => {
  const [pagina, setPagina] = React.useState(1)
  const [limite, setLimite] = React.useState(1)
  const { ordenes, cargando, error } =
    tipoPedido === 'entrada' ? useOrdenesEntrada(pagina, limite) : useOrdenesSalida(pagina, limite)

  // Basico para paginacion
  const [ordenesAcumuladas, setOrdenesAcumuladas] = useState<OrderWithFullRelations[]>([])
  const [paginacion, setPaginacion] = useState<PaginatedResponse<OrderWithFullRelations>["paginacion"] | null>(null)

  // Paginacion inicial
  useEffect(() => {
    if (ordenes?.data) {
      setOrdenesAcumuladas((prev) =>
        pagina === 1 ? ordenes.data : [...prev, ...ordenes.data]
      )
      setPaginacion(ordenes.paginacion)
    }
  }, [ordenes])

  const router = useRouter()
  const handleVerDetalleOrden = (id: number) => {
    router.navigate(
      {
        pathname: `/${tipoPedido == 'entrada' ? 'pedidos' : 'ventas'}/[id]`,
        params: { id }
      }
    )
  }

  const handleRefresh = () => {
    mutate(queryKeys.ordenesEntrada)
  }

  if (cargando) return <LoadingComponent message='Cargando pedidos'></LoadingComponent>
  if (error) return <ErrorItemsComponent message='A ocurrido un error al obtener los items'></ErrorItemsComponent>
  if (!ordenes || ordenes.data.length === 0) return <NoItemsComponent message='No se encontraron ordenes, empieza creando tu primera orden'></NoItemsComponent>


  const renderItem = ({ item }: { item: OrderWithFullRelations }) => (
    <Card style={{ marginHorizontal: 12, marginBottom: 12, elevation: 2 }}>
      <Card.Title
        title={`Código: ${item.codigo}`}
        subtitle={`Cliente: ${item.clientes.nombre}`}
        left={(props) => <MaterialCommunityIcons name="file-document-outline" {...props} />}
      />

      <Card.Content>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
          <MaterialCommunityIcons name="calendar-outline" size={20} color="gray" />
          <Text style={{ marginLeft: 6 }}>Pedido: {formatearFechaAmigable(item.fecha_pedido)}</Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
          <MaterialCommunityIcons name="calendar-check-outline" size={20} color="gray" />
          <Text style={{ marginLeft: 6 }}>Entrega: {formatearFechaAmigable(item.fecha_entrega)}</Text>
        </View>

        <Divider style={{ marginVertical: 8 }} />

        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
          <MaterialCommunityIcons name="truck-outline" size={20} color="gray" />
          <Text style={{ marginLeft: 6 }}>Método: {item.metodos_entregas.nombre}</Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
          <MaterialCommunityIcons name="information-outline" size={20} color="gray" />
          <Text style={{ marginLeft: 6 }}>Estado: {item.estados_pedidos.nombre}</Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
          <MaterialCommunityIcons name="shape-outline" size={20} color="gray" />
          <Text style={{ marginLeft: 6 }}>Tipo Pedido: {item.tipo_pedido}</Text>
        </View>
      </Card.Content>

      <Card.Actions style={{ justifyContent: 'flex-end' }}>
        <Button onPress={() => handleVerDetalleOrden(item.id)} icon="eye">Ver Detalle</Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={{ padding: 8 }}>
      <FlatList
        data={ordenesAcumuladas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingVertical: 8 }}
        refreshControl={
          <RefreshControl refreshing={cargando} onRefresh={handleRefresh} />
        }
        ListEmptyComponent={
          <EmptyComponent message='No hay pedidos disponibles'></EmptyComponent>
        }
        ListFooterComponent={
          ordenes?.paginacion ? (
            <LoadMore
              paginacion={ordenes.paginacion}
              cargando={cargando}
              setPagina={setPagina}
            />
          ) : null
        }
      />

    </View>
  );
}
