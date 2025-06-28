import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { Button, HelperText, Modal, Portal, Text, TextInput } from 'react-native-paper'
import { useAtributoEditarForm } from '../../hooks/useForms'

interface AtributoEditarModalProps {
  id: number
  visible: boolean
  onClose: () => void
}

export const AtributoEditarModal = ({ id, visible, onClose }: AtributoEditarModalProps) => {
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    cargando,
    enProceso,
    values,
    errors,
    touched,
  } = useAtributoEditarForm(id)

  async function handleSubmitAndClose() {
    await handleSubmit()
    onClose()
  }

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onClose} contentContainerStyle={styles.modal}>
        <Text variant="titleMedium" style={styles.title}>
          Editar atributo
        </Text>

        {cargando ? (
          <ActivityIndicator style={{ marginTop: 10 }} />
        ) : (
          <>
            <View>
              <TextInput
                label="Valor"
                value={values.valor}
                onChangeText={handleChange('valor')}
                onBlur={handleBlur('valor')}
                mode="outlined"
                error={touched.valor && !!errors.valor}
              />
              <HelperText type="error" visible={!!errors.valor && touched.valor}>
                {errors.valor}
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
          </>
        )}
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
