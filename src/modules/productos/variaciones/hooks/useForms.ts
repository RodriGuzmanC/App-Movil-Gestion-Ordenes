import queryKeys from '@/src/shared/constants/queryKeys'
import { useCatchErrors } from '@/src/shared/hooks/useCatchErorrs'
import { Variation } from '@/src/shared/interfaces/VariationModel'
import { AlertService } from '@/src/shared/utils/AlertService'
import { useRouter } from 'expo-router'
import { useFormik } from 'formik'
import { useEffect } from 'react'
import { mutate } from 'swr'
import { VariacionFormData, variacionSchema } from '../schemas/VariacionSchema'
import { useCrearVariacion, useEditarVariacion, useEliminarVariacion } from './useVariaciones'

/**
 * Hook para crear una variación
 */
export const useVariacionCrearForm = (productoId: number) => {
    const { catchErrors } = useCatchErrors()
    const router = useRouter()

    const { ejecutarCrear, enProceso, error } = useCrearVariacion(productoId)

    const formik = useFormik<VariacionFormData>({
        initialValues: {
            precio_unitario: 0,
            precio_mayorista: 0,
            stock: 0,
        },
        validationSchema: variacionSchema,
        onSubmit: async (values, { resetForm }) => {
            await catchErrors(async () => {
                const result = await ejecutarCrear({ ...values, producto_id: productoId })
                if (!result) throw new Error('Error al crear la variación')

                resetForm()
                AlertService.show('Variación creada exitosamente', 'success')
                mutate(queryKeys.variaciones(productoId))
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
 * Hook para editar una variación
 */
export const useVariacionEditarForm = (variacionId: number, productoId: number, variacionObj: Variation) => {
    const { catchErrors } = useCatchErrors()
    const router = useRouter()

    const { ejecutarEditar, enProceso, error } = useEditarVariacion(productoId, variacionId)

    const formik = useFormik<VariacionFormData>({
        initialValues: {
            precio_unitario: 0,
            precio_mayorista: 0,
            stock: 0,
        },
        enableReinitialize: true,
        validationSchema: variacionSchema,
        onSubmit: async (values, { resetForm }) => {
            await catchErrors(async () => {
                const result = await ejecutarEditar(values)
                if (!result) throw new Error('Error al editar la variación')

                resetForm()
                AlertService.show('Variación editada exitosamente', 'success')
                mutate(queryKeys.productoById(productoId))
                router.back()
            })
        },
    })

    useEffect(() => {
        if (variacionObj) {
            formik.setValues({
                precio_unitario: variacionObj.precio_unitario,
                precio_mayorista: variacionObj.precio_mayorista,
                stock: variacionObj.stock,
            })
        }
    }, [variacionObj])

    return {
        ...formik,
        enProceso,
        error,
    }
}

/**
 * Hook para eliminar una variación
 */
export const useVariacionEliminarForm = (productoId: number, variacionId: number) => {
    const { catchErrors } = useCatchErrors()
    const router = useRouter()

    const { ejecutarEliminar, enProceso, error } = useEliminarVariacion(productoId, variacionId)

    const handleDelete = async () => {
        await catchErrors(async () => {
            const result = await ejecutarEliminar()
            if (!result) throw new Error('Error al eliminar la variación')

            AlertService.show('Variación eliminada exitosamente', 'success')
            mutate(queryKeys.productoById(productoId))
            router.back()
        })
    }

    return {
        handleDelete,
        enProceso,
        error,
    }
}
