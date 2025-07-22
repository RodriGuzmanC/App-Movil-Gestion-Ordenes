import { OrderDetail } from "@/src/shared/interfaces/OrderDetailModel"
import { DataResponse, PaginatedResponse } from "@/src/shared/interfaces/extras/ApiResponses"
import { fetchWithAuth } from "@/src/shared/utils/fetchWithAuth"

/**
 * Obtener los detalles de un pedido específico.
 * @param orderId ID del pedido.
 * @param page Página a consultar.
 * @param limit Cantidad de registros por página.
 * @returns PaginatedResponse<OrderDetailWithFullRelations>
 */
export const getDetallesOrden = async (
  orderId: number,
  page: number = 1,
  limit: number = 10
): Promise<PaginatedResponse<OrderDetail>> => {
  const queryParams = `?page=${page}&limit=${limit}`
  return await fetchWithAuth(`/orders/${orderId}/order-details${queryParams}`, {
    method: 'GET',
  })
}

/**
 * Crear un nuevo detalle para un pedido.
 * @param orderId ID del pedido.
 * @param data Datos del detalle a crear.
 * @returns DataResponse<OrderDetail>
 */
export const crearDetalleOrden = async (
  orderId: number,
  data: Partial<OrderDetail>
): Promise<DataResponse<OrderDetail>> => {
  return await fetchWithAuth(`/orders/${orderId}/order-details`, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

/**
 * Editar un detalle de un pedido.
 * @param orderId ID del pedido.
 * @param orderDetailId ID del detalle.
 * @param data Datos a actualizar.
 * @returns DataResponse<OrderDetail>
 */
export const editarDetalleOrden = async (
  orderId: number,
  orderDetailId: number,
  data: Partial<OrderDetail>
): Promise<DataResponse<OrderDetail>> => {
  return await fetchWithAuth(`/orders/${orderId}/order-details/${orderDetailId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

/**
 * Eliminar un detalle de un pedido.
 * @param orderId ID del pedido.
 * @param orderDetailId ID del detalle.
 * @returns DataResponse<OrderDetail>
 */
export const eliminarDetalleOrden = async (
  orderId: number,
  orderDetailId: number
): Promise<DataResponse<OrderDetail>> => {
  return await fetchWithAuth(`/orders/${orderId}/order-details/${orderDetailId}`, {
    method: 'DELETE',
  })
}
