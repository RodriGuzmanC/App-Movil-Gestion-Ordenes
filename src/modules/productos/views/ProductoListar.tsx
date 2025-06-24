
import { LoadMore } from '@/src/shared/components/LoadMore'
import { ErrorItemsComponent, LoadingComponent, NoItemsComponent } from '@/src/shared/components/StatusComponents'
import { Product } from '@/src/shared/interfaces/ProductModel'
import { PaginatedResponse } from '@/src/shared/interfaces/extras/ApiResponses'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import {
  FlatList,
  StyleSheet,
  View
} from 'react-native'
import { Button, Card, Text } from 'react-native-paper'
import { useProductos } from '../hooks/useProductos'
import { ProductoEliminarModal } from './ProductoEliminarModal'


export const ProductoListar = () => {
  // Basicos para cargar productos
  const [pagina, setPagina] = useState<number>(1)
  const [limite, setLimite] = useState<number>(1)
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

  if (cargando) return <LoadingComponent></LoadingComponent>
  if (productos == undefined || !productos.data) return <NoItemsComponent />
  if (error) <ErrorItemsComponent></ErrorItemsComponent>


  return (
    <>
      <FlatList
        data={productosAcumulados}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <View style={styles.row}>
              <Card.Cover source={{ uri: item.url_imagen }} style={styles.image} />

              <View style={styles.infoContainer}>
                <View style={styles.header}>
                  <Text variant="titleMedium">{item.nombre_producto}</Text>
                </View>

                <Text variant="bodyMedium" numberOfLines={2} style={styles.description}>
                  {item.descripcion}
                </Text>

                <View style={styles.actions}>
                  <Button onPress={() => handleEditar(item.id)}>Editar</Button>
                  <Button onPress={() => handleEliminar(item.id)} textColor="red">Eliminar</Button>
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
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  stock: {
    backgroundColor: '#eee',
    color: '#333',
  },
  description: {
    marginBottom: 8,

  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
});