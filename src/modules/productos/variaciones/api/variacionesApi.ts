import { Variation } from "@/src/shared/interfaces/VariationModel";
import { DataResponse, PaginatedResponse } from "@/src/shared/interfaces/extras/ApiResponses";
import { fetchWithAuth } from "@/src/shared/utils/fetchWithAuth";

/**
 * Obtener lista de variaciones de un producto con paginación.
 * @param productId ID del producto.
 * @param page Página a consultar.
 * @param limit Cantidad de registros por página.
 * @returns PaginatedResponse<Variation>
 */
export const getVariacionesByProducto = async (
  productId: string | number,
  page: number = 1,
  limit: number = 10
): Promise<PaginatedResponse<Variation>> => {
  const queryParams = `?page=${page}&limit=${limit}`;
  return await fetchWithAuth(`/products/${productId}/variations${queryParams}`, {
    method: 'GET',
  });
};

/**
 * Crear una nueva variación para un producto.
 * @param productId ID del producto al que pertenece la variación.
 * @param data Datos de la nueva variación.
 * @returns DataResponse<Variation>
 */
export const crearVariacion = async (
  productId: string | number,
  data: Partial<Variation>
): Promise<DataResponse<Variation>> => {
  return await fetchWithAuth(`/products/${productId}/variations`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

/**
 * Obtener una variación específica por su ID.
 * @param productId ID del producto.
 * @param variationId ID de la variación.
 * @returns DataResponse<Variation>
 */
export const getVariacionById = async (
  productId: string | number,
  variationId: string | number
): Promise<DataResponse<Variation>> => {
  return await fetchWithAuth(`/products/${productId}/variations/${variationId}`, {
    method: 'GET',
  });
};

/**
 * Editar una variación existente.
 * @param productId ID del producto.
 * @param variationId ID de la variación.
 * @param data Datos actualizados de la variación.
 * @returns DataResponse<Variation>
 */
export const editarVariacion = async (
  productId: string | number,
  variationId: string | number,
  data: Partial<Variation>
): Promise<DataResponse<Variation>> => {
  return await fetchWithAuth(`/products/${productId}/variations/${variationId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

/**
 * Eliminar una variación por su ID.
 * @param productId ID del producto.
 * @param variationId ID de la variación.
 * @returns DataResponse<Variation>
 */
export const eliminarVariacion = async (
  productId: string | number,
  variationId: string | number
): Promise<DataResponse<Variation>> => {
  return await fetchWithAuth(`/products/${productId}/variations/${variationId}`, {
    method: 'DELETE',
  });
};
