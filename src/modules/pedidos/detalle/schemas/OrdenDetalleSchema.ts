import * as yup from 'yup';

export const orderDetailSchema = yup.object().shape({
  pedido_id: yup.number()
    .typeError('Debe de haber un id de pedido')
    .required('La ID del pedido es obligatoria'),

  variacion_id: yup.number()
    .typeError('Debe seleccionar una variación')
    .required('La variación es obligatoria'),

  cantidad: yup.number()
    .typeError('Debe ingresar una cantidad')
    .min(1, 'La cantidad debe ser mayor a cero')
    .required('La cantidad es obligatoria'),

  precio: yup.number()
    .typeError('Debe ingresar un precio')
    .min(0, 'El precio no puede ser negativo')
    .required('El precio es obligatorio'),

  precio_rebajado: yup.number()
    .typeError('Debe ingresar un precio rebajado')
    .min(0, 'El precio rebajado no puede ser negativo')
    .required(),
})

export type OrderDetailFormData = yup.InferType<typeof orderDetailSchema>

export interface Cantidades {
    variacionId: number
    cantidad: number
}

export interface Precios {
    variacionId: number
    precio: number
}

export interface TipoModificador {
    nombre: "aumentar" | "disminuir"
}