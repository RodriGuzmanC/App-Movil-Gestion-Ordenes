import queryKeys from '@/src/shared/constants/queryKeys'
import { useCatchErrors } from '@/src/shared/hooks/useCatchErorrs'
import { AttributeType } from '@/src/shared/interfaces/AttributeTypeModel'
import { AlertService } from '@/src/shared/utils/AlertService'
import { useRouter } from 'expo-router'
import { useFormik } from 'formik'
import { useEffect } from 'react'
import { mutate } from 'swr'
import { AtributoFormData, AtributoSchema, TipoDeAtributoFormData, TipoDeAtributoSchema } from '../schemas/caracteristicasSchemas'
import { useAtributoById, useCrearAtributo, useCrearTipoAtributo, useEditarAtributo, useEditarTipoAtributo, useEliminarAtributo, useEliminarTipoAtributo } from './useCaracteristicas'


// Crear Tipo de Atributo
export const useTipoAtributoCrearForm = () => {
  const { catchErrors } = useCatchErrors()
  const router = useRouter()

  const { tipoAtributo, ejecutarCrear, enProceso, error } = useCrearTipoAtributo()

  const formik = useFormik<TipoDeAtributoFormData>({
    initialValues: { 
        nombre: '' 
    },
    validationSchema: TipoDeAtributoSchema,
    onSubmit: async (values, { resetForm }) => {
      await catchErrors(async () => {
        const result = await ejecutarCrear(values)
        if (!result) throw new Error('Error al crear el tipo de atributo')

        resetForm()
        AlertService.show('Tipo de atributo creado exitosamente', 'success')
        mutate(queryKeys.tiposAtributosConValores)
        router.navigate('/caracteristicas')
      })
    },
  })

  return {
    ...formik,
    tipoAtributo,
    enProceso,
    error,
  }
}

// Editar Tipo de Atributo
export const useTipoAtributoEditarForm = (id: number, attributeTypeObj: AttributeType) => {
  const { catchErrors } = useCatchErrors()
  const router = useRouter()

  const { tipoAtributo, ejecutarEditar, enProceso, error } = useEditarTipoAtributo(id)

  const formik = useFormik<TipoDeAtributoFormData>({
    initialValues: { 
        nombre: '' 
    },
    enableReinitialize: true,
    validationSchema: TipoDeAtributoSchema,
    onSubmit: async (values, { resetForm }) => {
      await catchErrors(async () => {
        const result = await ejecutarEditar(values)
        if (!result) throw new Error('Error al editar el tipo de atributo')

        resetForm()
        AlertService.show('Tipo de atributo editado exitosamente', 'success')
        mutate(queryKeys.tiposAtributosConValores)
        router.navigate('/caracteristicas')
      })
    },
  })

  useEffect(() => {
    if (attributeTypeObj) {
      formik.setValues({ nombre: attributeTypeObj.nombre || '' })
    }
  }, [attributeTypeObj])

  return {
    ...formik,
    enProceso,
    error,
    tipoAtributo,
  }
}

// Eliminar Tipo de Atributo
export const useTipoAtributoEliminarForm = (id: string | number) => {
  const { catchErrors } = useCatchErrors()
  const router = useRouter()

  const { ejecutarEliminar, enProceso, error } = useEliminarTipoAtributo(id)

  const handleDelete = async () => {
    await catchErrors(async () => {
      const result = await ejecutarEliminar()
      if (!result) throw new Error('Error al eliminar el tipo de atributo')

      AlertService.show('Tipo de atributo eliminado exitosamente', 'success')
      mutate(queryKeys.tiposAtributosConValores)
      router.navigate('/caracteristicas')
    })
  }

  return {
    handleDelete,
    enProceso,
    error,
  }
}


/**
 * 
 *  ATRIBUTOS - HIJOS
 * 
 * 
 */

// Crear Atributo
export const useAtributoCrearForm = (tipoAtributoId: number) => {
  const { catchErrors } = useCatchErrors()
  const router = useRouter()

  const { atributo, ejecutarCrear, enProceso, error } = useCrearAtributo()

  const formik = useFormik<AtributoFormData>({
    initialValues: {
        tipo_atributo_id: tipoAtributoId,
        valor: '' 
    },
    validationSchema: AtributoSchema,
    onSubmit: async (values, { resetForm }) => {
      await catchErrors(async () => {
        const result = await ejecutarCrear(values)
        if (!result) throw new Error('Error al crear el atributo')

        resetForm()
        AlertService.show('Atributo creado exitosamente', 'success')
        mutate(queryKeys.tiposAtributosConValores)
        router.navigate('/caracteristicas')
      })
    },
  })

  return {
    ...formik,
    atributo,
    enProceso,
    error,
  }
}

// Editar Atributo
export const useAtributoEditarForm = (id: number) => {
  const { catchErrors } = useCatchErrors()
  const router = useRouter()

  const { atributo, ejecutarEditar, enProceso, error } = useEditarAtributo(id)
  const { atributoById, cargando, error: errorObtener } = useAtributoById(id)

  const formik = useFormik<AtributoFormData>({
    initialValues: {
        // Puede causar problemas
        tipo_atributo_id: 0,
        valor: '' 
    },
    enableReinitialize: true,
    validationSchema: AtributoSchema,
    onSubmit: async (values, { resetForm }) => {
      await catchErrors(async () => {
        const result = await ejecutarEditar(values)
        if (!result) throw new Error('Error al editar el atributo')

        resetForm()
        AlertService.show('Atributo editado exitosamente', 'success')
        mutate(queryKeys.tiposAtributosConValores)
        router.navigate('/caracteristicas')
      })
    },
  })

  useEffect(() => {
    if (atributoById) {
      formik.setValues({ 
        valor: atributoById.data.valor || '', 
        tipo_atributo_id: atributoById.data.tipo_atributo_id || 0 
    })
    }
  }, [atributoById])

  return {
    ...formik,
    cargando,
    enProceso,
    error,
    atributo,
  }
}

// Eliminar Atributo
export const useAtributoEliminarForm = (id: string | number) => {
  const { catchErrors } = useCatchErrors()
  const router = useRouter()

  const { ejecutarEliminar, enProceso, error } = useEliminarAtributo(id)

  const handleDelete = async () => {
    await catchErrors(async () => {
      const result = await ejecutarEliminar()
      if (!result) throw new Error('Error al eliminar el atributo')

      AlertService.show('Atributo eliminado exitosamente', 'success')
      mutate(queryKeys.tiposAtributosConValores)
      router.navigate('/caracteristicas')
    })
  }

  return {
    handleDelete,
    enProceso,
    error,
  }
}