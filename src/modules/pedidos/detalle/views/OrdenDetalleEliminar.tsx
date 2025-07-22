import React from 'react'
import { View } from 'react-native'
import { ActivityIndicator, Button, Dialog, Portal, Text } from 'react-native-paper'
import { useDetalleOrdenEliminarForm } from '../hooks/useForms'

interface ModalEliminarDetallePedidoProps {
  visible: boolean
  onDismiss: () => void
  orderId: number
  detalleId: number,
}

export const ModalEliminarDetallePedido: React.FC<ModalEliminarDetallePedidoProps> = ({ visible, onDismiss, orderId, detalleId }) => {
  const { handleDelete, enProceso } = useDetalleOrdenEliminarForm(orderId, detalleId)

  const handleConfirmDelete = async () => {
    await handleDelete()
    onDismiss()
  }

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>Eliminar elemento de Pedido</Dialog.Title>
        <Dialog.Content>
          {enProceso ? (
            <View className="flex-row justify-center items-center">
              <ActivityIndicator animating={true} size="small" />
              <Text className="ml-2">Eliminando elemento de pedido...</Text>
            </View>
          ) : (
            <>
            <Text>¿Estás seguro de que deseas eliminar este elemento del pedido?</Text>
            <Text>Id del elemento: {detalleId}</Text>
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
