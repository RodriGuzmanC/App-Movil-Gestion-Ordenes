import { ProductoEditarForm } from '@/src/modules/productos/views/ProductoEditarForm'
import { useLocalSearchParams } from 'expo-router/build/hooks'
import React from 'react'
import { ScrollView } from 'react-native'

export default function editTab() {
    const { id } = useLocalSearchParams<{ id: string }>()
    return (
        <ScrollView nestedScrollEnabled={true}>
            <ProductoEditarForm key={id} id={parseInt(id)}></ProductoEditarForm>
        </ScrollView>
    )
}
