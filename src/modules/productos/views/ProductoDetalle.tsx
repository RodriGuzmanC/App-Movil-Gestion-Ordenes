// components/ProductoDetalle.tsx
import React from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { useProductoById } from '../hooks/useProductos'

export const ProductoDetalle = ({ id }: { id: number | string }) => {
  const { productoById, cargando, error } = useProductoById(id)

  if (cargando) return <ActivityIndicator size="large" color="#007aff" />
  if (error) return <Text style={styles.error}>{error}</Text>
  if (!productoById) return <Text>No se encontró el producto.</Text>

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{productoById.data.nombre_producto}</Text>
      <Text>Precio unitario: ${productoById.data.precio_unitario}</Text>
      <Text>Precio mayorista: ${productoById.data.precio_mayorista}</Text>
      <Text>Stock: {productoById.data.stock}</Text>
      <Text>Descripción: {productoById.data.descripcion}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  error: { color: 'red' },
})