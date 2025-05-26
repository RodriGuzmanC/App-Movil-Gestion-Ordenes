import { useAlert } from '@/src/shared/hooks/useAlert'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, HelperText, TextInput } from 'react-native-paper'
import { useProductoCrearForm } from '../hooks/useForms'

export const ProductoCrearForm = () => {
  const { showAlert } = useAlert()
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
    isSubmitting,
  } = useProductoCrearForm()

  return (
    <View style={styles.container}>
      <TextInput
        label="Nombre"
        value={values.nombre_producto}
        onChangeText={handleChange('nombre_producto')}
        onBlur={handleBlur('nombre_producto')}
        mode="outlined"
        error={touched.nombre_producto && !!errors.nombre_producto}
      />
      <HelperText type="error" visible={!!errors.nombre_producto && touched.nombre_producto}>
        {errors.nombre_producto}
      </HelperText>

      <TextInput
        label="Descripción"
        value={values.descripcion}
        onChangeText={handleChange('descripcion')}
        onBlur={handleBlur('descripcion')}
        mode="outlined"
        multiline
        error={touched.descripcion && !!errors.descripcion}
      />
      <HelperText type="error" visible={!!errors.descripcion && touched.descripcion}>
        {errors.descripcion}
      </HelperText>

      <TextInput
        label="Precio unitario"
        value={String(values.precio_unitario)}
        onChangeText={handleChange('precio_unitario')}
        onBlur={handleBlur('precio_unitario')}
        mode="outlined"
        keyboardType="numeric"
        error={touched.precio_unitario && !!errors.precio_unitario}
      />
      <HelperText type="error" visible={!!errors.precio_unitario && touched.precio_unitario}>
        {errors.precio_unitario}
      </HelperText>

      <TextInput
        label="Precio mayorista"
        value={String(values.precio_mayorista)}
        onChangeText={handleChange('precio_mayorista')}
        onBlur={handleBlur('precio_mayorista')}
        mode="outlined"
        keyboardType="numeric"
        error={touched.precio_mayorista && !!errors.precio_mayorista}
      />
      <HelperText type="error" visible={!!errors.precio_mayorista && touched.precio_mayorista}>
        {errors.precio_mayorista}
      </HelperText>

      <Button
        mode="contained"
        onPress={async () => {
          console.log('Presionado botón de submit')
          handleSubmit()
        }}
        //onPress={() => showAlert('Se ejecuto la alerta con exito', 'error')}
        loading={isSubmitting}
        disabled={isSubmitting}
        style={styles.button}
      >
        {isSubmitting ? 'Creando...' : 'Crear Producto'}
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 2,
  },
  button: {
    marginTop: 16,
  },
})
