import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { Button, Modal, Portal, Text } from 'react-native-paper'
import { useTipoAtributoEliminarForm } from '../../hooks/useForms'

interface TipoAtributoEliminarModalProps {
  nombre: string
  id: number | string
  visible: boolean
  onClose: () => void
}

export const TipoAtributoEliminarModal = ({
  nombre,
  id,
  visible,
  onClose,
}: TipoAtributoEliminarModalProps) => {

  const { handleDelete: ejecutarEliminar, enProceso, error } = useTipoAtributoEliminarForm(id)

  const handleDelete = async () => {
    await ejecutarEliminar()
    onClose()
  }

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onClose} contentContainerStyle={styles.modal}>
        <Text variant="titleMedium" style={styles.title}>
          ¿Estás seguro que deseas eliminar este tipo de atributo?
        </Text>
        <Text variant="bodyMedium">Tipo de atributo: {nombre}</Text>

        {error && <Text style={styles.error}>{error}</Text>}

        <View style={styles.actions}>
          <Button mode="outlined" onPress={onClose} style={styles.button}>
            Cancelar
          </Button>
          <Button
            mode="contained"
            onPress={handleDelete}
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