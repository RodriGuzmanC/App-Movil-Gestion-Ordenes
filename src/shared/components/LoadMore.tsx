// components/BotonCargarMas.tsx
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ActivityIndicator, Button, Text } from 'react-native-paper'
import { useCatchErrors } from '../hooks/useCatchErorrs'
import { Paginacion } from '../interfaces/extras/PaginatedType'


type BotonCargarMasProps = {
  paginacion: Paginacion
  cargando: boolean
  setPagina: React.Dispatch<React.SetStateAction<number>>
}

export const LoadMore: React.FC<BotonCargarMasProps> = ({
  paginacion,
  cargando,
  setPagina,
}) => {
  const hayMasPaginas = paginacion.pagina_actual < paginacion.total_paginas

  if (!hayMasPaginas) {
    return (
      <View style={styles.center}>
        <Text>No hay más productos para mostrar.</Text>
      </View>
    )
  }
  
  const { catchErrors } = useCatchErrors()

  const onCargarMas = () => {
    catchErrors(async () => {
      if (!paginacion || cargando) {
        throw new Error("No se puede cargar más productos en este momento.")
      }
      if (paginacion.pagina_actual < paginacion.total_paginas) {
        setPagina((prev) => prev + 1)
      }
    })
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
