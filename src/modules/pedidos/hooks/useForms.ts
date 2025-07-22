import queryKeys from '@/src/shared/constants/queryKeys'
import { useCatchErrors } from '@/src/shared/hooks/useCatchErorrs'
import { Order } from '@/src/shared/interfaces/OrderModel'
import { AlertService } from '@/src/shared/utils/AlertService'
import { useRouter } from 'expo-router'
import { useFormik } from 'formik'
import { mutate } from 'swr'
import { OrderFormData, orderSchema } from '../schemas/OrdenSchema'
import { useCrearOrden, useEditarOrden, useEliminarOrden, useOrdenById } from './useOrdenes'

/**
 * Formulario para crear orden
 */
export const useOrdenCrearForm = (categoria_pedido: Order["categoria_pedido"]) => {
  const { catchErrors } = useCatchErrors()
  const router = useRouter()

  const { ejecutarCrear, error, enProceso } = useCrearOrden()

  const formik = useFormik<OrderFormData>({
    initialValues: {
      fecha_pedido: '',
      fecha_entrega: '',
      cliente_id: '' as unknown as number,
      estado_pedido_id: '' as unknown as number,
      metodo_entrega_id: '' as unknown as number,
      categoria_pedido: categoria_pedido, // o 'salida', depende de lo que quieras crear por defecto
      tipo_pedido: 'mayorista', // o 'minorista'
    },
    validationSchema: orderSchema,
    onSubmit: async (values, { resetForm }) => {
      await catchErrors(async () => {
        const result = await ejecutarCrear(values)

        if (!result) throw new Error('Error al crear la orden')

        resetForm()
        AlertService.show('Orden creada exitosamente', 'success')
        mutate(queryKeys.ordenesEntrada)
        mutate(queryKeys.ordenesSalida)
        router.navigate('/pedidos')
      })
    },
  })

  return {
    ...formik,
    enProceso,
    error,
  }
}

/**
 * Formulario para editar orden
 */
export const useOrdenEditarForm = (id: number) => {
  const { catchErrors } = useCatchErrors()
  const router = useRouter()

  const { ejecutarEditar, error, enProceso } = useEditarOrden(id)

  const { ordenById, cargando, error: errorObtenerOrden, refrescar } = useOrdenById(id)

  const formik = useFormik<OrderFormData>({
    initialValues: {
      fecha_pedido: '',
      fecha_entrega: '',
      cliente_id: '' as unknown as number,
      estado_pedido_id: '' as unknown as number,
      metodo_entrega_id: '' as unknown as number,
      categoria_pedido: 'entrada',
      tipo_pedido: 'mayorista',
    },
    enableReinitialize: true,
    validationSchema: orderSchema,
    onSubmit: async (values, { resetForm }) => {
      await catchErrors(async () => {
        const result = await ejecutarEditar(values)

        if (!result) throw new Error('Error al editar la orden')

        resetForm()
        AlertService.show('Orden editada exitosamente', 'success')
        mutate(queryKeys.ordenesEntrada)
        mutate(queryKeys.ordenesSalida)
        router.navigate('/pedidos')
      })
    },
  })

  // Cargar datos iniciales de la orden
  if (ordenById) {
    formik.setValues({
      fecha_pedido: ordenById.data.fecha_pedido,
      fecha_entrega: ordenById.data.fecha_entrega,
      cliente_id: ordenById.data.cliente_id,
      estado_pedido_id: ordenById.data.estado_pedido_id,
      metodo_entrega_id: ordenById.data.metodo_entrega_id,
      categoria_pedido: ordenById.data.categoria_pedido,
      tipo_pedido: ordenById.data.tipo_pedido,
    })
  }

  return {
    ...formik,
    cargandoOrden: cargando,
    enProceso,
    error,
  }
}

/**
 * Formulario para eliminar orden
 */
export const useOrdenEliminarForm = (id: number | string) => {
  const { catchErrors } = useCatchErrors()
  const router = useRouter()

  const { ejecutarEliminar, enProceso, error } = useEliminarOrden(id)

  const handleDelete = async () => {
    await catchErrors(async () => {
      const result = await ejecutarEliminar()

      if (!result) throw new Error('Error al eliminar la orden')

      AlertService.show('Orden eliminada exitosamente', 'success')
      mutate(queryKeys.ordenesEntrada)
      mutate(queryKeys.ordenesSalida)
      router.navigate('/pedidos')
    })
  }

  return {
    handleDelete,
    enProceso,
    error,
  }
}
