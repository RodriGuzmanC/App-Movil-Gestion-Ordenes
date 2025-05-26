// components/ProductoEliminarModal.tsx
import React from 'react'
import { Button, Modal, StyleSheet, Text, View } from 'react-native'
import { useEliminarProducto } from '../hooks/useProductos'

export const ProductoEliminarModal = ({ id, visible, onClose }: { id: number | string, visible: boolean, onClose: () => void }) => {
    const { ejecutarEliminar, enProceso, error } = useEliminarProducto(id)

    const handleDelete = async () => {
        await ejecutarEliminar()
        onClose()
    }

    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <Text>¿Estás seguro que deseas eliminar este producto?</Text>
                    {error && <Text style={styles.error}>{error}</Text>}
                    <View style={styles.actions}>
                        <Button title="Cancelar" onPress={onClose} />
                        <Button title={enProceso ? 'Eliminando...' : 'Eliminar'} onPress={handleDelete} color="red" />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modal: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    actions: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    error: {
        color: 'red',
        marginTop: 10,
    },
})
