import * as yup from 'yup';

export const productoSchema = yup.object().shape({
  id: yup.number().optional(), // o required si aplica
  nombre_producto: yup.string().required('El nombre es obligatorio'),
  precio_unitario: yup
    .number()
    .typeError('Debe ser un número')
    .positive('Debe ser mayor que cero')
    .required('El precio es obligatorio'),
  descripcion: yup.string().required('La descripción es obligatoria'),
  //url_imagen: yup.string().url('Debe ser una URL válida').required('La imagen es obligatoria'),
  precio_mayorista: yup
    .number()
    .typeError('Debe ser un número')
    .positive('Debe ser mayor que cero')
    .required('El precio mayorista es obligatorio'),
  //stock: yup.number().min(0, 'Debe ser mayor o igual a 0').required('El stock es obligatorio')
  categorias: yup
    .array()
    .of(
      yup
        .number()
        .typeError('Cada categoría debe ser un ID numérico')
        .integer('El ID de la categoría debe ser un número entero')
        .positive('El ID de la categoría debe ser positivo')
    )
    .min(1, 'Debe seleccionar al menos una categoría')
    .required('Debe seleccionar al menos una categoría'),
});

export type ProductoFormData = yup.InferType<typeof productoSchema>
