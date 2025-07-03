import { VariationWithRelations } from '@/src/shared/interfaces/VariationModel'
import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { ActivityIndicator, Button, HelperText, Modal, Portal, Text, TextInput } from 'react-native-paper'
import { ListaAtributosVariacion } from '../atributos/views/VarAtributoListar'
import { useVariacionEditarForm } from '../hooks/useForms'

interface VariacionEditarModalProps {
    visible: boolean
    onClose: () => void
    idProducto: number
    idVariacion: number
    variacionObj: VariationWithRelations
}

export const VariacionEditarModal = ({ visible, onClose, idProducto, idVariacion, variacionObj }: VariacionEditarModalProps) => {
    const {
        handleChange,
        handleBlur,
        handleSubmit,
        enProceso,
        values,
        errors,
        touched,
    } = useVariacionEditarForm(idProducto, idVariacion, variacionObj)

    async function handleSubmitAndClose() {
        await handleSubmit()
        onClose()
    }

    const [openModalListar, setOpenModalListar] = useState(false)

    return (
        <Portal>
            <Modal visible={visible} onDismiss={onClose} contentContainerStyle={styles.modal}>
                <Text variant="titleMedium" style={styles.title}>
                    Editar Variación
                </Text>

                {openModalListar && (
                    <ListaAtributosVariacion visible={openModalListar} onClose={() => setOpenModalListar(false)} variacion={variacionObj}></ListaAtributosVariacion>
                )}
                    
                <>
                    <TextInput
                        label="Precio Unitario"
                        value={values.precio_unitario.toString()}
                        onChangeText={handleChange('precio_unitario')}
                        onBlur={handleBlur('precio_unitario')}
                        mode="outlined"
                        keyboardType="numeric"
                        error={touched.precio_unitario && !!errors.precio_unitario}
                        style={styles.input}
                    />
                    <HelperText type="error" visible={!!errors.precio_unitario && touched.precio_unitario}>
                        {errors.precio_unitario}
                    </HelperText>

                    <TextInput
                        label="Precio Mayorista"
                        value={values.precio_mayorista.toString()}
                        onChangeText={handleChange('precio_mayorista')}
                        onBlur={handleBlur('precio_mayorista')}
                        mode="outlined"
                        keyboardType="numeric"
                        error={touched.precio_mayorista && !!errors.precio_mayorista}
                        style={styles.input}
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
                        style={styles.input}
                    />
                    <HelperText type="error" visible={!!errors.stock && touched.stock}>
                        {errors.stock}
                    </HelperText>

                    <Button mode='contained-tonal' onPress={() => setOpenModalListar(true)}>Ver caracteristicas</Button>

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
