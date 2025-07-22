import React from 'react'
import { View } from 'react-native'
import { ActivityIndicator, Button, Dialog, Portal, Text } from 'react-native-paper'
import { useOrdenEliminarForm } from '../hooks/useForms'

interface ModalEliminarPedidoProps {
  visible: boolean
  onDismiss: () => void
  pedidoId: number
  cliente: string,
}

export const ModalEliminarPedido: React.FC<ModalEliminarPedidoProps> = ({ visible, onDismiss, pedidoId, cliente }) => {
  const { handleDelete, enProceso } = useOrdenEliminarForm(pedidoId)

  const handleConfirmDelete = async () => {
    await handleDelete()
    onDismiss()
  }

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>Eliminar Pedido</Dialog.Title>
        <Dialog.Content>
          {enProceso ? (
            <View className="flex-row justify-center items-center">
              <ActivityIndicator animating={true} size="small" />
              <Text className="ml-2">Eliminando pedido...</Text>
            </View>
          ) : (
            <>
            <Text>¿Estás seguro de que deseas eliminar este pedido?</Text>
            <Text>Id de pedido: {pedidoId}</Text>
            <Text>Pedido de cliente: {cliente}</Text>
            </>
          )}
        </Dialog.Content>
        {!enProceso && (
          <Dialog.Actions>
            <Button onPress={onDismiss}>Cancelar</Button>
            <Button onPress={handleConfirmDelete}>Eliminar</Button>
          </Dialog.Actions>
        )}
      </Dialog>
    </Portal>
  )
}
