import { Variation } from '@/src/shared/interfaces/VariationModel'
import { StyleSheet, View } from 'react-native'
import { ActivityIndicator, Button, Modal, Portal, Text, useTheme } from 'react-native-paper'
import { useVariacionEliminarForm } from '../hooks/useForms'

interface VariacionEliminarModalProps {
  visible: boolean
  onClose: () => void
  idProducto: number
  idVariacion: number
  variacionObj: Variation
}

export const VariacionEliminarModal = ({ visible, onClose, idProducto, idVariacion, variacionObj }: VariacionEliminarModalProps) => {
  const { handleDelete, enProceso, error } = useVariacionEliminarForm(idProducto, idVariacion)

  const handleDeleteAndClose = async () => {
    await handleDelete()
    onClose()
  }

  const theme = useTheme()

  return (
    <Portal theme={theme}>
      <Modal visible={visible} onDismiss={onClose} contentContainerStyle={[styles.modal, { backgroundColor: theme.colors.background}]} >
        <Text variant="titleMedium" style={styles.title}>
          ¿Estás seguro que deseas eliminar esta variación?
        </Text>
        <Text>Esta variacion cuenta con {variacionObj.stock} en stock</Text>

        {error && <Text style={styles.error}>{error}</Text>}

        <View style={styles.actions}>
          <Button mode="outlined" onPress={onClose} style={styles.button}>
            Cancelar
          </Button>
          <Button
            mode="contained"
            onPress={handleDeleteAndClose}
            buttonColor="red"
            textColor="white"
            disabled={enProceso}
            style={styles.button}
          >
            {enProceso ? 'Eliminando...' : 'Eliminar'}
          </Button>
        </View>

        {enProceso && <ActivityIndicator style={{ marginTop: 10 }} />}
      </Modal>
    </Portal>
  )
}

const styles = StyleSheet.create({
  modal: {
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
