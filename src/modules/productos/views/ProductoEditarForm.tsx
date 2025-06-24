import { LoadingComponent } from '@/src/shared/components/StatusComponents'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Checkbox, HelperText, List, TextInput } from 'react-native-paper'
import { useCategorias } from '../../categorias/hooks/useCategorias'
import { useProductoEditarForm } from '../hooks/useForms'


export const ProductoEditarForm = ({ id }: { id: number }) => {
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    cargandoProducto,
    enProceso,
    values,
    errors,
    touched,
    isSubmitting,
  } = useProductoEditarForm(id)

  const [pagina, setPagina] = useState(1)
  const [limite, setLimite] = useState(50)
  const { categorias, cargando: cargandoCat, error } = useCategorias(pagina, limite)

  const toggleSeleccion = (id: number) => {
    setFieldValue(
      'categorias',
      values.categorias.includes(id)
        ? values.categorias.filter((catId) => catId !== id)
        : [...values.categorias, id]
    )
  }

  if (cargandoProducto || cargandoCat || categorias === undefined) {
    return (<LoadingComponent></LoadingComponent>)
  }

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


      <List.Section title="Selecciona las categorías">
        {categorias.data.map((categoria) => (
          <List.Item
            key={categoria.id}
            title={categoria.nombre}
            left={() => (
              <Checkbox
                status={values.categorias.includes(categoria.id) ? 'checked' : 'unchecked'}
                onPress={() => toggleSeleccion(categoria.id)}
              />
            )}
            onPress={() => toggleSeleccion(categoria.id)}
          />
        ))}
      </List.Section>
      <HelperText type="error" visible={!!errors.categorias && touched.categorias}>
        {errors.categorias}
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
        {isSubmitting ? 'Editando...' : 'Editar Producto'}
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  button: {
    marginTop: 16,
  },
})