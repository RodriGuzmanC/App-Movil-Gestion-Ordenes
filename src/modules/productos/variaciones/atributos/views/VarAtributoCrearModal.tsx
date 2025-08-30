import { useTiposAtributosConValores } from '@/src/modules/caracteristicas/hooks/useCaracteristicas'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Button, Modal, Portal, Text, useTheme } from 'react-native-paper'
import { Dropdown } from 'react-native-paper-dropdown'
import { useAtributoVariacionCrearForm } from '../hooks/useForms'

interface Props {
    visible: boolean
    onClose: () => void
    variacionId: number
    productoId: number
}

export const AtributoVariacionCrearModal = ({ visible, onClose, variacionId, productoId }: Props) => {
    const { tiposAtributos, cargando, error } = useTiposAtributosConValores()
    const { handleSubmit, enProceso, values, setFieldValue, errors, touched } = useAtributoVariacionCrearForm(productoId, variacionId)

    const [showTipoDrop, setShowTipoDrop] = useState(false)
    const [showAttrDrop, setShowAttrDrop] = useState(false)
    const [tipoSeleccionado, setTipoSeleccionado] = useState<string | undefined>()
    const [atributoSeleccionado, setAtributoSeleccionado] = useState<string | undefined>()

    if (cargando) return null
    if (error) return <Text>Error al cargar los tipos de atributos</Text>

    const atributosFiltrados = tiposAtributos?.data.find(t => t.id.toString() === tipoSeleccionado)?.atributos || []

    const handleTipoChange = (value: string | undefined) => {
        setTipoSeleccionado(value)
        setFieldValue('variacion_id', variacionId)
        setFieldValue('atributo_id', 0) // Reiniciar el atributo cuando cambia el tipo
    }

    const handleAtributoChange = (value: string | undefined) => {
        setAtributoSeleccionado(value)
        setFieldValue('atributo_id', value)
        setFieldValue('variacion_id', variacionId)

    }

    async function handleSubmitAndClose() {
        await handleSubmit()
    }

    const theme = useTheme()

    return (
        <Portal>
            <Modal visible={visible} onDismiss={onClose} contentContainerStyle={[styles.modalContainer, { backgroundColor: theme.colors.background }]}>
                <Text variant="titleMedium" style={{ marginBottom: 10 }}>Agregar Atributo a Variación</Text>

                <Dropdown
                    label="Tipo de Atributo"
                    mode="outlined"
                    value={tipoSeleccionado || ''}
                    onSelect={handleTipoChange}
                    options={tiposAtributos?.data.map(tipo => ({ label: tipo.nombre, value: tipo.id.toString() })) || []}
                />

                <Dropdown
                    label="Atributo"
                    mode="outlined"
                    value={values.atributo_id?.toString() || ''}
                    onSelect={handleAtributoChange}
                    options={atributosFiltrados.map(attr => ({ label: attr.valor, value: attr.id.toString() }))}
                    error={touched.atributo_id && !!errors.atributo_id}
                />

                <Button
                    mode="contained"
                    onPress={() => {
                        console.log('Submitting form with values:', values)
                        handleSubmitAndClose()
                    }}
                    loading={enProceso}
                    disabled={!tipoSeleccionado || !atributoSeleccionado}
                    style={{ marginTop: 20 }}
                >
                    Guardar
                </Button>

                <Button onPress={onClose} style={{ marginTop: 10 }}>Cancelar</Button>
            </Modal>
        </Portal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        padding: 20,
        margin: 20,
        borderRadius: 10,
    },
})
