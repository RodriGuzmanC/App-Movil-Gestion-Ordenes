import { OrderDetail } from '@/src/shared/interfaces/OrderDetailModel'
import { StyleSheet, View } from 'react-native'
import { ActivityIndicator, Button, HelperText, Modal, Portal, Text, TextInput } from 'react-native-paper'
import { useDetalleOrdenEditarForm } from '../hooks/useForms'

interface VariacionEditarModalProps {
    visible: boolean
    onClose: () => void
    orderDetailObj: OrderDetail
    orderId: number
    detalleId: number
}

export const OrdenDetalleEditar = ({ visible, onClose, orderId, detalleId, orderDetailObj }: VariacionEditarModalProps) => {
    const {
        handleChange,
        handleBlur,
        handleSubmit,
        enProceso,
        values,
        errors,
        touched,
    } = useDetalleOrdenEditarForm(orderId, detalleId, orderDetailObj)

    async function handleSubmitAndClose() {
        await handleSubmit()
        onClose()
    }

    return (
        <Portal>
            <Modal visible={visible} onDismiss={onClose} contentContainerStyle={styles.modal}>
                <Text variant="titleMedium" style={styles.title}>
                    Editando detalle de orden
                </Text>

                <>
                    <TextInput
                        label="Cantidad"
                        value={values.cantidad.toString()}
                        mode="outlined"
                        disabled={true}
                        keyboardType="numeric"
                        error={touched.cantidad && !!errors.cantidad}
                        style={styles.input}
                    />
                    <HelperText type="error" visible={!!errors.cantidad && touched.cantidad}>
                        {errors.cantidad}
                    </HelperText>

                    <TextInput
                        label="Precio"
                        value={values.precio.toString()}
                        disabled={true}
                        mode="outlined"
                        keyboardType="numeric"
                        error={touched.precio && !!errors.precio}
                        style={styles.input}
                    />
                    <HelperText type="error" visible={!!errors.precio && touched.precio}>
                        {errors.precio}
                    </HelperText>

                    <TextInput
                        label="Precio final"
                        value={values.precio_rebajado.toString()}
                        onChangeText={handleChange('precio_rebajado')}
                        onBlur={handleBlur('precio_rebajado')}
                        mode="outlined"
                        keyboardType="numeric"
                        error={touched.precio_rebajado && !!errors.precio_rebajado}
                        style={styles.input}
                    />
                    <HelperText type="error" visible={!!errors.precio_rebajado && touched.precio_rebajado}>
                        {errors.precio_rebajado}
                    </HelperText>

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
                            {enProceso ? 'Guardando...' : 'Guardar Cambios'}
                        </Button>
                    </View>

                    {enProceso && <ActivityIndicator style={{ marginTop: 10 }} />}
                </>
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
        maxHeight: '100%'
    },
    title: {
        marginBottom: 10,
        fontWeight: 'bold',
    },
    input: {
        marginBottom: 8,
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
