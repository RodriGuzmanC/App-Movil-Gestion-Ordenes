import { CategoryProduct } from "@/src/shared/interfaces/CategoryProductModel";
import { DataResponse, PaginatedResponse } from "@/src/shared/interfaces/extras/ApiResponses";
import { Product, ProductWithFullRelations } from "@/src/shared/interfaces/ProductModel";
import { fetchWithAuth } from "@/src/shared/utils/fetchWithAuth";

/**
 * Obtener lista de productos con paginación.
 * @param page Página a consultar.
 * @param limit Cantidad de productos por página.
 * @returns PaginatedResponse<Product>
 */
export const getProductos = async (
  page: number = 1,
  limit: number = 10
): Promise<PaginatedResponse<Product>> => {
  const queryParams = `?page=${page}&limit=${limit}`;
  return await fetchWithAuth(`products${queryParams}`, {
    method: 'GET',
  });
};

/**
 * Crear un nuevo producto.
 * @param data Datos del nuevo producto.
 * @returns DataResponse<Product>
 */
export const crearProducto = async (
  data: Partial<Product>
): Promise<DataResponse<Product>> => {
  return await fetchWithAuth(`/products`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
};


/**
 * Obtener un producto por su ID.
 */
export const getProductoById = async (
  id: string | number
): Promise<DataResponse<ProductWithFullRelations>> => {
  return await fetchWithAuth(`/products/${id}`, {
    method: 'GET',
  });
};

/**
 * Editar un producto existente.
 */
export const editarProducto = async (
  id: string | number,
  data: Partial<Product>
): Promise<DataResponse<Product>> => {
  return await fetchWithAuth(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

/**
 * Eliminar un producto por su ID.
 */
export const eliminarProducto = async (
  id: string | number
): Promise<DataResponse<Product>> => {
  return await fetchWithAuth(`/products/${id}`, {
    method: 'DELETE',
  });
};



/**
 * Crear categoria de producto
 */
export const crearCategoriaProducto = async (categoryProduct: Omit<CategoryProduct, 'id'>): Promise<DataResponse<CategoryProduct>> =>{
  return await fetchWithAuth(`/products/${categoryProduct.producto_id}/categories`, {
    method: 'POST',
    body: JSON.stringify(categoryProduct),
  })
}

/**
 * Eliminar categoria de producto
 */
export const eliminarCategoriaProducto = async (productoId: number, categoriaProducId: number): Promise<DataResponse<CategoryProduct>> => {
  return await fetchWithAuth(`/products/${productoId}/categories/${categoriaProducId}`, {
    method: 'DELETE',
  })
}

