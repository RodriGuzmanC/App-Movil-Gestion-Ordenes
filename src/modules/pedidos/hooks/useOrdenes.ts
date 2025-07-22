import queryKeys from '@/src/shared/constants/queryKeys'
import { Order } from '@/src/shared/interfaces/OrderModel'
import useSWR, { mutate } from 'swr'
import useSWRMutation from 'swr/mutation'
import {
  crearOrden,
  editarOrden,
  eliminarOrden,
  getEstadosPedidos,
  getMetodosEntrega,
  getOrdenById,
  getOrdenesEntrada,
  getOrdenesSalida
} from '../api/ordenApi'

/**
 * Hook para obtener las órdenes de entrada.
 */
export const useOrdenesEntrada = (pagina: number = 1, limite: number = 10) => {
  const { data: ordenes, isLoading: cargando, error } = useSWR(
    queryKeys.ordenesEntrada(pagina, limite),
    () => getOrdenesEntrada(pagina, limite)
  )

  return {
    ordenes,
    cargando,
    error: error?.message ?? null,
  }
}

/**
 * Hook para obtener las órdenes de salida.
 */
export const useOrdenesSalida = (pagina: number = 1, limite: number = 10) => {
  const { data: ordenes, isLoading: cargando, error } = useSWR(
    queryKeys.ordenesSalida(pagina, limite),
    () => getOrdenesSalida(pagina, limite)
  )

  return {
    ordenes,
    cargando,
    error: error?.message ?? null,
  }
}

/**
 * Hook para obtener una orden por su ID.
 */
export const useOrdenById = (id: string | number) => {
  const { data, error, isLoading, mutate } = useSWR(
    queryKeys.ordenById(id),
    () => getOrdenById(id)
  )

  return {
    ordenById: data,
    cargando: isLoading,
    error: error?.message ?? null,
    refrescar: mutate,
  }
}

/**
 * Hook para eliminar una orden.
 */
export const useEliminarOrden = (id: string | number) => {
  const { data, trigger, isMutating, error } = useSWRMutation(
    queryKeys.ordenById(id),
    () => eliminarOrden(id)
  )

  return {
    orden: data,
    ejecutarEliminar: trigger,
    error: error?.message ?? null,
    enProceso: isMutating,
  }
}

/**
 * Hook para editar una orden.
 */
export const useEditarOrden = (id: string | number) => {
  const { data, trigger, isMutating, error } = useSWRMutation(
    queryKeys.ordenById(id),
    (key, { arg }: { arg: Partial<Order> }) => editarOrden(id, arg)
  )

  return {
    orden: data,
    ejecutarEditar: trigger,
    error: error?.message ?? null,
    enProceso: isMutating,
  }
}

/**
 * Hook para crear una nueva orden.
 */
export const useCrearOrden = () => {
  const { data, trigger, isMutating, error } = useSWRMutation(
    queryKeys.ordenById('nueva'),
    (key, { arg }: { arg: Partial<Order> }) => crearOrden(arg)
  )

  mutate(queryKeys.ordenesEntrada)
  mutate(queryKeys.ordenesSalida)

  return {
    orden: data,
    ejecutarCrear: trigger,
    error: error?.message ?? null,
    enProceso: isMutating,
  }
}






export const useEstadosPedidos = (pagina: number = 1, limite: number = 10) => {
  const { data: estadosPedidos, isLoading: cargando, error } = useSWR(
    queryKeys.estadosPedidos(pagina, limite),
    () => getEstadosPedidos(pagina, limite)
  )

  return {
    estadosPedidos,
    cargando,
    error: error?.message ?? null,
  }
}


export const useMetodosEntrega = (pagina: number = 1, limite: number = 10) => {
  const { data: metodosEntrega, isLoading: cargando, error } = useSWR(
    queryKeys.metodosEntrega(pagina, limite),
    () => getMetodosEntrega(pagina, limite)
  )

  return {
    metodosEntrega,
    cargando,
    error: error?.message ?? null,
  }
}