import queryKeys from '@/src/shared/constants/queryKeys'
import { Client } from '@/src/shared/interfaces/ClientModel'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import {
    crearCliente,
    editarCliente,
    eliminarCliente,
    getClienteById,
    getClientes,
} from '../api/clientesApi'

// Obtener todos los clientes con paginación
export const useClientes = (pagina: number = 1, limite: number = 10) => {
  const {
    data: clientes,
    isLoading: cargando,
    error,
  } = useSWR(queryKeys.clientes(pagina, limite), () => getClientes(pagina, limite))

  return {
    clientes,
    cargando,
    error: error?.message ?? null,
  }
}

// Obtener un cliente por ID
export const useClienteById = (id: string | number) => {
  const { data, error, isLoading, mutate } = useSWR(
    queryKeys.clienteById(id),
    () => getClienteById(id),
  )

  return {
    clienteById: data,
    cargando: isLoading,
    error: error?.message ?? null,
    refrescar: mutate,
  }
}

// Eliminar cliente
export const useEliminarCliente = (id: string | number) => {
  const { data, trigger, isMutating, error } = useSWRMutation(
    queryKeys.clienteById(id),
    () => eliminarCliente(id)
  )

  return {
    cliente: data,
    ejecutarEliminar: trigger,
    error: error?.message ?? null,
    enProceso: isMutating,
  }
}

// Editar cliente
export const useEditarCliente = (id: string | number) => {
  const { data, trigger, isMutating, error } = useSWRMutation(
    queryKeys.clienteById(id),
    (key, { arg }: { arg: Partial<Client> }) => editarCliente(id, arg)
  )

  return {
    cliente: data,
    ejecutarEditar: trigger,
    error: error?.message ?? null,
    enProceso: isMutating,
  }
}

// Crear cliente
export const useCrearCliente = () => {
  const { data, trigger, isMutating, error } = useSWRMutation(
    queryKeys.clienteById('nuevo'),
    (key, { arg }: { arg: Partial<Client> }) => crearCliente(arg)
  )

  return {
    cliente: data,
    ejecutarCrear: trigger,
    error: error?.message ?? null,
    enProceso: isMutating,
  }
}
