import { Category } from "@/src/shared/interfaces/CategoryModel";
import { DataResponse, PaginatedResponse } from "@/src/shared/interfaces/extras/ApiResponses";
import { fetchWithAuth } from "@/src/shared/utils/fetchWithAuth";

/**
 * Obtener lista de categorías con paginación.
 * @param page Página a consultar.
 * @param limit Cantidad de categorías por página.
 * @returns PaginatedResponse<Category>
 */
export const getCategorias = async (
  page: number = 1,
  limit: number = 10
): Promise<PaginatedResponse<Category>> => {
  const queryParams = `?page=${page}&limit=${limit}`;
  return await fetchWithAuth(`categories${queryParams}`, {
    method: 'GET',
  });
};

/**
 * Crear una nueva categoría.
 * @param data Datos de la nueva categoría.
 * @returns DataResponse<Category>
 */
export const crearCategoria = async (
  data: Partial<Category>
): Promise<DataResponse<Category>> => {
  return await fetchWithAuth(`/categories`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

/**
 * Obtener una categoría por su ID.
 */
export const getCategoriaById = async (
  id: string | number
): Promise<DataResponse<Category>> => {
  return await fetchWithAuth(`/categories/${id}`, {
    method: 'GET',
  });
};

/**
 * Editar una categoría existente.
 */
export const editarCategoria = async (
  id: string | number,
  data: Partial<Category>
): Promise<DataResponse<Category>> => {
  return await fetchWithAuth(`/categories/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

/**
 * Eliminar una categoría por su ID.
 */
export const eliminarCategoria = async (
  id: string | number
): Promise<DataResponse<Category>> => {
  return await fetchWithAuth(`/categories/${id}`, {
    method: 'DELETE',
  });
};
