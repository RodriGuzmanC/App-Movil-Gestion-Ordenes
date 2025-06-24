import { ErrorItemsComponent, LoadingComponent, NoItemsComponent } from '@/src/shared/components/StatusComponents';
import { Category } from '@/src/shared/interfaces/CategoryModel';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Checkbox, List } from 'react-native-paper';
import { useCategorias } from '../hooks/useCategorias';

interface CategoriaListarCheckListProps {
    productId: number;
    enProceso: boolean;
    initialCategories?: (number)[];
}

export const CategoriaListarCheckList: React.FC<CategoriaListarCheckListProps> = ({
    productId,
    enProceso,
    initialCategories = [],
}) => {
    const [seleccionadas, setSeleccionadas] = useState<number[]>([]);

    const [pagina, setPagina] = useState(1)
    const [limite, setLimite] = useState(50)
    const { categorias, cargando, error } = useCategorias(pagina, limite)


    // Inicializa las categorías seleccionadas si se pasan categorías iniciales
    const yaInicializado = useRef(false);

    useEffect(() => {
        if (categorias && !yaInicializado.current) {
            setSeleccionadas(initialCategories);
            // Evita que se ejecute inmediatamente al montar el componente
            setCategoriasSeleccionadas(
                categorias.data.filter((cat) => initialCategories.includes(cat.id))
            );
            yaInicializado.current = true; // Evita llamadas repetidas

        }
    }, [categorias]);


    // Maneja el cambio de pagina
    const toggleSeleccion = (categoria: Category) => {
        setSeleccionadas((prevSeleccionadas) => {
            const yaSeleccionada = prevSeleccionadas.includes(categoria.id);
            const nuevasSeleccionadas = yaSeleccionada
                ? prevSeleccionadas.filter((id) => id !== categoria.id)
                : [...prevSeleccionadas, categoria.id];

            if (categorias != undefined) {
                setCategoriasSeleccionadas(
                    categorias.data.filter((cat) => nuevasSeleccionadas.includes(cat.id))
                );
            }

            return nuevasSeleccionadas;
        });
    };


    if (cargando || categorias == undefined && pagina === 1) return <LoadingComponent message="Cargando categorías..." />
    if (!categorias) return <NoItemsComponent message="No hay categorías disponibles." />
    if (error || categorias.error) return <ErrorItemsComponent message="Error al cargar las categorías." />

    return (
        <View>
            <List.Section title="Selecciona las categorías">
                {categorias.data.map((categoria) => (
                    <List.Item
                        key={categoria.id}
                        title={categoria.nombre}
                        left={() => (
                            <Checkbox
                                status={seleccionadas.includes(categoria.id) ? 'checked' : 'unchecked'}
                                onPress={() => toggleSeleccion(categoria)}
                            />
                        )}
                        onPress={() => toggleSeleccion(categoria)}
                    />
                ))}
            </List.Section>
            

            <Button mode='outlined' onPress={() => console.log(seleccionadas)}>Muestra</Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    dropdown: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
    },
    placeholderStyle: {
        fontSize: 16,
        color: '#aaa',
    },
    selectedTextStyle: {
        fontSize: 16,
        color: '#333',
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});