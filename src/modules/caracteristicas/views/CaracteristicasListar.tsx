import { LoadMore } from '@/src/shared/components/LoadMore'
import { ErrorItemsComponent, LoadingComponent, NoItemsComponent } from '@/src/shared/components/StatusComponents'
import queryKeys from '@/src/shared/constants/queryKeys'
import { Attribute } from '@/src/shared/interfaces/AttributeModel'
import { AttributeType, AttributeTypesWithAttributes } from '@/src/shared/interfaces/AttributeTypeModel'
import { PaginatedResponse } from '@/src/shared/interfaces/extras/ApiResponses'
import React, { useEffect, useState } from 'react'
import { FlatList, RefreshControl, View } from 'react-native'
import { Button, Card, IconButton, List, Text } from 'react-native-paper'
import { mutate } from 'swr'
import { useTiposAtributosConValores } from '../hooks/useCaracteristicas'
import { AtributoCrearModal } from './Atributos/AtributosCrearModal'
import { AtributoEditarModal } from './Atributos/AtributosEditarModal'
import { AtributoEliminarModal } from './Atributos/AtributosEliminarModal'
import { TipoAtributoEditarModal } from './TipoAtributos/TipoAtributosEditModal'
import { TipoAtributoEliminarModal } from './TipoAtributos/TipoAtributosEliminarModal'

export default function TiposAtributosListScreen() {
    const [pagina, setPagina] = useState(1)
    const [limite, setLimite] = useState(10)
    const { tiposAtributos, cargando, error } = useTiposAtributosConValores(pagina, limite)

    const [tiposAcumulados, setTiposAcumulados] = useState<AttributeTypesWithAttributes[]>([])
    const [paginacion, setPaginacion] = useState<PaginatedResponse<AttributeTypesWithAttributes>["paginacion"] | null>(null)

    useEffect(() => {
        if (tiposAtributos?.data) {
            setTiposAcumulados((prev) =>
                pagina === 1 ? tiposAtributos.data : [...prev, ...tiposAtributos.data]
            )
            setPaginacion(tiposAtributos.paginacion)
        }
    }, [tiposAtributos])



    const handleRefresh = () => {
        mutate(queryKeys.tiposAtributosConValores(pagina, limite))
    }

    // Objeto individual
    const [tipoAtributoIndividual, setTipoAtributoIndividual] = useState<AttributeType | null>(null)

    // Modal para Tipo de atributos
    const [openTipoAttrModalEliminar, setTipoAttrOpenModalEliminar] = useState(false)
    const [openTipoAttrModalEditar, setTipoAttrOpenModalEditar] = useState(false)
    const handleTipoAttrEliminar = (tipoAtributo: AttributeTypesWithAttributes) => {
        setTipoAtributoIndividual(tipoAtributo)
        setTipoAttrOpenModalEliminar(true)
    }

    const handleTipoAttrEditar = (tipoAtributo: AttributeTypesWithAttributes) => {
        setTipoAtributoIndividual(tipoAtributo)
        setTipoAttrOpenModalEditar(true)
    }

    //Modal para atributos
    const [tipoAtributoIdParaCrear, setTipoAtributoIdParaCrear] = useState<number | null>(null)
    const [atributoIndividual, setAtributoIndividual] = useState<Attribute | null>(null)
    const [openAtributoModalCrear, setAtributoOpenModalCrear] = useState(false)
    const [openAtributoModalEliminar, setAtributoOpenModalEliminar] = useState(false)
    const [openAtributoModalEditar, setAtributoOpenModalEditar] = useState(false)
    const handleAtributoEliminar = (Atributo: Attribute) => {
        setAtributoIndividual(Atributo)
        setAtributoOpenModalEliminar(true)
    }
    const handleAtributoCrear = (Atributo: Attribute) => {
        setAtributoIndividual(Atributo)
        setTipoAtributoIdParaCrear(Atributo.tipo_atributo_id)
        setAtributoOpenModalCrear(true)
    }
    const handleAtributoEditar = (Atributo: Attribute) => {
        setAtributoIndividual(Atributo)
        setAtributoOpenModalEditar(true)
    }

    if (cargando && pagina === 1) return <LoadingComponent message="Cargando tipos de atributos..." />
    if ((tiposAtributos == undefined || !tiposAtributos.data) && pagina === 1) return <NoItemsComponent message="No hay tipos de atributos disponibles." />
    if (error) return <ErrorItemsComponent message="Error al cargar los tipos de atributos." />

    return (
        <>

            {tipoAtributoIndividual && openTipoAttrModalEliminar && (
                <>
                    <TipoAtributoEliminarModal id={tipoAtributoIndividual.id} nombre={tipoAtributoIndividual.nombre} onClose={() => setTipoAttrOpenModalEliminar(false)} visible={openTipoAttrModalEliminar}></TipoAtributoEliminarModal>
                </>
            )}

            {tipoAtributoIndividual && openTipoAttrModalEditar && (
                <>
                    <TipoAtributoEditarModal id={tipoAtributoIndividual.id} attributeTypeObj={tipoAtributoIndividual} onClose={() => setTipoAttrOpenModalEditar(false)} visible={openTipoAttrModalEditar}></TipoAtributoEditarModal>
                </>
            )}

            {atributoIndividual && openAtributoModalCrear && tipoAtributoIdParaCrear && (
                <AtributoCrearModal tipoAtributoId={tipoAtributoIdParaCrear} onClose={() => setAtributoOpenModalCrear(false)} visible={openAtributoModalCrear}></AtributoCrearModal>
            )}

            {atributoIndividual && openAtributoModalEditar && (
                <>
                    <AtributoEditarModal id={atributoIndividual.id} onClose={() => setAtributoOpenModalEditar(false)} visible={openAtributoModalEditar}></AtributoEditarModal>
                </>
            )}

            {atributoIndividual && openAtributoModalEliminar && (
                <>
                    <AtributoEliminarModal id={atributoIndividual.id} nombre={atributoIndividual.valor} onClose={() => setAtributoOpenModalEliminar(false)} visible={openAtributoModalEliminar}></AtributoEliminarModal>
                </>
            )}

            

            <FlatList
            style={{ marginVertical: 10}}
                data={tiposAcumulados}
                keyExtractor={(item) => item.id.toString()}
                refreshControl={<RefreshControl refreshing={cargando} onRefresh={handleRefresh} />}
                renderItem={({ item }) =>
                    <TipoAtributoCard
                        tipoAtributo={item}
                        handleEditar={handleTipoAttrEditar}
                        handleEliminar={handleTipoAttrEliminar}
                        handleCrearAtributo={handleAtributoCrear}
                        handleEditarAtributo={handleAtributoEditar}
                        handleEliminarAtributo={handleAtributoEliminar}
                    />
                }
                ListEmptyComponent={
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
                        <Text>No hay tipos de atributos disponibles</Text>
                    </View>
                }
                ListFooterComponent={
                    tiposAtributos?.paginacion ? (
                        <LoadMore
                            paginacion={tiposAtributos.paginacion}
                            cargando={cargando}
                            setPagina={setPagina}
                        />
                    ) : null
                }
            />
        </>
    )
}

