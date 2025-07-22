import * as yup from 'yup';

export const orderSchema = yup.object().shape({
  fecha_pedido: yup.string().required('La fecha de pedido es obligatoria'),
  fecha_entrega: yup.string().required('La fecha de entrega es obligatoria'),
  cliente_id: yup.number()
    .typeError('Debe seleccionar un cliente')
    .required('El cliente es obligatorio'),
  estado_pedido_id: yup.number()
    .typeError('Debe seleccionar un estado')
    .required('El estado es obligatorio'),
  metodo_entrega_id: yup.number()
    .typeError('Debe seleccionar un método de entrega')
    .required('El método de entrega es obligatorio'),
  categoria_pedido: yup.mixed<'entrada' | 'salida'>()
    .oneOf(['entrada', 'salida'], 'Categoría inválida')
    .required('La categoría es obligatoria'),
  tipo_pedido: yup.mixed<'mayorista' | 'minorista'>()
    .oneOf(['mayorista', 'minorista'], 'Tipo de pedido inválido')
    .required('El tipo de pedido es obligatorio'),
})

export type OrderFormData = yup.InferType<typeof orderSchema>
