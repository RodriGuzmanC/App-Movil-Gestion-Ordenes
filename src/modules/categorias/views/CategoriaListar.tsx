import { ErrorItemsComponent, LoadingComponent, NoItemsComponent } from '@/src/shared/components/StatusComponents'
import { useCatchErrors } from '@/src/shared/hooks/useCatchErorrs'
import { Category } from '@/src/shared/interfaces/CategoryModel'
import { PaginatedResponse } from '@/src/shared/interfaces/extras/ApiResponses'
import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Button, Card, Text } from 'react-native-paper'
import { useCategorias } from '../hooks/useCategorias'


export const CategoriaListar = () => {
    const [categoriaAEliminar, setCategoriaAEliminar] = useState<number | string | null>(null)
    const [pagina, setPagina] = useState(1)
    const [limite, setLimite] = useState(10)
    const { categorias, cargando, error } = useCategorias(pagina, limite)

    const [categoriasAcumuladas, setCategoriasAcumuladas] = useState<Category[]>([])
    const [paginacion, setPaginacion] = useState<PaginatedResponse<Category>["paginacion"] | null>(null)

    const { catchErrors } = useCatchErrors()
    const router = useRouter()

    useEffect(() => {
        if (categorias?.data) {
            setCategoriasAcumuladas((prev) =>
                pagina === 1 ? categorias.data : [...prev, ...categorias.data]
            )
            setPaginacion(categorias.paginacion)
        }
    }, [categorias])

    const cargarMas = () => {
        catchErrors(async () => {
            if (!paginacion || cargando) return
            if (paginacion.pagina_actual < paginacion.total_paginas) {
                setPagina((prev) => prev + 1)
            }
        })
    }

    const handleEditar = (id: number) => {
        router.push({
            pathname: '/categorias',
            params: { id: id.toString() }
        })
    }

    const handleEliminar = (id: number) => {
        setCategoriaAEliminar(id)
    }

    if (cargando && pagina === 1) return <LoadingComponent message="Cargando categorías..." />
    if ((categorias == undefined || !categorias.data) && pagina === 1) return <NoItemsComponent message="No hay categorías disponibles." />
    if (error) return <ErrorItemsComponent message="Error al cargar las categorías." />

    return (
        <>
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
                            <Button mode="text" onPress={() => handleEditar(item.id)}>Editar</Button>
                            <Button mode="text" textColor="red" onPress={() => handleEliminar(item.id)}>Eliminar</Button>
                        </Card.Actions>
                    </Card>
                )}
                ListFooterComponent={
                    paginacion && (
                        <View style={styles.footer}>
                            {cargando ? (
                                <Text>Cargando más...</Text>
                            ) : (
                                <Button mode="contained" onPress={cargarMas}>
                                    Cargar más
                                </Button>
                            )}
                        </View>
                    )
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