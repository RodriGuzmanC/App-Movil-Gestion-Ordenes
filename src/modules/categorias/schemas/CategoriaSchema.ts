import * as yup from 'yup'

export const categoriaSchema = yup.object().shape({
  id: yup.number().optional(), // o .required() si aplica en edición
  nombre: yup.string().required('El nombre es obligatorio'),
  descripcion: yup.string().required('La descripción es obligatoria'),
})

export type CategoriaFormData = yup.InferType<typeof categoriaSchema>
