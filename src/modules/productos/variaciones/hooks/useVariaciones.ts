import queryKeys from '@/src/shared/constants/queryKeys'
import { Variation } from '@/src/shared/interfaces/VariationModel'
import useSWR, { mutate } from 'swr'
import useSWRMutation from 'swr/mutation'
import {
    crearVariacion,
    editarVariacion,
    eliminarVariacion,
    getVariacionById,
    getVariacionesByProducto
} from '../api/variacionesApi'

/**
 * Hook para obtener las variaciones de un producto.
 */
export const useVariaciones = (productoId: number, pagina: number = 1, limite: number = 10) => {
  const {
    data: variaciones,
    isLoading: cargando,
    error,
  } = useSWR(queryKeys.variaciones(productoId, pagina, limite), () =>
    getVariacionesByProducto(productoId, pagina, limite)
  )

  return {
    variaciones,
    cargando,
    error: error?.message ?? null,
  }
}

/**
 * Hook para obtener una variación específica.
 */
export const useVariacionById = (productoId: number, variacionId: number) => {
  const { data, error, isLoading, mutate } = useSWR(
    queryKeys.variacionById(productoId, variacionId),
    () => getVariacionById(productoId, variacionId),
  )

  return {
    variacionById: data,
    cargando: isLoading,
    error: error?.message ?? null,
    refrescar: mutate,
  }
}

/**
 * Hook para eliminar una variación.
 */
export const useEliminarVariacion = (productoId: number, variacionId: number) => {
  const { data, trigger, isMutating, error } = useSWRMutation(
    queryKeys.variacionById(productoId, variacionId),
    () => eliminarVariacion(productoId, variacionId)
  )

  return {
    variacion: data,
    ejecutarEliminar: trigger,
    error: error?.message ?? null,
    enProceso: isMutating,
  }
}

/**
 * Hook para editar una variación.
 */
export const useEditarVariacion = (productoId: number, variacionId: number) => {
  const { data, trigger, isMutating, error } = useSWRMutation(
    queryKeys.variacionById(productoId, variacionId),
    (key, { arg }: { arg: Partial<Variation> }) => editarVariacion(productoId, variacionId, arg)
  )

  return {
    variacion: data,
    ejecutarEditar: trigger,
    error: error?.message ?? null,
    enProceso: isMutating,
  }
}

/**
 * Hook para crear una nueva variación.
 */
export const useCrearVariacion = (productoId: number) => {
  const { data, trigger, isMutating, error } = useSWRMutation(
    queryKeys.variacionById(productoId,  'nueva'),
    (key, { arg }: { arg: Partial<Variation> }) => crearVariacion(productoId, arg)
  )

  // Actualizamos la lista de variaciones
  mutate(queryKeys.variaciones(productoId))

  return {
    variacion: data,
    ejecutarCrear: trigger,
    error: error?.message ?? null,
    enProceso: isMutating,
  }
}
