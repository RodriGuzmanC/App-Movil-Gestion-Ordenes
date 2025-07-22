import queryKeys from '@/src/shared/constants/queryKeys'
import { useCatchErrors } from '@/src/shared/hooks/useCatchErorrs'
import { OrderDetail } from '@/src/shared/interfaces/OrderDetailModel'
import { Order } from '@/src/shared/interfaces/OrderModel'
import { VariationWithRelations } from '@/src/shared/interfaces/VariationModel'
import { AlertService } from '@/src/shared/utils/AlertService'
import { useRouter } from 'expo-router'
import { useFormik } from 'formik'
import { mutate } from 'swr'
import { OrderDetailFormData, orderDetailSchema } from '../schemas/OrdenDetalleSchema'
import { useCrearDetalleOrden, useEditarDetalleOrden, useEliminarDetalleOrden } from './useOrdenDetalles'

/**
 * Formulario para crear detalle de orden
 */
export const useDetalleOrdenCrearForm = (orderId: number, variation: VariationWithRelations, tipoOrden: Order['tipo_pedido']) => {
  const { catchErrors } = useCatchErrors()

  const { ejecutarCrear, refrescarLista, error, enProceso } = useCrearDetalleOrden(orderId)

  const formik = useFormik<OrderDetailFormData>({
    initialValues: {
      pedido_id: orderId,
      variacion_id: variation.id,
      cantidad: 1,
      precio: tipoOrden == 'mayorista' ? variation.precio_mayorista : variation.precio_unitario,
      precio_rebajado: tipoOrden == 'mayorista' ? variation.precio_mayorista : variation.precio_unitario,
    },
    validationSchema: orderDetailSchema,
    onSubmit: async (values, { resetForm }) => {
      await catchErrors(async () => {
        const result = await ejecutarCrear(values)

        if (!result) throw new Error('Error al crear el detalle de orden')

        resetForm()
        AlertService.show('Detalle de orden creado exitosamente', 'success')
        refrescarLista()
        mutate(queryKeys.ordenById(orderId))
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
 * Formulario para editar detalle de orden
 */
export const useDetalleOrdenEditarForm = (orderId: number, detalleId: number, orderDetailObj: OrderDetail) => {
  const { catchErrors } = useCatchErrors()

  const { ejecutarEditar, refrescarLista, error, enProceso } = useEditarDetalleOrden(orderId, detalleId)

  const formik = useFormik<OrderDetailFormData>({
    initialValues: {
      pedido_id: orderId,
      variacion_id: orderDetailObj.variacion_id,
      cantidad: orderDetailObj.cantidad,
      precio: orderDetailObj.precio,
      precio_rebajado: orderDetailObj.precio_rebajado || 0,
    },
    enableReinitialize: true,
    validationSchema: orderDetailSchema,
    onSubmit: async (values, { resetForm }) => {
      await catchErrors(async () => {
        const result = await ejecutarEditar(values)

        if (!result) throw new Error('Error al editar el detalle de orden')

        resetForm()
        AlertService.show('Detalle de orden editado exitosamente', 'success')
        refrescarLista()
        mutate(queryKeys.ordenById(orderId))
      })
    },
  })

  // Cargar los datos iniciales del detalle
  /*if (orderDetailObj) {
    formik.setValues({
      pedido_id: orderDetailObj.pedido_id,
      variacion_id: orderDetailObj.variacion_id,
      cantidad: orderDetailObj.cantidad,
      precio: orderDetailObj.precio,
      precio_rebajado: orderDetailObj.precio_rebajado || 0,
    })
  }*/

  return {
    ...formik,
    enProceso,
    error,
  }
}

/**
 * Formulario para eliminar detalle de orden
 */
export const useDetalleOrdenEliminarForm = (orderId: number, detalleId: number) => {
  const { catchErrors } = useCatchErrors()
  const router = useRouter()

  const { ejecutarEliminar, refrescarLista, enProceso, error } = useEliminarDetalleOrden(orderId, detalleId)

  const handleDelete = async () => {
    await catchErrors(async () => {
      const result = await ejecutarEliminar()

      if (!result) throw new Error('Error al eliminar el detalle de orden')

      AlertService.show('Detalle de orden eliminado exitosamente', 'success')
      refrescarLista()
      mutate(queryKeys.ordenById(orderId))
    })
  }

  return {
    handleDelete,
    enProceso,
    error,
  }
}
