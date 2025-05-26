
import { LoadMore } from '@/src/shared/components/LoadMore'
import { Product } from '@/src/shared/interfaces/ProductModel'
import { PaginatedResponse } from '@/src/shared/interfaces/extras/ApiResponses'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { useProductos } from '../hooks/useProductos'
import { ProductoEliminarModal } from './ProductoEliminarModal'


export const ProductoListar = () => {
  // Basicos para cargar productos
  const [productoAEliminar, setProductoAEliminar] = useState<number | string | null>(null)
  const [pagina, setPagina] = useState(1)
  const [limite, setLimite] = useState(10)
  const { productos, cargando, error } = useProductos(pagina, limite)

  const [productosAcumulados, setProductosAcumulados] = useState<Product[]>([])
  const [paginacion, setPaginacion] = useState<PaginatedResponse<Product>["paginacion"]>({
    pagina_actual: 1,
    total_items: 0,
    items_por_pagina: limite,
    total_paginas: 1,
  })

  // Paginacion de productos
  
  useEffect(() => {
    if (productos?.data) {
      setProductosAcumulados((prev) =>
        pagina === 1 ? productos.data : [...prev, ...productos.data]
      )
      setPaginacion(productos.paginacion)
    }
  }, [productos])

  const cargarMas = () => {
    if (paginacion.pagina_actual < paginacion.total_paginas) {
      setPagina((prev) => prev + 1)
    }
  }
  
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
    router.navigate({
      pathname: '/productos/edit/[id]',
      params: { "id": id.toString() }
    })
  }

  const handleEliminar = (id: number) => {
    setProductoAEliminar(id)
  }

  if (cargando && pagina === 1) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007aff" />
        <Text>Cargando productos...</Text>
      </View>
    )
  }

  if ((!productos || !productos.data) && pagina === 1) {
    return (
      <View style={styles.center}>
        <Text>No hay productos disponibles.</Text>
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    )
  }

  return (
    <>
      <FlatList
        data={productosAcumulados}
        keyExtractor={(item) => item.nombre_producto}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.info}>
              <Text style={styles.name}>{item.nombre_producto}</Text>
              <Text style={styles.price}>${item.precio_unitario}</Text>

              <View style={styles.actions}>
                <Button title="Ver" onPress={() => handleVerDetalle(item.id)} />

                <Button title="Editar" onPress={() => handleEditar(item.id)} />
                <Button title="Eliminar" color="red" onPress={() => handleEliminar(item.id)} />
              </View>
            </View>
          </View>
        )}
        ListFooterComponent={
          <LoadMore
            paginacion={paginacion}
            cargando={cargando}
            onCargarMas={cargarMas}
          />
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
  )
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: 16,
    width: '100%',
  },
  card: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
  },
  info: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    marginTop: 4,
    fontSize: 16,
    color: '#555',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    gap: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
})
