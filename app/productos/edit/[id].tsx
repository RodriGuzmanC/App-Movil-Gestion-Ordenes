import { ProductoEditarForm } from '@/src/modules/productos/views/ProductoEditarForm'
import { useLocalSearchParams } from 'expo-router/build/hooks'
import React from 'react'
import { Text, View } from 'react-native'

export default function editTab() {
    const { id } = useLocalSearchParams<{ id: string }>()
    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            <Text>Crear Producto</Text>
            <ProductoEditarForm key={id} id={parseInt(id)}></ProductoEditarForm>
        </View>
    )
}
