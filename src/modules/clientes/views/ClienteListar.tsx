import { LoadMore } from '@/src/shared/components/LoadMore'
import { ErrorItemsComponent, LoadingComponent, NoItemsComponent } from '@/src/shared/components/StatusComponents'
import queryKeys from '@/src/shared/constants/queryKeys'
import { Client } from '@/src/shared/interfaces/ClientModel'
import { PaginatedResponse } from '@/src/shared/interfaces/extras/ApiResponses'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { FlatList, RefreshControl, View } from 'react-native'
import { Button, Card, Text } from 'react-native-paper'
import { mutate } from 'swr'
import { useClientes } from '../hooks/useClientes'
import { ClienteCrearModal } from './ClienteCrearForm'
import { ClienteEditarModal } from './ClienteEditarModal'
import { ClienteEliminarModal } from './ClienteEliminarModal'

export default function ClienteListScreen() {
    // Estados para paginación y clientes
    const [pagina, setPagina] = useState(1)
    const [limite, setLimite] = useState(10)
    const { clientes, cargando, error } = useClientes(pagina, limite)
    const router = useRouter()

    // Basico para paginacion
    const [clientesAcumulados, setClientesAcumulados] = useState<Client[]>([])
    const [paginacion, setPaginacion] = useState<PaginatedResponse<Client>["paginacion"] | null>(null)

    // Paginacion inicial
    useEffect(() => {
        if (clientes?.data) {
            setClientesAcumulados((prev) =>
                pagina === 1 ? clientes.data : [...prev, ...clientes.data]
            )
            setPaginacion(clientes.paginacion)
        }
    }, [clientes])

    // Estado para manejar la apertura del modal de eliminacion, creacion y edicion
    const [modalDeleteVisible, setModalDeleteVisible] = useState(false)
    const [modalCreateVisible, setModalCreateVisible] = useState(false)
    const [modalEditVisible, setModalEditVisible] = useState(false)

    const [clienteIndividual, setClienteIndividual] = useState<Client | null>(null)

    const handleEliminar = (cliente: Client) => {
        setClienteIndividual(cliente)
        setModalDeleteVisible(true)
    }

    const handleEditar = (cliente: Client) => {
        setClienteIndividual(cliente)
        setModalEditVisible(true)
    }


    const handleRefresh = () => {
        mutate(queryKeys.clientes)
    }

    if (cargando && pagina === 1) return <LoadingComponent message="Cargando categorías..." />
    if ((clientes == undefined || !clientes.data) && pagina === 1) return <NoItemsComponent message="No hay categorías disponibles." />
    if (error) return <ErrorItemsComponent message="Error al cargar las categorías." />

    return (
        <>
            <ClienteCrearModal onClose={() => setModalCreateVisible(false)} visible={modalCreateVisible}></ClienteCrearModal>
            <Button mode='contained' onPress={() => setModalCreateVisible(true)}>Crear cliente</Button>
            {clienteIndividual && (
                <>
                    <ClienteEliminarModal
                        id={clienteIndividual?.id}
                        nombre={clienteIndividual.nombre}
                        onClose={() => setModalDeleteVisible(false)}
                        visible={modalDeleteVisible}></ClienteEliminarModal>
                    <ClienteEditarModal
                        id={clienteIndividual?.id}
                        nombre={clienteIndividual.nombre}
                        onClose={() => setModalEditVisible(false)}
                        visible={modalEditVisible}></ClienteEditarModal>
                </>
            )
            }

            <FlatList
                data={clientesAcumulados}
                keyExtractor={(item) => item.id.toString()}
                refreshControl={<RefreshControl refreshing={cargando} onRefresh={handleRefresh} />}
                renderItem={
                    ({ item }) => <ClienteCard cliente={item} handleEditar={handleEditar} handleEliminar={handleEliminar} />
                }
                ListEmptyComponent={
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
                        <Text>No hay clientes disponibles</Text>
                    </View>
                }
                ListFooterComponent={
                    clientes?.paginacion ? (
                        <LoadMore
                            paginacion={clientes.paginacion}
                            cargando={cargando}
                            setPagina={setPagina}
                        />
                    ) : null
                }
            />
        </>
    )
}

// Componente ClienteCard individual
const ClienteCard = (
    { cliente, handleEliminar, handleEditar }:
        { cliente: Client, handleEliminar: (cliente: Client) => void, handleEditar: (cliente: Client) => void }) => {

    return (
        <Card style={{ margin: 10 }}>
            <Card.Title title={cliente.nombre} />
            <Card.Content>
                <Text variant="bodyMedium">{cliente.nombre}</Text>
            </Card.Content>
            <Card.Actions>
                <Button
                    mode="outlined"
                    onPress={() => handleEditar(cliente)}
                    style={{ marginRight: 10 }}
                >
                    Editar
                </Button>
                <Button
                    mode="contained"
                    onPress={() => handleEliminar(cliente)}
                    buttonColor="red"
                    textColor="white"
                >
                    Eliminar
                </Button>
            </Card.Actions>
        </Card>
    )
}
