import queryKeys from '@/src/shared/constants/queryKeys'
import { Product } from '@/src/shared/interfaces/ProductModel'
import useSWR, { mutate } from 'swr'
import useSWRMutation from 'swr/mutation'
import { crearProducto, editarProducto, eliminarProducto, getProductoById, getProductos } from '../api/productoApi'

export const useProductos = (pagina: number = 1, limite: number = 10) => {
  const {
    data: productos,
    isLoading: cargando,
    error,
  } = useSWR(queryKeys.productos(pagina, limite), () => getProductos(pagina, limite))

  return {
    productos,
    cargando,
    error: error?.message ?? null,
  }
}

// Obtener un producto por ID
export const useProductoById = (id: string | number) => {
  const { data, error, isLoading, mutate } = useSWR(
    queryKeys.productoById(id),
    () => getProductoById(id),
  )

  return {
    productoById: data,
    cargando: isLoading,
    error: error?.message ?? null,
    refrescar: mutate,
  }
}

// Eliminar producto
export const useEliminarProducto = (id: string | number) => {
  const { data, trigger, isMutating, error } = useSWRMutation(
    queryKeys.productoById(id),
    () => eliminarProducto(id)
  )

  return {
    producto: data,
    ejecutarEliminar: trigger,
    error: error?.message ?? null,
    enProceso: isMutating,
  }
}

// Editar producto
export const useEditarProducto = (id: string | number) => {

  const { data, trigger, isMutating, error } = useSWRMutation(
    queryKeys.productoById(id),
    (key, { arg }: { arg: Partial<Product> }) => editarProducto(id, arg)
  )

  return {
    producto: data,
    ejecutarEditar: trigger,
    error: error?.message ?? null,
    enProceso: isMutating,
  }
}

// Crear producto
/*export const useCrearProducto = (createData: Partial<Product>) => {
  const { data, trigger: ejecutarCrear, isMutating, error } = useSWRMutation(
    queryKeys.productos,
    () => {
      const datos = crearProducto(createData)
      console.log('Datos desde el hook de productos: ', datos)
      return datos
    }

  )

  return {
    producto: data,
    ejecutarCrear,
    error: error?.message ?? null,
    enProceso: isMutating,
  }
}*/

export const useCrearProducto = () => {
  const { data, trigger, isMutating, error } = useSWRMutation(
    queryKeys.productoById('nuevo'),
    (key, { arg }: { arg: Partial<Product> }) => crearProducto(arg)
  )

  mutate(queryKeys.productos)

  return {
    producto: data,
    ejecutarCrear: trigger,
    error: error?.message ?? null,
    enProceso: isMutating,
  }
}

