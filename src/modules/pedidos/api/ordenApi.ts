import { DeliveryMethod } from "@/src/shared/interfaces/DeliveryMethodModel"
import { Order, OrderWithFullRelations } from "@/src/shared/interfaces/OrderModel"
import { OrderStatus } from "@/src/shared/interfaces/OrderStatusModel"
import { DataResponse, PaginatedResponse } from "@/src/shared/interfaces/extras/ApiResponses"
import { fetchWithAuth } from "@/src/shared/utils/fetchWithAuth"

/**
 * Obtener lista de órdenes de entrada con paginación.
 * @param page Página a consultar.
 * @param limit Cantidad de registros por página.
 * @returns PaginatedResponse<OrderWithFullRelations>
 */
export const getOrdenesEntrada = async (
  page: number = 1,
  limit: number = 10
): Promise<PaginatedResponse<OrderWithFullRelations>> => {
  const queryParams = `?category=entrada&page=${page}&limit=${limit}`
  return await fetchWithAuth(`/orders${queryParams}`, {
    method: 'GET',
  })
}

/**
 * Obtener lista de órdenes de salida con paginación.
 * @param page Página a consultar.
 * @param limit Cantidad de registros por página.
 * @returns PaginatedResponse<OrderWithFullRelations>
 */
export const getOrdenesSalida = async (
  page: number = 1,
  limit: number = 10
): Promise<PaginatedResponse<OrderWithFullRelations>> => {
  const queryParams = `?category=salida&page=${page}&limit=${limit}`
  return await fetchWithAuth(`/orders${queryParams}`, {
    method: 'GET',
  })
}

/**
 * Crear una nueva orden.
 * @param data Datos de la nueva orden.
 * @returns DataResponse<Order>
 */
export const crearOrden = async (
  data: Partial<Order>
): Promise<DataResponse<Order>> => {
  return await fetchWithAuth(`/orders`, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

/**
 * Obtener una orden por su ID.
 * @param id ID de la orden.
 * @returns DataResponse<OrderWithFullRelations>
 */
export const getOrdenById = async (
  id: string | number
): Promise<DataResponse<OrderWithFullRelations>> => {
  return await fetchWithAuth(`/orders/${id}`, {
    method: 'GET',
  })
}

/**
 * Editar una orden existente.
 * @param id ID de la orden.
 * @param data Datos actualizados de la orden.
 * @returns DataResponse<Order>
 */
export const editarOrden = async (
  id: string | number,
  data: Partial<Order>
): Promise<DataResponse<Order>> => {
  return await fetchWithAuth(`/orders/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

/**
 * Eliminar una orden por su ID.
 * @param id ID de la orden.
 * @returns DataResponse<Order>
 */
export const eliminarOrden = async (
  id: string | number
): Promise<DataResponse<Order>> => {
  return await fetchWithAuth(`/orders/${id}`, {
    method: 'DELETE',
  })
}



export const getEstadosPedidos = async (
  page: number = 1,
  limit: number = 10
): Promise<PaginatedResponse<OrderStatus>> => {
  const queryParams = `?page=${page}&limit=${limit}`
  return await fetchWithAuth(`/orders/order-statuses${queryParams}`, {
    method: 'GET',
  })
}

export const getMetodosEntrega = async (
  page: number = 1,
  limit: number = 10
): Promise<PaginatedResponse<DeliveryMethod>> => {
  const queryParams = `?page=${page}&limit=${limit}`
  return await fetchWithAuth(`/orders/delivery-methods${queryParams}`, {
    method: 'GET',
  })
}