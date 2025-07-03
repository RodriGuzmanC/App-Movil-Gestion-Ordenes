import * as yup from 'yup';

export const atributoVariacionSchema = yup.object().shape({
  id: yup.number().optional(), // o required si aplica
  variacion_id: yup
    .number()
    .typeError('Debe ser un número')
    .positive('Debe ser mayor que cero')
    .required('La variacion es obligatorio'),
  atributo_id: yup
    .number()
    .typeError('Debe ser un número')
    .positive('Debe ser mayor que cero')
    .required('Elige un atributo'),
});

export type AtributoVariacionFormData = yup.InferType<typeof atributoVariacionSchema>