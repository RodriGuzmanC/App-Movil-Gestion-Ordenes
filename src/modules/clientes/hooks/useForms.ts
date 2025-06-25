import queryKeys from '@/src/shared/constants/queryKeys'
import { useCatchErrors } from '@/src/shared/hooks/useCatchErorrs'
import { AlertService } from '@/src/shared/utils/AlertService'
import { useRouter } from 'expo-router'
import { useFormik } from 'formik'
import { useEffect } from 'react'
import { mutate } from 'swr'
import { ClienteFormData, clienteSchema } from '../schemas/ClienteSchema'
import {
  useClienteById,
  useCrearCliente,
  useEditarCliente,
  useEliminarCliente,
} from './useClientes'

// Crear cliente
export const useClienteCrearForm = () => {
  const { catchErrors } = useCatchErrors()
  const router = useRouter()

  const {
    cliente,
    ejecutarCrear,
    enProceso,
    error,
  } = useCrearCliente()

  const formik = useFormik<ClienteFormData>({
    initialValues: {
      nombre: '',
    },
    validationSchema: clienteSchema,
    onSubmit: async (values, { resetForm }) => {
      await catchErrors(async () => {
        const result = await ejecutarCrear(values)
        if (!result) throw new Error('Error al crear el cliente')

        resetForm()
        AlertService.show('Cliente creado exitosamente', 'success')
        mutate(queryKeys.clientes)
        router.navigate('/clientes')
      })
    },
  })

  return {
    ...formik,
    cliente,
    enProceso,
    error,
  }
}

// Editar cliente
export const useClienteEditarForm = (id: number) => {
  const { catchErrors } = useCatchErrors()
  const router = useRouter()

  const {
    cliente,
    ejecutarEditar,
    enProceso,
    error,
  } = useEditarCliente(id)

  const {
    clienteById,
    cargando: cargandoCliente,
    error: errorObtenerCliente,
  } = useClienteById(id)

  const formik = useFormik<ClienteFormData>({
    initialValues: {
      nombre: '',
    },
    enableReinitialize: true,
    validationSchema: clienteSchema,
    onSubmit: async (values, { resetForm }) => {
      await catchErrors(async () => {
        const result = await ejecutarEditar(values)
        if (!result) throw new Error('Error al editar el cliente')

        resetForm()
        AlertService.show('Cliente editado exitosamente', 'success')
        mutate(queryKeys.clientes)
        router.navigate('/clientes')
      })
    },
  })

  useEffect(() => {
    if (clienteById) {
      formik.setValues({
        nombre: clienteById.data.nombre || '',
      })
    }
  }, [clienteById])

  return {
    ...formik,
    cargandoCliente,
    enProceso,
    error,
    cliente,
  }
}

// Eliminar cliente
export const useClienteEliminarForm = (id: string | number) => {
  const { catchErrors } = useCatchErrors()
  const router = useRouter()

  const {
    ejecutarEliminar,
    enProceso,
    error,
  } = useEliminarCliente(id)

  const handleDelete = async () => {
    await catchErrors(async () => {
      const result = await ejecutarEliminar()
      if (!result) throw new Error('Error al eliminar el cliente')

      AlertService.show('Cliente eliminado exitosamente', 'success')
      mutate(queryKeys.clientes)
      router.navigate('/clientes')
    })
  }

  return {
    handleDelete,
    enProceso,
    error,
  }
}
