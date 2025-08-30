
import { LoadMore } from '@/src/shared/components/LoadMore'
import { ErrorItemsComponent, LoadingComponent, NoItemsComponent } from '@/src/shared/components/StatusComponents'
import queryKeys from '@/src/shared/constants/queryKeys'
import { Product } from '@/src/shared/interfaces/ProductModel'
import { PaginatedResponse } from '@/src/shared/interfaces/extras/ApiResponses'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  View
} from 'react-native'
import { Button, Card, Chip, Text } from 'react-native-paper'
import { mutate } from 'swr'
import { useProductos } from '../hooks/useProductos'
import { ProductoEliminarModal } from './ProductoEliminarModal'


export const ProductoListar = () => {
  // Basicos para cargar productos
  const [pagina, setPagina] = useState<number>(1)
  const [limite, setLimite] = useState<number>(10)
  const { productos, cargando, error } = useProductos(pagina, limite)

  // Basico para paginacion
  const [productosAcumulados, setProductosAcumulados] = useState<Product[]>([])
  const [paginacion, setPaginacion] = useState<PaginatedResponse<Product>["paginacion"] | null>(null)

  // Basico para eliminar producto
  const [productoAEliminar, setProductoAEliminar] = useState<number | string | null>(null)


  // Paginacion inicial

  useEffect(() => {
    if (productos?.data) {
      setProductosAcumulados((prev) =>
        pagina === 1 ? productos.data : [...prev, ...productos.data]
      )
      setPaginacion(productos.paginacion)
    }
  }, [productos])

  // Navegacion
  const router = useRouter()

  // Handlers para accciones de botones
  const handleVerDetalle = (id: number) => {
    router.navigate({
      pathname: '/productos/[id]',
      params: { "id": id.toString() }
    })
  }

  const handleEditar = (id: number) => {
    console.log("Antes de router push")
    router.navigate({
      pathname: '/productos/edit/[id]',
      params: { "id": id.toString() }
    })

    console.log("Despues de router push")

  }

  const handleEliminar = (id: number) => {
    setProductoAEliminar(id)
  }

  const handleRefresh = () => {
        mutate(queryKeys.productos(pagina, limite))
    }

  if (cargando) return <LoadingComponent></LoadingComponent>
  if (productos == undefined || !productos.data) return <NoItemsComponent />
  if (error) <ErrorItemsComponent></ErrorItemsComponent>


  return (
    <>
      <FlatList
        style={{ marginVertical: 10 }}
        data={productosAcumulados}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        refreshControl={<RefreshControl refreshing={cargando} onRefresh={handleRefresh} />}
        renderItem={({ item }) => (
          <Card style={styles.card} mode="elevated">
            <View style={styles.row}>
              <Card.Cover source={{ uri: item.url_imagen }} style={styles.image} />

              <View style={styles.infoContainer}>
                <View style={styles.header}>
                  <Text variant="titleMedium" style={styles.productName}>
                    {item.nombre_producto}
                  </Text>
                  
                </View>

                <Chip icon="cube" compact elevated>
                    Stock: {item.stock}
                  </Chip>

                <Text variant="bodyMedium" numberOfLines={2} style={styles.description}>
                  {item.descripcion}
                </Text>

                <View style={styles.actions}>
                  <Button onPress={() => handleEditar(item.id)}>Editar</Button>
                  <Button onPress={() => handleVerDetalle(item.id)}>Ver</Button>
                  <Button onPress={() => handleEliminar(item.id)} textColor="red">
                    Eliminar
                  </Button>
                </View>
              </View>
            </View>
          </Card>
        )}
        ListFooterComponent={
          productos?.paginacion ? (
            <LoadMore
              paginacion={productos.paginacion}
              cargando={cargando}
              setPagina={setPagina}
            />
          ) : null
        }
      />

      {/* Modal para confirmar eliminación */}
      {productoAEliminar && (
        <ProductoEliminarModal
          id={productoAEliminar}
          visible={true}
          onClose={() => setProductoAEliminar(null)}
        />
      )}
    </>
  );

}

const styles = StyleSheet.create({
  listContainer: {
    padding: 8,
  },
  card: {
    marginBottom: 12,
    borderRadius: 12,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
  },
  image: {
    width: 120,
    height: '100%',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  infoContainer: {
    flex: 1,
    padding: 12,
    gap: 8,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productName: {
    flex: 1,
    marginRight: 8,
  },
  description: {
    marginBottom: 12,
  },
  actions: {
    flexDirection: 'row',
  },
});
