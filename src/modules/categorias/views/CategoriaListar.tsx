import { LoadMore } from '@/src/shared/components/LoadMore'
import { ErrorItemsComponent, LoadingComponent, NoItemsComponent } from '@/src/shared/components/StatusComponents'
import { useCatchErrors } from '@/src/shared/hooks/useCatchErorrs'
import { Category } from '@/src/shared/interfaces/CategoryModel'
import { PaginatedResponse } from '@/src/shared/interfaces/extras/ApiResponses'
import { useEffect, useState } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { Button, Card } from 'react-native-paper'
import { useCategorias } from '../hooks/useCategorias'
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

            <FlatList
                data={categoriasAcumuladas}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContainer}
                renderItem={({ item }) => (
                    <Card style={styles.card} mode="elevated">
                        <Card.Title
                            title={item.nombre}
                            titleVariant="titleLarge"
                            subtitle={item.descripcion || 'Sin descripción'}
                            subtitleNumberOfLines={2}
                            titleStyle={styles.cardTitle}
                        />
                        <Card.Actions style={styles.actions}>
                            <Button
                                mode="outlined"
                                icon="pencil"
                                onPress={() => handleEditar(item)}
                                style={styles.actionButton}
                            >
                                Editar
                            </Button>
                            <Button
                                mode="outlined"
                                icon="delete"
                                textColor="red"
                                onPress={() => handleEliminar(item)}
                                style={styles.actionButton}
                            >
                                Eliminar
                            </Button>
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
    createButton: {
        margin: 16,
        borderRadius: 12,
        paddingVertical: 6,
    },
    listContainer: {
        padding: 16,
    },
    card: {
        marginBottom: 16,
        borderRadius: 16,
        elevation: 3,
    },
    cardTitle: {
        fontWeight: 'bold',
    },
    actions: {
        justifyContent: 'flex-end',
        paddingRight: 12,
        paddingBottom: 12,
    },
    actionButton: {
        marginLeft: 8,
        borderRadius: 8,
    },
    footer: {
        padding: 16,
        alignItems: 'center',
    },

});
