import { VariationAttribute } from "@/src/shared/interfaces/VariationAttributeModel";
import { DataResponse } from "@/src/shared/interfaces/extras/ApiResponses";
import { fetchWithAuth } from "@/src/shared/utils/fetchWithAuth";

/**
 * Obtener lista de atributos de una variación.
 * @param productId ID del producto.
 * @param variationId ID de la variación.
 * @returns DataResponse<VariationAttribute[]>
 */
export const getAtributosByVariacion = async (
  productId: string | number,
  variationId: string | number
): Promise<DataResponse<VariationAttribute[]>> => {
  return await fetchWithAuth(`/products/${productId}/variations/${variationId}/attributes`, {
    method: 'GET',
  });
};

/**
 * Crear un atributo para una variación.
 * @param productId ID del producto.
 * @param variationId ID de la variación.
 * @param data Datos del nuevo atributo.
 * @returns DataResponse<VariationAttribute>
 */
export const crearAtributoVariacion = async (
  productId: string | number,
  variationId: string | number,
  data: Omit<VariationAttribute, 'id'>
): Promise<DataResponse<VariationAttribute>> => {
  return await fetchWithAuth(`/products/${productId}/variations/${variationId}/attributes`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

/**
 * Obtener un atributo específico de una variación.
 * @param productId ID del producto.
 * @param variationId ID de la variación.
 * @param attributeId ID del atributo.
 * @returns DataResponse<VariationAttribute>
 */
export const getAtributoVariacionById = async (
  productId: string | number,
  variationId: string | number,
  attributeId: string | number
): Promise<DataResponse<VariationAttribute>> => {
  return await fetchWithAuth(`/products/${productId}/variations/${variationId}/attributes/${attributeId}`, {
    method: 'GET',
  });
};

/**
 * Editar un atributo de una variación.
 * @param productId ID del producto.
 * @param variationId ID de la variación.
 * @param attributeId ID del atributo.
 * @param data Datos actualizados del atributo.
 * @returns DataResponse<VariationAttribute>
 */
export const editarAtributoVariacion = async (
  productId: string | number,
  variationId: string | number,
  varAttributeId: string | number,
  data: Partial<VariationAttribute>
): Promise<DataResponse<VariationAttribute>> => {
  return await fetchWithAuth(`/products/${productId}/variations/${variationId}/attributes/${varAttributeId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

/**
 * Eliminar un atributo de una variación.
 * @param productId ID del producto.
 * @param variationId ID de la variación.
 * @param attributeId ID del atributo.
 * @returns DataResponse<VariationAttribute>
 */
export const eliminarAtributoVariacion = async (
  productId: string | number,
  variationId: string | number,
  attributeId: string | number
): Promise<DataResponse<VariationAttribute>> => {
  return await fetchWithAuth(`/products/${productId}/variations/${variationId}/attributes/${attributeId}`, {
    method: 'DELETE',
  });
};
