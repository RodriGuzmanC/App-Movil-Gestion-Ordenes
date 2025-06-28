import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, HelperText, Modal, Portal, Text, TextInput } from 'react-native-paper'
import { useTipoAtributoCrearForm } from '../../hooks/useForms'

interface TipoAtributoCrearModalProps {
  visible: boolean
  onClose: () => void
}

export const TipoAtributoCrearModal = ({ visible, onClose }: TipoAtributoCrearModalProps) => {
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
    isSubmitting,
  } = useTipoAtributoCrearForm()

  async function handleSubmitAndClose() {
    await handleSubmit()
    onClose()
  }

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onClose} contentContainerStyle={styles.modalContainer}>
        <View style={styles.form}>
          <Text style={styles.title}>Crear Tipo de Atributo</Text>

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

          <View style={styles.buttons}>
            <Button onPress={onClose} mode="outlined" style={styles.button}>
              Cancelar
            </Button>
            <Button onPress={handleSubmitAndClose} mode="contained" loading={isSubmitting} style={styles.button}>
              Guardar
            </Button>
          </View>
        </View>
      </Modal>
    </Portal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 10,
    padding: 20,
  },
  form: {},
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 12,
  },
  button: {
    flex: 1,
  },
})