const TipoAtributoCard = (
    { tipoAtributo, handleEliminar, handleEditar, handleCrearAtributo, handleEditarAtributo, handleEliminarAtributo }:
        {
            tipoAtributo: AttributeTypesWithAttributes,
            handleEliminar: (tipoAtributo: AttributeTypesWithAttributes) => void,
            handleEditar: (tipoAtributo: AttributeTypesWithAttributes) => void,
            handleCrearAtributo: (atributo: Attribute) => void,
            handleEditarAtributo: (atributo: Attribute) => void,
            handleEliminarAtributo: (atributo: Attribute) => void
        }) => {

    return (
        <Card style={{ margin: 10 }}>
            <Card.Title
                title={tipoAtributo.nombre}
                right={(props) => (
                    <View style={{ flexDirection: 'row' }}>
                        <IconButton
                            {...props}
                            icon="pencil"
                            onPress={() => handleEditar(tipoAtributo)}
                        />
                        <IconButton
                            {...props}
                            icon="delete"
                            iconColor="red"
                            onPress={() => handleEliminar(tipoAtributo)}
                        />
                    </View>
                )}
            />
            <Card.Content>
                <Text variant="bodyMedium">Atributos:</Text>

                {tipoAtributo.atributos.length === 0 ? (
                    <Text>Aún no hay elementos, empieza creando uno</Text>
                ) : (
                    tipoAtributo.atributos.map((atributo) => (
                        <List.Item
                            key={atributo.id}
                            title={atributo.valor}
                            left={(props) => <List.Icon {...props} icon="tag" />}
                            right={(props) => (
                                <View style={{ flexDirection: 'row' }}>
                                    <IconButton
                                        {...props}
                                        icon="pencil"
                                        onPress={() => handleEditarAtributo(atributo)}
                                    />
                                    <IconButton
                                        {...props}
                                        icon="delete"
                                        iconColor="red"
                                        onPress={() => handleEliminarAtributo(atributo)}
                                    />
                                </View>
                            )}
                        />
                    ))
                )}
                {/* Botón para agregar un nuevo atributo */}
                <Button
                    icon="plus"
                    mode="contained"
                    onPress={() => handleCrearAtributo(
                        { tipo_atributo_id: tipoAtributo.id, valor: '', id: 0 } // valor y id no son utilizados en la creación, pero se requiere un objeto Attribute
                    )}
                    style={{ marginTop: 10 }}
                >
                    Agregar atributo
                </Button>

            </Card.Content>
        </Card>
    )
}
