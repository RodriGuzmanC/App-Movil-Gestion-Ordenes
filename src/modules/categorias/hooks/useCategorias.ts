import queryKeys from '@/src/shared/constants/queryKeys'
import { Category } from '@/src/shared/interfaces/CategoryModel'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import {
    crearCategoria,
    editarCategoria,
    eliminarCategoria,
    getCategoriaById,
    getCategorias,
} from '../api/categoriaApi'

// Obtener todas las categorías con paginación
export const useCategorias = (pagina: number = 1, limite: number = 10) => {
  const {
    data: categorias,
    isLoading: cargando,
    error,
  } = useSWR(queryKeys.categorias(pagina, limite), () => getCategorias(pagina, limite))

  return {
    categorias,
    cargando,
    error: error?.message ?? null,
  }
}

// Obtener una categoría por ID
export const useCategoriaById = (id: string | number) => {
  const { data, error, isLoading, mutate } = useSWR(
    queryKeys.categoriaById(id),
    () => getCategoriaById(id),
  )

  return {
    categoriaById: data,
    cargando: isLoading,
    error: error?.message ?? null,
    refrescar: mutate,
  }
}

// Eliminar categoría
export const useEliminarCategoria = (id: string | number) => {
  const { data, trigger, isMutating, error } = useSWRMutation(
    queryKeys.categoriaById(id),
    () => eliminarCategoria(id)
  )

  return {
    categoria: data,
    ejecutarEliminar: trigger,
    error: error?.message ?? null,
    enProceso: isMutating,
  }
}

// Editar categoría
export const useEditarCategoria = (id: string | number) => {
  const { data, trigger, isMutating, error } = useSWRMutation(
    queryKeys.categoriaById(id),
    (key, { arg }: { arg: Partial<Category> }) => editarCategoria(id, arg)
  )

  return {
    categoria: data,
    ejecutarEditar: trigger,
    error: error?.message ?? null,
    enProceso: isMutating,
  }
}

// Crear categoría
export const useCrearCategoria = () => {
  const { data, trigger, isMutating, error } = useSWRMutation(
    queryKeys.categoriaById('nueva'),
    (key, { arg }: { arg: Partial<Category> }) => crearCategoria(arg)
  )

  return {
    categoria: data,
    ejecutarCrear: trigger,
    error: error?.message ?? null,
    enProceso: isMutating,
  }
}
