import { StyleSheet, View } from 'react-native'
import { ActivityIndicator, Button, Modal, Portal, Text, useTheme } from 'react-native-paper'
import { useAtributoVariacionEliminarForm } from '../hooks/useForms'

interface Props {
  productoId: number
  variacionId: number
  varAtributoId: number
  nombreAtributo: string
  nombreTipoAtributo: string
  visible: boolean
  onClose: () => void
}

export const AtributoVariacionEliminarModal = ({
  productoId,
  variacionId,
  varAtributoId,
  nombreAtributo,
  nombreTipoAtributo,
  visible,
  onClose,
}: Props) => {

  const { handleDelete, enProceso, error } = useAtributoVariacionEliminarForm(productoId, variacionId, varAtributoId)

  const handleDeleteAndClose = async () => {
    await handleDelete()
    onClose()
  }

  const theme = useTheme()

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onClose} contentContainerStyle={[styles.modal, {  backgroundColor: theme.colors.background }]}>
        <Text variant="titleMedium" style={styles.title}>
          ¿Estás seguro que deseas eliminar este elemento?
        </Text>
        <Text variant="bodyMedium">{nombreTipoAtributo}: {nombreAtributo}</Text>

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
