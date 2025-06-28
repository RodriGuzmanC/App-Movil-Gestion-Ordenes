import queryKeys from '@/src/shared/constants/queryKeys'
import { Attribute } from '@/src/shared/interfaces/AttributeModel'
import { AttributeType } from '@/src/shared/interfaces/AttributeTypeModel'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { crearAtributo, crearTipoAtributo, editarAtributo, editarTipoAtributo, eliminarAtributo, eliminarTipoAtributo, getAtributoById, getTipoAtributoById, getTiposAtributosConValores } from '../api/caracteristicasApi'


// Obtener todos los tipos de atributos con sus valores (atributos hijos)
export const useTiposAtributosConValores = (pagina: number = 1, limite: number = 10) => {
  const {
    data: tiposAtributos,
    isLoading: cargando,
    error,
  } = useSWR(queryKeys.tiposAtributosConValores(pagina, limite), () => getTiposAtributosConValores(pagina, limite))

  return {
    tiposAtributos,
    cargando,
    error: error?.message ?? null,
  }
}

// Obtener un tipo de atributo por ID
export const useTipoAtributoById = (id: string | number) => {
  const { data, error, isLoading, mutate } = useSWR(
    queryKeys.tipoAtributoById(id),
    () => getTipoAtributoById(id),
  )

  return {
    tipoAtributoById: data,
    cargando: isLoading,
    error: error?.message ?? null,
    refrescar: mutate,
  }
}

// Eliminar tipo de atributo
export const useEliminarTipoAtributo = (id: string | number) => {
  const { data, trigger, isMutating, error } = useSWRMutation(
    queryKeys.tipoAtributoById(id),
    () => eliminarTipoAtributo(id)
  )

  return {
    tipoAtributo: data,
    ejecutarEliminar: trigger,
    error: error?.message ?? null,
    enProceso: isMutating,
  }
}

// Editar tipo de atributo
export const useEditarTipoAtributo = (id: string | number) => {
  const { data, trigger, isMutating, error } = useSWRMutation(
    queryKeys.tipoAtributoById(id),
    (key, { arg }: { arg: Omit<AttributeType, 'id'> }) => editarTipoAtributo(id, arg)
  )

  return {
    tipoAtributo: data,
    ejecutarEditar: trigger,
    error: error?.message ?? null,
    enProceso: isMutating,
  }
}

// Crear tipo de atributo
export const useCrearTipoAtributo = () => {
  const { data, trigger, isMutating, error } = useSWRMutation(
    queryKeys.tipoAtributoById('nuevo'),
    (key, { arg }: { arg: Omit<AttributeType, 'id'> }) => crearTipoAtributo(arg)
  )

  return {
    tipoAtributo: data,
    ejecutarCrear: trigger,
    error: error?.message ?? null,
    enProceso: isMutating,
  }
}


/**
 * 
 *  ATRIBUTOS - HIJOS
 * 
 */

// Obtener un atributo por ID
export const useAtributoById = (id: string | number) => {
  const { data, error, isLoading, mutate } = useSWR(
    queryKeys.atributoById(id),
    () => getAtributoById(id),
  )

  return {
    atributoById: data,
    cargando: isLoading,
    error: error?.message ?? null,
    refrescar: mutate,
  }
}

// Eliminar atributo
export const useEliminarAtributo = (id: string | number) => {
  const { data, trigger, isMutating, error } = useSWRMutation(
    queryKeys.atributoById(id),
    () => eliminarAtributo(id)
  )

  return {
    atributo: data,
    ejecutarEliminar: trigger,
    error: error?.message ?? null,
    enProceso: isMutating,
  }
}

// Editar atributo
export const useEditarAtributo = (id: string | number) => {
  const { data, trigger, isMutating, error } = useSWRMutation(
    queryKeys.atributoById(id),
    (key, { arg }: { arg: Omit<Attribute, 'id'> }) => editarAtributo(id, arg)
  )

  return {
    atributo: data,
    ejecutarEditar: trigger,
    error: error?.message ?? null,
    enProceso: isMutating,
  }
}

// Crear atributo
export const useCrearAtributo = () => {
  const { data, trigger, isMutating, error } = useSWRMutation(
    queryKeys.atributoById('nuevo'),
    (key, { arg }: { arg: Omit<Attribute, 'id'> }) => crearAtributo(arg)
  )

  return {
    atributo: data,
    ejecutarCrear: trigger,
    error: error?.message ?? null,
    enProceso: isMutating,
  }
}
