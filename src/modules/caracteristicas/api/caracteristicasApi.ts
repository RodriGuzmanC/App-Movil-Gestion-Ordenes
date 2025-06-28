import { Attribute } from "@/src/shared/interfaces/AttributeModel"
import { AttributeType, AttributeTypesWithAttributes } from "@/src/shared/interfaces/AttributeTypeModel"
import { DataResponse, PaginatedResponse } from "@/src/shared/interfaces/extras/ApiResponses"
import { fetchWithAuth } from "@/src/shared/utils/fetchWithAuth"

/**
 * Obtener lista de tipos de atributos con paginación.
 * @param page Página a consultar.
 * @param limit Cantidad de registros por página.
 * @returns PaginatedResponse<AttributeTypesWithAttributes>
 */
export const getTiposAtributosConValores = async (
  page: number = 1,
  limit: number = 10
): Promise<PaginatedResponse<AttributeTypesWithAttributes>> => {
  const queryParams = `?page=${page}&limit=${limit}`
  return await fetchWithAuth(`/products/attributes-types${queryParams}`, {
    method: 'GET',
  })
}


/**
 * 
 * 
 *  TIPOS DE ATRIBUTOS - PADRE
 * 
 * 
 * 
 */


/**
 * Crear un nuevo tipo de atributo.
 * @param data Datos del nuevo tipo de atributo.
 * @returns DataResponse<AttributeTypesWithAttributes>
 */
export const crearTipoAtributo = async (
  data: Partial<AttributeType>
): Promise<DataResponse<AttributeType>> => {
  return await fetchWithAuth(`/products/attributes-types`, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

/**
 * Obtener un tipo de atributo por su ID.
 */
export const getTipoAtributoById = async (
  id: string | number
): Promise<DataResponse<AttributeType>> => {
  return await fetchWithAuth(`/products/attributes-types/${id}`, {
    method: 'GET',
  })
}

/**
 * Editar un tipo de atributo existente.
 */
export const editarTipoAtributo = async (
  id: string | number,
  data: Partial<AttributeType>
): Promise<DataResponse<AttributeType>> => {
  return await fetchWithAuth(`/products/attributes-types/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

/**
 * Eliminar un tipo de atributo por su ID.
 */
export const eliminarTipoAtributo = async (
  id: string | number
): Promise<DataResponse<AttributeType>> => {
  return await fetchWithAuth(`/products/attributes-types/${id}`, {
    method: 'DELETE',
  })
}

/**
 * 
 * 
 *  VALORES DE TIPO DE ATRIBUTOS - HIJOS
 * 
 * 
 * 
 */



/**
 * Crear un nuevo tipo de atributo.
 * @param data Datos del nuevo tipo de atributo.
 * @returns DataResponse<AttributeTypesWithAttributes>
 */
export const crearAtributo = async (
  data: Partial<Attribute>
): Promise<DataResponse<Attribute>> => {
  return await fetchWithAuth(`/products/attributes-types/attributes`, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

/**
 * Obtener un tipo de atributo por su ID.
 */
export const getAtributoById = async (
  id: string | number
): Promise<DataResponse<Attribute>> => {
  return await fetchWithAuth(`/products/attributes-types/attributes/${id}`, {
    method: 'GET',
  })
}

/**
 * Editar un tipo de atributo existente.
 */
export const editarAtributo = async (
  id: string | number,
  data: Partial<Attribute>
): Promise<DataResponse<Attribute>> => {
  return await fetchWithAuth(`/products/attributes-types/attributes/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

/**
 * Eliminar un tipo de atributo por su ID.
 */
export const eliminarAtributo = async (
  id: string | number
): Promise<DataResponse<Attribute>> => {
  return await fetchWithAuth(`/products/attributes-types/attributes/${id}`, {
    method: 'DELETE',
  })
}
