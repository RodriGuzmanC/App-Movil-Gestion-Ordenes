import queryKeys from '@/src/shared/constants/queryKeys'
import { CategoryProductWithRelations } from '@/src/shared/interfaces/CategoryProductModel'
import { Product } from '@/src/shared/interfaces/ProductModel'
import useSWR, { mutate } from 'swr'
import useSWRMutation from 'swr/mutation'
import { crearCategoriaProducto, crearProducto, editarProducto, eliminarCategoriaProducto, eliminarProducto, getProductoById, getProductos } from '../api/productoApi'

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



// Editar categoria producto
export const useEditarCategoriaProducto = (productId: number, categoriasIniciales: number[], producCateIniciales: CategoryProductWithRelations[]) => {
  const { trigger, isMutating, error } = useSWRMutation(
    queryKeys.productoById(productId),
    async (key, { arg }: { arg: { categoriasSeleccionadas: number[] } }) => {
      
      const nuevasCategorias = arg.categoriasSeleccionadas

      const IdsCategoriasAAgregar = nuevasCategorias.filter(idCat => !categoriasIniciales.includes(idCat))
      const IdsCatProdAEliminar = producCateIniciales.filter(producCat=> !nuevasCategorias.includes(producCat.categoria_id))

      console.log('Categorías a agregar:', IdsCategoriasAAgregar)
      console.log('Categorías a eliminar:', IdsCatProdAEliminar)

      // Crear nuevas categorías
      await Promise.all(
        IdsCategoriasAAgregar.map(catId => crearCategoriaProducto({producto_id: productId, categoria_id: catId}))
      )

      // Eliminar las que ya no están
      await Promise.all(
        IdsCatProdAEliminar.map(CatProd => eliminarCategoriaProducto(productId, CatProd.id))
      )
    }

    
  )

  return {
    ejecutarEditarCategorias: trigger,
    enProcesoCategorias: isMutating,
    errorCategorias: error?.message ?? null,
  }
}
