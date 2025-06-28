import * as yup from 'yup'

/**
 *  Scheema para validar la creación y edición de un Tipo de Atributo.
 */
export const TipoDeAtributoSchema = yup.object().shape({
    id: yup.number().optional(), // o .required() si aplica en edición
    nombre: yup.string().required('El nombre es obligatorio'),
})

export type TipoDeAtributoFormData = yup.InferType<typeof TipoDeAtributoSchema>


/**
 *  Scheema para validar la creación y edición de un Atributo.
 */

export const AtributoSchema = yup.object().shape({
    id: yup.number().optional(), // o .required() si aplica en edición
    tipo_atributo_id: yup.number().required('El tipo de atributo es obligatorio'),
    valor: yup.string().required('El nombre es obligatorio'),
})

export type AtributoFormData = yup.InferType<typeof AtributoSchema>