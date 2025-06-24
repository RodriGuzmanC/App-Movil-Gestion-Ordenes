import queryKeys from '@/src/shared/constants/queryKeys'
import { useCatchErrors } from '@/src/shared/hooks/useCatchErorrs'
import { AlertService } from '@/src/shared/utils/AlertService'
import { useRouter } from 'expo-router'
import { useFormik } from 'formik'
import { useEffect } from 'react'
import { mutate } from 'swr'
import { CategoriaFormData, categoriaSchema } from '../schemas/CategoriaSchema'
import { useCategoriaById, useCrearCategoria, useEditarCategoria, useEliminarCategoria } from './useCategorias'

export const useCategoriaCrearForm = () => {
  const { catchErrors } = useCatchErrors()
  const router = useRouter()

  const {
    categoria,
    ejecutarCrear,
    enProceso,
    error,
  } = useCrearCategoria()

  const formik = useFormik<CategoriaFormData>({
    initialValues: {
      nombre: '',
      descripcion: '',
    },
    validationSchema: categoriaSchema,
    onSubmit: async (values, { resetForm }) => {
      await catchErrors(async () => {
        const result = await ejecutarCrear(values)
        if (!result) throw new Error('Error al crear la categoría')

        resetForm()
        AlertService.show('Categoría creada exitosamente', 'success')
        mutate(queryKeys.categorias)
        router.navigate('/(tabs)')
      })
    },
  })

  return {
    ...formik,
    categoria,
    enProceso,
    error,
  }
}


export const useCategoriaEditarForm = (id: number) => {
  const { catchErrors } = useCatchErrors()
  const router = useRouter()

  const {
    categoria,
    ejecutarEditar,
    enProceso,
    error,
  } = useEditarCategoria(id)

  const {
    categoriaById,
    cargando: cargandoCategoria,
    error: errorObtenerCategoria,
  } = useCategoriaById(id)

  const formik = useFormik<CategoriaFormData>({
    initialValues: {
      nombre: '',
      descripcion: '',
    },
    enableReinitialize: true,
    validationSchema: categoriaSchema,
    onSubmit: async (values, { resetForm }) => {
      await catchErrors(async () => {
        const result = await ejecutarEditar(values)
        if (!result) throw new Error('Error al editar la categoría')

        resetForm()
        AlertService.show('Categoría editada exitosamente', 'success')
        mutate(queryKeys.categorias)
        router.navigate('/(tabs)')
      })
    },
  })

  useEffect(() => {
    if (categoriaById) {
      formik.setValues({
        nombre: categoriaById.data.nombre || '',
        descripcion: categoriaById.data.descripcion || '',
      })
    }
  }, [categoriaById])

  return {
    ...formik,
    cargandoCategoria,
    enProceso,
    error,
    categoria,
  }
}



export const useCategoriaEliminarForm = (id: string | number) => {
  const { catchErrors } = useCatchErrors()
  const router = useRouter()

  const {
    ejecutarEliminar,
    enProceso,
    error,
  } = useEliminarCategoria(id)

  const handleDelete = async () => {
    await catchErrors(async () => {
      const result = await ejecutarEliminar()
      if (!result) throw new Error('Error al eliminar la categoría')

      AlertService.show('Categoría eliminada exitosamente', 'success')
      mutate(queryKeys.categorias)
      router.navigate('/(tabs)')
    })
  }

  return {
    handleDelete,
    enProceso,
    error,
  }
}

