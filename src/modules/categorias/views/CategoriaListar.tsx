import { LoadMore } from '@/src/shared/components/LoadMore'
import { ErrorItemsComponent, LoadingComponent, NoItemsComponent } from '@/src/shared/components/StatusComponents'
import { useCatchErrors } from '@/src/shared/hooks/useCatchErorrs'
import { Category } from '@/src/shared/interfaces/CategoryModel'
import { PaginatedResponse } from '@/src/shared/interfaces/extras/ApiResponses'
import { useEffect, useState } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { Button, Card, Text } from 'react-native-paper'
import { useCategorias } from '../hooks/useCategorias'
import { CategoriaCrearModal } from './CategoriaCrearModal'
import { CategoriaEditarModal } from './CategoriaEditarModal'
import { CategoriaEliminarModal } from './CategoriaEliminarModal'


export const CategoriaListar = () => {
    const [pagina, setPagina] = useState(1)
    const [limite, setLimite] = useState(10)
    const { categorias, cargando, error } = useCategorias(pagina, limite)

    const [categoriasAcumuladas, setCategoriasAcumuladas] = useState<Category[]>([])
    const [paginacion, setPaginacion] = useState<PaginatedResponse<Category>["paginacion"] | null>(null)

    const { catchErrors } = useCatchErrors()

    useEffect(() => {
        if (categorias?.data) {
            setCategoriasAcumuladas((prev) =>
                pagina === 1 ? categorias.data : [...prev, ...categorias.data]
            )
            setPaginacion(categorias.paginacion)
        }
    }, [categorias])

    const [categoriaIndividual, setCategoriaIndividual] = useState<Category | null>(null)
    const [openEliminarModal, setOpenEliminarModal] = useState(false)
    const [openEditarModal, setOpenEditarModal] = useState(false)
    const [openCrearModal, setOpenCrearModal] = useState(false)

    const handleEliminar = (categoryObj: Category) => {
        setCategoriaIndividual(categoryObj)
        setOpenEliminarModal(true)
    }

    const handleEditar = (categoryObj: Category) => {
        setCategoriaIndividual(categoryObj)
        setOpenEditarModal(true)
    }

    if (cargando && pagina === 1) return <LoadingComponent message="Cargando categorías..." />
    if ((categorias == undefined || !categorias.data) && pagina === 1) return <NoItemsComponent message="No hay categorías disponibles." />
    if (error) return <ErrorItemsComponent message="Error al cargar las categorías." />

    return (
        <>
            {openCrearModal && (
                <CategoriaCrearModal visible={openCrearModal} onClose={() => setOpenCrearModal(false)}></CategoriaCrearModal>

            )}

            {categoriaIndividual && openEliminarModal && (
                <CategoriaEliminarModal
                    nombre={categoriaIndividual.nombre}
                    id={categoriaIndividual.id}
                    visible={openEliminarModal}
                    onClose={() => setOpenEliminarModal(false)}
                >
                </CategoriaEliminarModal>
            )}

            {categoriaIndividual && openEditarModal && (
                <CategoriaEditarModal
                    categoriaObj={categoriaIndividual}
                    visible={openEditarModal}
                    onClose={() => setOpenEditarModal(false)}
                />
            )}

            <Button
                mode="contained"
                onPress={() => setOpenCrearModal(true)}
                style={{ margin: 16 }}>Crear categoria</Button>
            <FlatList
                data={categoriasAcumuladas}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContainer}
                renderItem={({ item }) => (
                    <Card style={styles.card} mode="elevated">
                        <Card.Content>
                            <Text variant="titleMedium">
                                {item.nombre}
                            </Text>
                            <Text variant="bodyMedium" numberOfLines={2}>
                                {item.descripcion || 'Sin descripción'}
                            </Text>
                        </Card.Content>
                        <Card.Actions style={styles.actions}>
                            <Button mode="text" onPress={() => handleEditar(item)}>Editar</Button>
                            <Button mode="text" textColor="red" onPress={() => handleEliminar(item)}>Eliminar</Button>
                        </Card.Actions>
                    </Card>
                )}
                ListFooterComponent={
                    categorias?.paginacion ? (
                        <LoadMore
                            cargando={cargando}
                            paginacion={categorias?.paginacion}
                            setPagina={setPagina}
                        />
                    ) : null
                }
            />
        </>
    )
}

export const styles = StyleSheet.create({
    listContainer: {
        padding: 16,
    },
    card: {
        marginBottom: 16,
        borderRadius: 12,
        elevation: 2,
    },

    actions: {
        justifyContent: 'flex-end',
        paddingRight: 12,
        paddingBottom: 8,
    },
    footer: {
        padding: 16,
        alignItems: 'center',
    },
})