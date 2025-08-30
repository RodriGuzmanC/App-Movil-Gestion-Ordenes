import { StyleSheet, View } from 'react-native'
import { ActivityIndicator, Button, HelperText, Modal, Portal, Text, TextInput, useTheme } from 'react-native-paper'
import { useVariacionCrearForm } from '../hooks/useForms'

interface VariacionCrearModalProps {
  visible: boolean
  onClose: () => void
  productoId: number
}

export const VariacionCrearModal = ({ visible, onClose, productoId }: VariacionCrearModalProps) => {
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
    isSubmitting,
    enProceso,
  } = useVariacionCrearForm(productoId)

  async function handleSubmitAndClose() {
    await handleSubmit()
    onClose()
  }

  const theme = useTheme()

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onClose} contentContainerStyle={[styles.modalContainer, { backgroundColor: theme.colors.background }]}>
        <View style={styles.form}>
          <Text style={styles.title}>Crear variación</Text>

          <TextInput
            label="Precio unitario"
            value={values.precio_unitario.toString()}
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
            value={values.precio_mayorista.toString()}
            onChangeText={handleChange('precio_mayorista')}
            onBlur={handleBlur('precio_mayorista')}
            mode="outlined"
            keyboardType="numeric"
            error={touched.precio_mayorista && !!errors.precio_mayorista}
          />
          <HelperText type="error" visible={!!errors.precio_mayorista && touched.precio_mayorista}>
            {errors.precio_mayorista}
          </HelperText>

          <TextInput
            label="Stock"
            value={values.stock.toString()}
            onChangeText={handleChange('stock')}
            onBlur={handleBlur('stock')}
            mode="outlined"
            keyboardType="numeric"
            error={touched.stock && !!errors.stock}
          />
          <HelperText type="error" visible={!!errors.stock && touched.stock}>
            {errors.stock}
          </HelperText>

          <View style={styles.buttons}>
            <Button onPress={onClose} mode="outlined" style={styles.button}>
              Cancelar
            </Button>
            <Button onPress={() => handleSubmit()} mode="contained" loading={isSubmitting || enProceso} style={styles.button}>
              Guardar
            </Button>
          </View>

          {(isSubmitting || enProceso) && <ActivityIndicator style={{ marginTop: 10 }} />}
        </View>
      </Modal>
    </Portal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
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
