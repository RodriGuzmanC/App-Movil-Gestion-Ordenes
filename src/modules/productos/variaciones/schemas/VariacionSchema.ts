import * as yup from 'yup';

export const variacionSchema = yup.object().shape({
  id: yup.number().optional(), // o required si aplica
  precio_unitario: yup
    .number()
    .typeError('Debe ser un número')
    .positive('Debe ser mayor que cero')
    .required('El precio es obligatorio'),
  precio_mayorista: yup
    .number()
    .typeError('Debe ser un número')
    .positive('Debe ser mayor que cero')
    .required('El precio mayorista es obligatorio'),
  stock: yup.number().min(1, 'Debe ser mayor a 0').required('El stock es obligatorio')
});

export type VariacionFormData = yup.InferType<typeof variacionSchema>
