import queryKeys from '@/src/shared/constants/queryKeys'
import { useCatchErrors } from '@/src/shared/hooks/useCatchErorrs'
import { Category } from '@/src/shared/interfaces/CategoryModel'
import { AlertService } from '@/src/shared/utils/AlertService'
import { useRouter } from 'expo-router'
import { useFormik } from 'formik'
import { useEffect } from 'react'
import { mutate } from 'swr'
import { CategoriaFormData, categoriaSchema } from '../schemas/CategoriaSchema'
import { useCrearCategoria, useEditarCategoria, useEliminarCategoria } from './useCategorias'

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
        router.navigate('/categorias')
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


export const useCategoriaEditarForm = (id: number, categoriaObj: Category) => {
  const { catchErrors } = useCatchErrors()
  const router = useRouter()

  const {
    categoria,
    ejecutarEditar,
    enProceso,
    error,
  } = useEditarCategoria(id)

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
        router.navigate('/categorias')
      })
    },
  })

  useEffect(() => {
    if (categoriaObj) {
      formik.setValues({
        nombre: categoriaObj.nombre || '',
        descripcion: categoriaObj.descripcion || '',
      })
    }
  }, [categoriaObj])

  return {
    ...formik,
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
      router.navigate('/categorias')
    })
  }

  return {
    handleDelete,
    enProceso,
    error,
  }
}

