import queryKeys from '@/src/shared/constants/queryKeys'
import { OrderDetail } from '@/src/shared/interfaces/OrderDetailModel'
import useSWR, { mutate } from 'swr'
import useSWRMutation from 'swr/mutation'
import {
    crearDetalleOrden,
    editarDetalleOrden,
    eliminarDetalleOrden,
    getDetallesOrden
} from '../api/ordenDetalleApi'

/**
 * Hook para obtener los detalles de una orden.
 */
export const useDetallesOrden = (orderId: number, pagina: number = 1, limite: number = 10) => {
  const { data: detalles, isLoading: cargando, error, mutate: refrescar } = useSWR(
    queryKeys.detallesOrden(orderId, pagina, limite),
    () => getDetallesOrden(orderId, pagina, limite)
  )

  return {
    detalles,
    cargando,
    error: error?.message ?? null,
    refrescar
  }
}

/**
 * Hook para crear un nuevo detalle en una orden.
 */
export const useCrearDetalleOrden = (orderId: number) => {
  const { data, trigger, isMutating, error } = useSWRMutation(
    queryKeys.detalleOrdenById(orderId, 'crear'),
    (key, { arg }: { arg: Partial<OrderDetail> }) => crearDetalleOrden(orderId, arg)
  )

  const refrescarLista = () => mutate(queryKeys.detalleOrdenById(orderId, 'crear'))

  return {
    detalle: data,
    ejecutarCrear: trigger,
    refrescarLista,
    error: error?.message ?? null,
    enProceso: isMutating,
  }
}

/**
 * Hook para editar un detalle de una orden.
 */
export const useEditarDetalleOrden = (orderId: number, detalleId: number) => {
  const { data, trigger, isMutating, error } = useSWRMutation(
    queryKeys.detalleOrdenById(orderId, detalleId),
    (key, { arg }: { arg: Partial<OrderDetail> }) => editarDetalleOrden(orderId, detalleId, arg)
  )

  const refrescarLista = () => mutate(queryKeys.detalleOrdenById(orderId, detalleId))

  return {
    detalle: data,
    ejecutarEditar: trigger,
    refrescarLista,
    error: error?.message ?? null,
    enProceso: isMutating,
  }
}

/**
 * Hook para eliminar un detalle de una orden.
 */
export const useEliminarDetalleOrden = (orderId: number, detalleId: number) => {
  const { data, trigger, isMutating, error } = useSWRMutation(
    queryKeys.detalleOrdenById(orderId, detalleId),
    () => eliminarDetalleOrden(orderId, detalleId)
  )

  const refrescarLista = () => mutate(queryKeys.detalleOrdenById(orderId, detalleId))

  return {
    detalle: data,
    ejecutarEliminar: trigger,
    refrescarLista,
    error: error?.message ?? null,
    enProceso: isMutating,
  }
}
