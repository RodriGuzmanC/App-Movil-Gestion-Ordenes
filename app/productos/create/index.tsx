import { ProductoCrearForm } from '@/src/modules/productos/views/ProductoCrearForm'
import React from 'react'
import { Text, View } from 'react-native'

export default function createTab() {
  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <Text>Crear Producto</Text>
      <ProductoCrearForm></ProductoCrearForm>
    </View>
  )
}
