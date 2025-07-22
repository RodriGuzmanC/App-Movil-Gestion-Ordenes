import { CategoriaListar } from '@/src/modules/categorias/views/CategoriaListar'
import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'

export default function index() {
  return (
    <View>
        <Text>Categorias</Text>
        <CategoriaListar></CategoriaListar>
    </View>
  )
}
