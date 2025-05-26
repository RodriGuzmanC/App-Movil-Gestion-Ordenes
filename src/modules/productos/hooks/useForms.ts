import { useCatchErrors } from "@/src/shared/hooks/useCatchErorrs"
import { AlertService } from "@/src/shared/utils/AlertService"
import { useRouter } from "expo-router"
import { useFormik } from "formik"
import { useEffect } from "react"
import { ProductoFormData, productoSchema } from "../schemas/ProductSchema"
import { useCrearProducto, useEditarProducto, useProductoById } from "./useProductos"

const { catchErrors } = useCatchErrors()
const router = useRouter()

export const useProductoCrearForm = () => {

  const {
    producto,
    ejecutarCrear,
    error,
    enProceso,
  } = useCrearProducto()

  const formik = useFormik<ProductoFormData>({
    initialValues: {
      nombre_producto: '',
      descripcion: '',
      precio_unitario: '' as unknown as number,
      precio_mayorista: '' as unknown as number,
    },
    validationSchema: productoSchema,
    onSubmit: async (values, { resetForm }) => {

      await catchErrors(async () => {
        const result = await ejecutarCrear(values)

        if (!result) throw new Error('Error al crear el producto')
        resetForm()
        AlertService.show('Producto creado exitosamente', 'success')
        router.navigate('/(tabs)')
      })
    },
  })

  return {
    ...formik,
    enProceso,
    error,
    producto,
  }
}

export const useProductoEditarForm = (id: number) => {

  const {
    producto,
    ejecutarEditar,
    error,
    enProceso,
  } = useEditarProducto(id)

  const { productoById, cargando, error: errorObtenerProducto, refrescar } = useProductoById(id)

  const formik = useFormik<ProductoFormData>({
    initialValues: {
      nombre_producto: '',
      descripcion: '',
      precio_unitario: '' as unknown as number,
      precio_mayorista: '' as unknown as number,
    },
    enableReinitialize: true,
    validationSchema: productoSchema,
    onSubmit: async (values, { resetForm }) => {

      await catchErrors(async () => {
        const result = await ejecutarEditar(values)

        if (!result) throw new Error('Error al crear el producto')
        resetForm()
        AlertService.show('Producto creado exitosamente', 'success')
        router.navigate('/(tabs)')
      })
    },
  })

  useEffect(() => {
    if (productoById) {
      formik.setValues({
        nombre_producto: productoById.data.nombre_producto || '',
        descripcion: productoById.data.descripcion || '',
        precio_unitario: productoById.data.precio_unitario || 0,
        precio_mayorista: productoById.data.precio_mayorista || 0,
      })
    }
  }, [productoById])

  return {
    ...formik,
    enProceso,
    error,
    producto,
  }
}