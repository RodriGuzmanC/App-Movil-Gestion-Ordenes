import { useTiposAtributosConValores } from '@/src/modules/caracteristicas/hooks/useCaracteristicas'
import { VariationAttributeWithRelations } from '@/src/shared/interfaces/VariationAttributeModel'
import { VariationWithRelations } from '@/src/shared/interfaces/VariationModel'
import React, { useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Button, Chip, Modal, Portal, Text, useTheme } from 'react-native-paper'
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

    const theme = useTheme()

    return (
        <Portal>
            <Modal visible={visible} onDismiss={onClose} contentContainerStyle={[styles.modal, { backgroundColor: theme.colors.background }]}>

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
                    style={styles.list}
                    ListHeaderComponent={() => (
                        <View>
                            <Text variant="titleMedium" style={styles.headerTitle}>
                                Atributos de la Variación N° {variacion.id}
                            </Text>
                        </View>
                    )}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                            <View style={styles.itemChipContainer} >
                                <View>
                                    <Text style={styles.label}>Tipo de Atributo:</Text>
                                    <Chip
                                        mode="flat"
                                        style={styles.chip}
                                        
                                    >
                                        {item.atributos.tipos_atributos.nombre}
                                    </Chip>
                                </View>

                                <View>
                                    <Text style={styles.label}>Atributo:</Text>
                                    <Chip
                                        mode="flat"
                                        style={styles.chipAtributo}
                                        compact
                                    >
                                        {item.atributos.valor}
                                    </Chip>
                                </View>
                            </View>

                            <View style={styles.actions}>
                                <Button mode="elevated" onPress={() => handleEdit(item)} icon="pencil">
                                    Editar
                                </Button>
                                <Button mode="elevated" onPress={() => handleDeleteAttribute(item)} icon="delete">
                                    Borrar
                                </Button>
                            </View>
                        </View>
                    )}
                    ListFooterComponent={() => (
                        <View style={styles.actions}>
                            <Button mode="contained" onPress={() => setOpenModalCrear(true)}>
                                Agregar nuevo
                            </Button>
                            <Button mode="outlined" onPress={onClose}>
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
    list: {
        padding: 9,
    },
    headerTitle: {
        fontWeight: 'bold',
        marginBottom: 20,
    },
    modal: {
        padding: 10,
        marginHorizontal: 20,
        borderRadius: 8,

    },
    itemContainer: {
        marginBottom: 16,
        padding: 12,
        borderRadius: 1,
        elevation: 1,
    },
    itemChipContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,

    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        marginTop: 8,
        marginBottom: 4,
    },
    chip: {
        marginBottom: 8,
    },
    chipAtributo: {
        marginBottom: 12,
    },

    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    button: {
        marginTop: 8,
    },
});

