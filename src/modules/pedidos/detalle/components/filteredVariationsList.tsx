import { VariationWithRelations } from '@/src/shared/interfaces/VariationModel'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Card, Text } from 'react-native-paper'

interface Props {
  variations: VariationWithRelations[]
  addToOrder: (variation: VariationWithRelations) => void
}

const FilteredVariationsList: React.FC<Props> = ({ variations, addToOrder }) => {
  if (variations.length === 0) return null

  return (
    <View style={styles.container}>
      <Text variant="titleMedium" style={styles.title}>Variaciones Encontradas</Text>

      {variations.map((variation) => (
        <Card key={variation.id} style={styles.card}>
          <Card.Content>
            <Text variant="bodyMedium">Precio Unitario: S/{variation.precio_unitario}</Text>
            <Text variant="bodyMedium">Precio Mayorista: S/{variation.precio_mayorista}</Text>
            <Text variant="bodyMedium">Stock: {variation.stock}</Text>
          </Card.Content>
          <Card.Actions>
            <Button mode="contained" onPress={() => addToOrder(variation)}>Agregar</Button>
          </Card.Actions>
        </Card>
      ))}
    </View>
  )
}

export default FilteredVariationsList

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  title: {
    marginBottom: 8,
  },
  card: {
    marginBottom: 12,
  },
})
