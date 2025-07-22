import { Product } from '@/src/shared/interfaces/ProductModel'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, HelperText, Menu, Text } from 'react-native-paper'

interface Props {
  productos: Product[]
  selectedProductId: number | null
  setSelectedProductId: (id: number) => void
}

const ProductSelector: React.FC<Props> = ({ productos, selectedProductId, setSelectedProductId }) => {
  const [visible, setVisible] = React.useState(false)

  return (
    <View style={styles.container}>
      <Text variant="titleMedium">Seleccionar Producto</Text>

      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={<Button mode="outlined" onPress={() => setVisible(true)}>
          {selectedProductId ? productos.find(p => p.id === selectedProductId)?.nombre_producto : 'Selecciona un producto'}
        </Button>}
      >
        {productos.map((producto) => (
          <Menu.Item
            key={producto.id}
            onPress={() => {
              setSelectedProductId(producto.id)
              setVisible(false)
            }}
            title={producto.nombre_producto}
          />
        ))}
      </Menu>

      {!selectedProductId && <HelperText type="error" visible={true}>Selecciona un producto para continuar</HelperText>}
    </View>
  )
}

export default ProductSelector

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
})
