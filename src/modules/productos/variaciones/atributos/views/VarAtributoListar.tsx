import { useTiposAtributosConValores } from '@/src/modules/caracteristicas/hooks/useCaracteristicas'
import { VariationAttributeWithRelations } from '@/src/shared/interfaces/VariationAttributeModel'
import { VariationWithRelations } from '@/src/shared/interfaces/VariationModel'
import React, { useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Button, Modal, Portal, Text } from 'react-native-paper'
import { Dropdown } from 'react-native-paper-dropdown'
import { AtributoVariacionCrearModal } from './VarAtributoCrearModal'
import { AtributoVariacionEditarModal } from './VarAtributoEditModal'
import { AtributoVariacionEliminarModal } from './VarAtributoEliminarModal'

interface Props {
    visible: boolean
    onClose: () => void
    variacion: VariationWithRelations
}

export const ListaAtributosVariacion = ({ variacion, visible, onClose }: Props) => {

    const { tiposAtributos, cargando, error } = useTiposAtributosConValores()

    const [showDropDowns, setShowDropDowns] = useState<{ [key: number]: boolean }>({})
    const [selectedTypes, setSelectedTypes] = useState<{ [key: number]: string }>({})
    const [selectedAttributes, setSelectedAttributes] = useState<{ [key: number]: string }>({})

    const [openModalEliminar, setOpenModalEliminar] = useState(false)
    const [variaAtributoSeleccionado, setVariAtributoSeleccionado] = useState<VariationAttributeWithRelations | null>(null)

    const [openModalCrear, setOpenModalCrear] = useState(false)
    const [openModalEditar, setOpenEditarModal] = useState(false)


    const handleEdit = (VariacionAtributo: VariationAttributeWithRelations) => {
        setVariAtributoSeleccionado(VariacionAtributo)
        setOpenEditarModal(true)
    }

    if (cargando) return <Text>Cargando tipos de atributos...</Text>
    if (error) return <Text>Error al cargar tipos de atributos</Text>

    const handleTypeChange = (index: number, tipoId: string | undefined) => {
        if (!tipoId) return // No type selected, do nothing
        setSelectedTypes(prev => ({ ...prev, [index]: tipoId }))
        setSelectedAttributes(prev => ({ ...prev, [index]: '' })) // Reset attribute selection when type changes
    }

    const handleAttributeChange = (index: number, atributoId: string | undefined) => {
        if (!atributoId) return // No type selected, do nothing

        setSelectedAttributes(prev => ({ ...prev, [index]: atributoId }))
    }

    const handleDeleteAttribute = (VarAtributoObj: VariationAttributeWithRelations) => {
        setVariAtributoSeleccionado(VarAtributoObj)
        setOpenModalEliminar(true)
    }

    return (
        <Portal>
            <Modal visible={visible} onDismiss={onClose} contentContainerStyle={styles.modal}>

                {openModalEliminar && variaAtributoSeleccionado && (
                    <AtributoVariacionEliminarModal
                        visible={openModalEliminar}
                        onClose={() => setOpenModalEliminar(false)}
                        productoId={variacion.producto_id}
                        variacionId={variacion.id}
                        varAtributoId={variaAtributoSeleccionado.id}
                        nombreAtributo={variaAtributoSeleccionado.atributos.valor}
                        nombreTipoAtributo={variaAtributoSeleccionado.atributos.tipos_atributos.nombre}
                    />
                )}

                {openModalCrear && (
                    <AtributoVariacionCrearModal
                        visible={openModalCrear}
                        onClose={() => setOpenModalCrear(false)}
                        variacionId={variacion.id}
                        productoId={variacion.producto_id}
                    />
                )}

                {openModalEditar && variaAtributoSeleccionado && (
                    <AtributoVariacionEditarModal
                        visible={openModalEditar}
                        onClose={() => setOpenEditarModal(false)}
                        atributoVariacionObj={variaAtributoSeleccionado}
                        productoId={variacion.producto_id}
                        variacionId={variacion.id}
                    />
                )}

                <FlatList
                    data={variacion.variaciones_atributos}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item, index }) => {
                        const tipoSeleccionado = selectedTypes[index] ?? item.atributos.tipo_atributo_id.toString()
                        const atributoSeleccionado = selectedAttributes[index] ?? item.atributos.id.toString()

                        const atributosFiltrados = tiposAtributos?.data.find(t => t.id.toString() === tipoSeleccionado)?.atributos || []

                        return (
                            <View style={styles.itemContainer}>
                                <Text style={styles.label}>Tipo de Atributo:</Text>
                                <Dropdown
                                    label="Tipo de Atributo"
                                    mode="outlined"
                                    value={tipoSeleccionado}
                                    onSelect={(value) => handleTypeChange(index, value)}
                                    options={tiposAtributos?.data.map(tipo => ({ label: tipo.nombre, value: tipo.id.toString() })) || []}
                                />

                                <Text style={styles.label}>Atributo:</Text>
                                <Dropdown
                                    label="Atributo"
                                    mode="outlined"
                                    value={atributoSeleccionado}
                                    onSelect={(value) => handleAttributeChange(index, value)}
                                    options={atributosFiltrados.map(attr => ({ label: attr.valor, value: attr.id.toString() }))}
                                />
                                <Button mode='contained' onPress={() => handleDeleteAttribute(item)} icon='delete'>borrar</Button>
                                <Button mode='contained' onPress={() => handleEdit(item)} icon='pencil'>editar</Button>
                            </View>
                        )
                    }}
                    ListFooterComponent={() => (
                        <View style={styles.actions}>
                            <Button mode="contained" onPress={() => setOpenModalCrear(true)} style={styles.button}>
                                Agregar nuevo
                            </Button>
                            <Button
                                mode="outlined"
                                onPress={onClose}
                            >
                                Salir
                            </Button>
                        </View>
                    )}
                />
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
    itemContainer: {
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
    },
    label: {
        marginBottom: 4,
        fontWeight: 'bold',
    },
    actions: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        gap: 10,
        marginTop: 20,
    },
    button: {
        minWidth: 100,
    },
})
