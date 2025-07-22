import { PrepareOrderDetail } from '@/src/shared/interfaces/OrderModel'
import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Button, Card, IconButton, Text, TextInput } from 'react-native-paper'

interface Props {
  orderItems: Partial<PrepareOrderDetail>[]
  updateQuantity: (id: number, increment: boolean) => void
  updatePrice: (id: number, price: number, isDiscounted: boolean) => void
  handleSubmit: () => void
}

const OrderDetailsSummary: React.FC<Props> = ({ orderItems, updateQuantity, updatePrice, handleSubmit }) => {
  return (
    <View style={styles.container}>
      <Text variant="titleMedium" style={styles.title}>Resumen del Pedido</Text>

      <FlatList
        data={orderItems}
        keyExtractor={(item) => item.id!.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Text variant="bodyLarge">{item.nombre_producto}</Text>
              <Text>Cantidad: {item.cantidad}</Text>
              <Text>Precio: S/{item.precio}</Text>

              <View style={styles.actions}>
                <IconButton icon="plus" onPress={() => updateQuantity(item.id!, true)} />
                <IconButton icon="minus" onPress={() => updateQuantity(item.id!, false)} />
              </View>

              <TextInput
                label="Precio Rebajado"
                keyboardType="numeric"
                value={item.precio_rebajado?.toString() ?? ''}
                onChangeText={(text) => updatePrice(item.id!, parseFloat(text) || 0, true)}
                style={styles.input}
              />
            </Card.Content>
          </Card>
        )}
      />

      <Button mode="contained" onPress={handleSubmit} style={styles.submitButton}>
        Crear Pedido
      </Button>
    </View>
  )
}

export default OrderDetailsSummary

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
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  input: {
    marginTop: 8,
  },
  submitButton: {
    marginTop: 16,
  },
})
