import queryKeys from '@/src/shared/constants/queryKeys'
import { useCatchErrors } from '@/src/shared/hooks/useCatchErorrs'
import { VariationAttribute } from '@/src/shared/interfaces/VariationAttributeModel'
import { AlertService } from '@/src/shared/utils/AlertService'
import { useRouter } from 'expo-router'
import { useFormik } from 'formik'
import { useEffect } from 'react'
import { mutate } from 'swr'
import { AtributoVariacionFormData, atributoVariacionSchema } from '../schemas/VariaAtributoSchema'
import { useCrearAtributoVariacion, useEditarAtributoVariacion, useEliminarAtributoVariacion } from './useVariaAtributos'

/**
 * Hook para crear un atributo de variación
 */
export const useAtributoVariacionCrearForm = (productoId: number, variacionId: number) => {
    const { catchErrors } = useCatchErrors()
    const router = useRouter()

    const { ejecutarCrear, enProceso, error } = useCrearAtributoVariacion(productoId, variacionId)

    const formik = useFormik<AtributoVariacionFormData>({
        initialValues: {
            atributo_id: 0,
            variacion_id: 0
        },
        validationSchema: atributoVariacionSchema,
        onSubmit: async (values, { resetForm }) => {
            await catchErrors(async () => {
                const result = await ejecutarCrear({ ...values, variacion_id: variacionId })
                if (!result) throw new Error('Error al crear el atributo de variación')

                resetForm()
                AlertService.show('Atributo creado exitosamente', 'success')
                mutate(queryKeys.variacionById(productoId, variacionId))
                router.back()
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
 * Hook para editar un atributo de variación
 */
export const useAtributoVariacionEditarForm = (productoId: number, variacionId: number, varAttributeId: number, atributoObj: VariationAttribute) => {
    const { catchErrors } = useCatchErrors()
    const router = useRouter()

    const { ejecutarEditar, enProceso, error } = useEditarAtributoVariacion(productoId, variacionId, varAttributeId)

    const formik = useFormik<AtributoVariacionFormData>({
        initialValues: {
            atributo_id: variacionId,
            variacion_id: 0
        },
        enableReinitialize: true,
        validationSchema: atributoVariacionSchema,
        onSubmit: async (values, { resetForm }) => {
            await catchErrors(async () => {
                const result = await ejecutarEditar(values)
                if (!result) throw new Error('Error al editar el atributo de variación')

                resetForm()
                AlertService.show('Atributo editado exitosamente', 'success')
                mutate(queryKeys.variacionById(productoId, variacionId))
                router.back()
            })
        },
    })

    useEffect(() => {
        if (atributoObj) {
            formik.setValues({
                atributo_id: atributoObj.atributo_id,
                variacion_id: atributoObj.variacion_id
            })
        }
    }, [atributoObj])

    return {
        ...formik,
        enProceso,
        error,
    }
}

/**
 * Hook para eliminar un atributo de variación
 */
export const useAtributoVariacionEliminarForm = (productoId: number, variacionId: number, atributoId: number) => {
    const { catchErrors } = useCatchErrors()
    const router = useRouter()

    const { ejecutarEliminar, enProceso, error } = useEliminarAtributoVariacion(productoId, variacionId, atributoId)

    const handleDelete = async () => {
        await catchErrors(async () => {
            const result = await ejecutarEliminar()
            if (!result) throw new Error('Error al eliminar el atributo de variación')

            AlertService.show('Atributo eliminado exitosamente', 'success')
            mutate(queryKeys.productoById(productoId))
            //router.back()
        })
    }

    return {
        handleDelete,
        enProceso,
        error,
    }
}
