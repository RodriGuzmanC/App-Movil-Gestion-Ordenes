import { Client } from "@/src/shared/interfaces/ClientModel"
import { DataResponse, PaginatedResponse } from "@/src/shared/interfaces/extras/ApiResponses"
import { fetchWithAuth } from "@/src/shared/utils/fetchWithAuth"

/**
 * Obtener lista de clientes con paginación.
 * @param page Página a consultar.
 * @param limit Cantidad de clientes por página.
 * @returns PaginatedResponse<Client>
 */
export const getClientes = async (
  page: number = 1,
  limit: number = 10
): Promise<PaginatedResponse<Client>> => {
  const queryParams = `?page=${page}&limit=${limit}`
  return await fetchWithAuth(`clients${queryParams}`, {
    method: 'GET',
  })
}

/**
 * Crear un nuevo cliente.
 * @param data Datos del nuevo cliente.
 * @returns DataResponse<Client>
 */
export const crearCliente = async (
  data: Partial<Client>
): Promise<DataResponse<Client>> => {
  return await fetchWithAuth(`/clients`, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

/**
 * Obtener un cliente por su ID.
 */
export const getClienteById = async (
  id: string | number
): Promise<DataResponse<Client>> => {
  return await fetchWithAuth(`/clients/${id}`, {
    method: 'GET',
  })
}

/**
 * Editar un cliente existente.
 */
export const editarCliente = async (
  id: string | number,
  data: Partial<Client>
): Promise<DataResponse<Client>> => {
  return await fetchWithAuth(`/clients/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

/**
 * Eliminar un cliente por su ID.
 */
export const eliminarCliente = async (
  id: string | number
): Promise<DataResponse<Client>> => {
  return await fetchWithAuth(`/clients/${id}`, {
    method: 'DELETE',
  })
}
