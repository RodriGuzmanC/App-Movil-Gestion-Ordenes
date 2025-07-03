import queryKeys from '@/src/shared/constants/queryKeys'
import { VariationAttribute } from '@/src/shared/interfaces/VariationAttributeModel'
import useSWR, { mutate } from 'swr'
import useSWRMutation from 'swr/mutation'
import { crearAtributoVariacion, editarAtributoVariacion, eliminarAtributoVariacion, getAtributosByVariacion } from '../api/variaAttributoApi'


/**
 * Hook para obtener los atributos de una variación.
 */
export const useAtributosVariacion = (productoId: number, variacionId: number) => {
  const {
    data: atributos,
    isLoading: cargando,
    error,
  } = useSWR(queryKeys.atributosVariacion(productoId, variacionId), () =>
    getAtributosByVariacion(productoId, variacionId)
  )

  return {
    atributos,
    cargando,
    error: error?.message ?? null,
  }
}

/**
 * Hook para crear un nuevo atributo de variación.
 */
export const useCrearAtributoVariacion = (productoId: number, variacionId: number) => {
  const { data, trigger, isMutating, error } = useSWRMutation(
    queryKeys.atributosVariacion(productoId, variacionId),
    (key, { arg }: { arg: Omit<VariationAttribute, 'id'> }) => crearAtributoVariacion(productoId, variacionId, arg)
  )

  mutate(queryKeys.atributosVariacion(productoId, variacionId))

  return {
    atributo: data,
    ejecutarCrear: trigger,
    error: error?.message ?? null,
    enProceso: isMutating,
  }
}

/**
 * Hook para editar un atributo de variación.
 */
export const useEditarAtributoVariacion = (productoId: number, variacionId: number, varAttributeId: number) => {
  const { data, trigger, isMutating, error } = useSWRMutation(
    queryKeys.atributosVariacion(productoId, variacionId),
    (key, { arg }: { arg: Partial<VariationAttribute> }) =>
      editarAtributoVariacion(productoId, variacionId, varAttributeId, arg)
  )

  return {
    atributo: data,
    ejecutarEditar: trigger,
    error: error?.message ?? null,
    enProceso: isMutating,
  }
}

/**
 * Hook para eliminar un atributo de variación.
 */
export const useEliminarAtributoVariacion = (productoId: number, variacionId: number, atributoId: number) => {
  const { data, trigger, isMutating, error } = useSWRMutation(
    queryKeys.atributosVariacion(productoId, variacionId),
    () => eliminarAtributoVariacion(productoId, variacionId, atributoId)
  )

  return {
    atributo: data,
    ejecutarEliminar: trigger,
    error: error?.message ?? null,
    enProceso: isMutating,
  }
}
