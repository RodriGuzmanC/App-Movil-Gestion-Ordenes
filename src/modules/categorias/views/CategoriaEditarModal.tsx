import { Category } from '@/src/shared/interfaces/CategoryModel'
import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { Button, HelperText, Modal, Portal, Text, TextInput } from 'react-native-paper'
import { useCategoriaEditarForm } from '../hooks/useForms'

interface CategoriaEditarModalProps {
  categoriaObj: Category
  visible: boolean
  onClose: () => void
}

export const CategoriaEditarModal = ({ categoriaObj, visible, onClose }: CategoriaEditarModalProps) => {
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    enProceso,
    values,
    errors,
    touched,
  } = useCategoriaEditarForm(categoriaObj.id, categoriaObj)

  async function handleSubmitAndClose() {
    await handleSubmit()
    onClose()
  }

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onClose} contentContainerStyle={styles.modal}>
        <Text variant="titleMedium" style={styles.title}>
          Editar categoria
        </Text>

        <View>
          <TextInput
            label="Nombre"
            value={values.nombre}
            onChangeText={handleChange('nombre')}
            onBlur={handleBlur('nombre')}
            mode="outlined"
            error={touched.nombre && !!errors.nombre}
          />
          <HelperText type="error" visible={!!errors.nombre && touched.nombre}>
            {errors.nombre}
          </HelperText>

          <TextInput
            label="Descripcion"
            value={values.descripcion}
            onChangeText={handleChange('descripcion')}
            onBlur={handleBlur('descripcion')}
            mode="outlined"
            error={touched.descripcion && !!errors.descripcion}
          />
          <HelperText type="error" visible={!!errors.descripcion && touched.descripcion}>
            {errors.descripcion}
          </HelperText>
        </View>

        <View style={styles.actions}>
          <Button mode="outlined" onPress={onClose} style={styles.button}>
            Cancelar
          </Button>
          <Button
            mode="contained"
            onPress={handleSubmitAndClose}
            textColor="white"
            disabled={enProceso}
            style={styles.button}
          >
            {enProceso ? 'Guardando...' : 'Guardar cambios'}
          </Button>
        </View>

        {(enProceso) && <ActivityIndicator style={{ marginTop: 10 }} />}
      </Modal>
    </Portal>
  )
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 8,
  },
  title: {
    marginBottom: 10,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginVertical: 8,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 20,
  },
  button: {
    minWidth: 100,
  },
})
