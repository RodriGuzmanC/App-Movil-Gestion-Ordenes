import { useTiposAtributosConValores } from '@/src/modules/caracteristicas/hooks/useCaracteristicas'
import { VariationAttributeWithRelations } from '@/src/shared/interfaces/VariationAttributeModel'
import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { ActivityIndicator, Button, HelperText, Modal, Portal, Text } from 'react-native-paper'
import { Dropdown } from 'react-native-paper-dropdown'
import { useAtributoVariacionEditarForm } from '../hooks/useForms'

export const AtributoVariacionEditarModal = ({
    visible,
    onClose,
    atributoVariacionObj,
    productoId,
    variacionId
}: {
    visible: boolean
    onClose: () => void
    atributoVariacionObj: VariationAttributeWithRelations
    productoId: number
    variacionId: number
}) => {

    const { tiposAtributos, cargando } = useTiposAtributosConValores()

    const {
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        enProceso,
        setFieldValue,
    } = useAtributoVariacionEditarForm(productoId, variacionId, atributoVariacionObj.id, atributoVariacionObj)

    // Estado para controlar el tipo seleccionado (fuera del formulario)
    const [tipoIdSeleccionado, setTipoIdSeleccionado] = useState<number>(atributoVariacionObj.atributos.tipo_atributo_id)

    const handleTipoChange = (value: string | undefined) => {
        const tipoId = value ? parseInt(value) : 0
        setTipoIdSeleccionado(tipoId)
        setFieldValue('atributo_id', 0) // Reinicia el atributo cuando cambia el tipo
    }

    const handleAtributoChange = (value: string | undefined) => {
        const tipoId = value ? parseInt(value) : 0
        setFieldValue('atributo_id', parseInt(value ?? '0')) // Reinicia el atributo cuando cambia el tipo
    }

    const handleSubmitAndClose = async () => {
        await handleSubmit()
        onClose()
    }

    return (
        <Portal>
            <Modal visible={visible} onDismiss={onClose} contentContainerStyle={styles.modal}>
                <Text variant="titleMedium" style={styles.title}>Editar Atributo de Variación</Text>

                {cargando ? (
                    <ActivityIndicator />
                ) : (
                    <>
                        {/* Dropdown de Tipos de Atributo */}
                        <Dropdown
                            label="Tipo de Atributo"
                            mode="outlined"
                            value={tipoIdSeleccionado?.toString()}
                            onSelect={handleTipoChange}
                            options={tiposAtributos?.data.map(tipo => ({
                                label: tipo.nombre,
                                value: tipo.id.toString()
                            })) || []}
                            disabled={true}
                        />


                        {/* Dropdown de Atributos */}
                        <Dropdown
                            label="Atributo"
                            mode="outlined"
                            value={values.atributo_id?.toString()}
                            onSelect={handleAtributoChange}
                            options={
                                tiposAtributos?.data
                                    .find(tipo => tipo.id === tipoIdSeleccionado)
                                    ?.atributos.map(atributo => ({
                                        label: atributo.valor,
                                        value: atributo.id.toString()
                                    })) || []
                            }
                        />

                        <HelperText type="error" visible={!!errors.atributo_id && touched.atributo_id}>
                            {errors.atributo_id}
                        </HelperText>

                        {/* Acciones */}
                        <View style={styles.actions}>
                            <Button mode="outlined" onPress={onClose} style={styles.button}>
                                Cancelar
                            </Button>
                            <Button
                                mode="contained"
                                onPress={handleSubmitAndClose}
                                disabled={enProceso}
                                style={styles.button}
                                textColor='white'
                            >
                                {enProceso ? 'Guardando...' : 'Guardar Cambios'}
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
