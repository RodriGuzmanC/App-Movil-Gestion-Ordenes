import * as yup from 'yup'

export const clienteSchema = yup.object().shape({
  id: yup.number().optional(), // o .required() si aplica en edición
  nombre: yup.string().required('El nombre es obligatorio'),
})

export type ClienteFormData = yup.InferType<typeof clienteSchema>
