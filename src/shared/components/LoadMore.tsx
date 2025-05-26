// components/BotonCargarMas.tsx
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ActivityIndicator, Button, Text } from 'react-native-paper'

type Paginacion = {
  pagina_actual: number
  total_items: number
  items_por_pagina: number
  total_paginas: number
}

type BotonCargarMasProps = {
  paginacion: Paginacion
  cargando: boolean
  onCargarMas: () => void
}

export const LoadMore: React.FC<BotonCargarMasProps> = ({
  paginacion,
  cargando,
  onCargarMas,
}) => {
  const hayMasPaginas = paginacion.pagina_actual < paginacion.total_paginas

  if (!hayMasPaginas) {
    return (
      <View style={styles.center}>
        <Text>No hay más productos para mostrar.</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {cargando ? (
        <ActivityIndicator animating size="small" />
      ) : (
        <Button mode="contained" onPress={onCargarMas}>
          Cargar más
        </Button>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    alignItems: 'center',
  },
  center: {
    alignItems: 'center',
    marginVertical: 16,
  },
})
