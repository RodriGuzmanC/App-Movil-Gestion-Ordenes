import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ActivityIndicator, Button, HelperText, Modal, Portal, Text, TextInput } from 'react-native-paper'
import { useClienteEditarForm } from '../hooks/useForms'

export const ClienteEditarModal = (
  { nombre, id, visible, onClose }: { nombre: string, id: number, visible: boolean, onClose: () => void }
) => {
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    cargandoCliente,
    enProceso,
    values,
    errors,
    touched,
  } = useClienteEditarForm(id)

  async function handleSubmitAndClose() {
    await handleSubmit()
    onClose()
  }

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onClose} contentContainerStyle={styles.modal}>
        <Text variant="titleMedium" style={styles.title}>
          Editar cliente
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

        {enProceso && <ActivityIndicator style={{ marginTop: 10 }} />}
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