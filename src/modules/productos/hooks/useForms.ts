import queryKeys from "@/src/shared/constants/queryKeys"
import { useCatchErrors } from "@/src/shared/hooks/useCatchErorrs"
import { CategoryProductWithRelations } from "@/src/shared/interfaces/CategoryProductModel"
import { CloudinaryResponse } from "@/src/shared/interfaces/extras/CloudinaryTypes"
import { AlertService } from "@/src/shared/utils/AlertService"
import { useRouter } from "expo-router"
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { mutate } from "swr"
import { subirImagenProducto } from "../api/productoApi"
import { ProductoFormData, productoSchema } from "../schemas/ProductSchema"
import { useCrearProducto, useEditarCategoriaProducto, useEditarProducto, useEliminarProducto, useProductoById } from "./useProductos"

const { catchErrors } = useCatchErrors()
const router = useRouter()

// Crear
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
      url_imagen: '',
      categorias: [] as number[],
      imagen: undefined as File | undefined,
    },
    validationSchema: productoSchema,
    onSubmit: async (values, { resetForm }) => {
      await catchErrors(async () => {

        // Crear imagen
        if (values.imagen != undefined) {
          const formData = new FormData();
          formData.append("file", values.imagen as any);
          const cloudinaryRes: CloudinaryResponse = await subirImagenProducto(formData);
          if (cloudinaryRes && typeof cloudinaryRes === "object" && "error" in cloudinaryRes) {
            // Es un CloudinaryErrorResponse
            const errorRes = cloudinaryRes;
            console.error("Error al subir:", errorRes.error.message);
          } else {
            // Es un CloudinaryUploadResponse
            const response = cloudinaryRes;
            console.log("Imagen subida!");
            console.log("URL segura:", response.secure_url);
            // Asignar la URL de la imagen al producto
            values.url_imagen = response.secure_url;
          }
        }
        // Determinamos los valores a enviar
        const { nombre_producto, descripcion, url_imagen, precio_unitario, precio_mayorista } = values;
        const body = {
          nombre_producto,
          descripcion,
          url_imagen,
          precio_unitario,
          precio_mayorista,
        };

        // Crear producto
        const result = await ejecutarCrear(body)

        if (!result) throw new Error('Error al crear el producto')
        resetForm()
        AlertService.show('Producto creado exitosamente', 'success')
        mutate(queryKeys.productos)
        router.navigate(`/(tabs)/productos/${result.data.id}`)
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
// Editar
export const useProductoEditarForm = (id: number) => {

  // Hook para editar el producto
  const {
    producto,
    ejecutarEditar,
    error,
    enProceso,
  } = useEditarProducto(id)

  // Estado local para almacenar las categorías iniciales del producto
  const [categoriasIniciales, setCategoriasIniciales] = useState<number[]>([])
  const [producCateIniciales, setProducCateIniciales] = useState<CategoryProductWithRelations[]>([])

  // Hook para editar las categorías del producto
  const {
    ejecutarEditarCategorias,
  } = useEditarCategoriaProducto(id, categoriasIniciales, producCateIniciales)

  // Hook para obtener el producto por ID
  const { productoById, cargando: cargandoProducto, error: errorObtenerProducto, refrescar } = useProductoById(id)

  const formik = useFormik<ProductoFormData>({
    initialValues: {
      nombre_producto: '',
      descripcion: '',
      precio_unitario: '' as unknown as number,
      precio_mayorista: '' as unknown as number,
      categorias: [] as number[],
      url_imagen: '',
      imagen: undefined as File | undefined,
    },
    enableReinitialize: true,
    validationSchema: productoSchema,
    onSubmit: async (values, { resetForm }) => {
      await catchErrors(async () => {
        // Crear imagen
        if (values.imagen != undefined) {
          const formData = new FormData();
          formData.append("file", values.imagen as any);
          const cloudinaryRes: CloudinaryResponse = await subirImagenProducto(formData);
          if (cloudinaryRes && typeof cloudinaryRes === "object" && "error" in cloudinaryRes) {
            // Es un CloudinaryErrorResponse
            const errorRes = cloudinaryRes;
            console.error("Error al subir:", errorRes.error.message);
          } else {
            // Es un CloudinaryUploadResponse
            const response = cloudinaryRes;
            console.log("Imagen subida!");
            console.log("URL segura:", response.secure_url);
            // Asignar la URL de la imagen al producto
            values.url_imagen = response.secure_url;
          }
        }
        // Determinamos los valores a enviar
        const { nombre_producto, descripcion, url_imagen, precio_unitario, precio_mayorista } = values;
        const body = {
          nombre_producto,
          descripcion,
          url_imagen,
          precio_unitario,
          precio_mayorista,
        };


        // Editar el producto
        const result = await ejecutarEditar(body)

        // Editar las categorías asociadas
        if (values.categorias == undefined) {
          values.categorias = []

        }
        const categoriasFiltradas = values.categorias.filter((id): id is number => id !== undefined)
        const resultCat = await ejecutarEditarCategorias({ categoriasSeleccionadas: categoriasFiltradas })
        console.log("Categorias filtradas para evitar valores undefined:")
        console.log(categoriasFiltradas)

        //if (!result) throw new Error('Error al crear el producto')
        resetForm()
        AlertService.show('Producto editado exitosamente', 'success')
        mutate(queryKeys.productos)
        router.navigate(`/(tabs)/productos/${result.data.id}`)
      })
    },
  })

  // Carga el producto por ID al inicializar el formulario
  useEffect(() => {
    if (productoById) {
      const categorias = productoById.data.categorias_productos.map(catProd => catProd.categoria_id) || []

      const soloCategoriaIds = productoById.data.categorias_productos.map((r) => r.categoria_id)


      formik.setValues({
        nombre_producto: productoById.data.nombre_producto || '',
        descripcion: productoById.data.descripcion || '',
        precio_unitario: productoById.data.precio_unitario || 0,
        precio_mayorista: productoById.data.precio_mayorista || 0,
        categorias: categorias,
        url_imagen: productoById.data.url_imagen || '',
      })

      setCategoriasIniciales(categorias)
      console.log("Categorias iniciales:", categorias)
      setProducCateIniciales(productoById.data.categorias_productos)
    }
  }, [productoById])

  return {
    ...formik,
    cargandoProducto,
    enProceso,
    error,
    producto,
  }
}
// Eliminar
export const useProductoEliminarForm = (id: number | string) => {
  const { ejecutarEliminar, enProceso, error } = useEliminarProducto(id)

  const handleDelete = async () => {
    await catchErrors(async () => {
      const result = await ejecutarEliminar()

      if (!result) throw new Error('Error al eliminar el producto')
      AlertService.show('Producto eliminado exitosamente', 'success')
      mutate(queryKeys.productos)
      router.navigate('/(tabs)/productos')
    })
  }

  return {
    handleDelete,
    enProceso,
    error,
  }
}