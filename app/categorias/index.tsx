import { CategoriaCrearModal } from '@/src/modules/categorias/views/CategoriaCrearForm'
import { CategoriaListar } from '@/src/modules/categorias/views/CategoriaListar'
import React, { useState } from 'react'
import { View } from 'react-native'
import { Button, Text } from 'react-native-paper'

export default function index() {
  const [CategoriaModal, setCategoriaModal] = useState(false)
  return (
    <View>
        <Text>Categorias</Text>
        <Button mode='contained' onPress={() => {setCategoriaModal(true)}}>Abrir modal</Button>
        <CategoriaListar></CategoriaListar>
        <CategoriaCrearModal visible={CategoriaModal} onClose={() => {setCategoriaModal(false)}}></CategoriaCrearModal>
    </View>
  )
}
