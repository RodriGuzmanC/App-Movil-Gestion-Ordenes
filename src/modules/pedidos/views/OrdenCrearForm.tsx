import { useClientes } from '@/src/modules/clientes/hooks/useClientes'
import { Order } from '@/src/shared/interfaces/OrderModel'
import React from 'react'
import { ScrollView, View } from 'react-native'
import { Button, HelperText, RadioButton, Text } from 'react-native-paper'
import { DatePickerInput } from 'react-native-paper-dates'
import { Dropdown } from 'react-native-paper-dropdown'
import { useOrdenCrearForm } from '../hooks/useForms'
import { useEstadosPedidos, useMetodosEntrega } from '../hooks/useOrdenes'


export const CrearOrdenScreen = ({ tipoPedido = "entrada" }: {tipoPedido: Order["categoria_pedido"]}) => {
  const { clientes } = useClientes()
  const { estadosPedidos } = useEstadosPedidos()
  const { metodosEntrega } = useMetodosEntrega()

  const {
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
    errors,
    touched,
    enProceso,
  } = useOrdenCrearForm(tipoPedido)

  return (
    <ScrollView className="flex-1 p-4">
      <Text className="text-lg mb-4 font-bold">Crear Pedido ({tipoPedido.toUpperCase()})</Text>

      <Dropdown
        label="Cliente"
        mode="outlined"
        value={values.cliente_id ? values.cliente_id.toString() : ''}
        onSelect={(value) => setFieldValue('cliente_id', parseInt(value ?? '0'))}
        options={clientes?.data.map(cliente => ({
          label: cliente.nombre,
          value: cliente.id.toString()
        })) || []}
      />
      <HelperText type="error" visible={!!errors.cliente_id && touched.cliente_id}>
        {errors.cliente_id}
      </HelperText>

      <Dropdown
        label="Estado del Pedido"
        mode="outlined"
        value={values.estado_pedido_id ? values.estado_pedido_id.toString() : ''}
        onSelect={(value) => setFieldValue('estado_pedido_id', parseInt(value ?? '0'))}
        options={estadosPedidos?.data.map(estado => ({
          label: estado.nombre,
          value: estado.id.toString()
        })) || []}
      />
      <HelperText type="error" visible={!!errors.estado_pedido_id && touched.estado_pedido_id}>
        {errors.estado_pedido_id}
      </HelperText>

      <Dropdown
        label="Método de Entrega"
        mode="outlined"
        value={values.metodo_entrega_id ? values.metodo_entrega_id.toString() : ''}
        onSelect={(value) => setFieldValue('metodo_entrega_id', parseInt(value ?? '0'))}
        options={metodosEntrega?.data.map(metodo => ({
          label: metodo.nombre,
          value: metodo.id.toString()
        })) || []}
      />
      <HelperText type="error" visible={!!errors.metodo_entrega_id && touched.metodo_entrega_id}>
        {errors.metodo_entrega_id}
      </HelperText>

      <View className="mt-4">
        <Text className="mb-2">Tipo de Pedido</Text>
        <RadioButton.Group
          onValueChange={handleChange('tipo_pedido')}
          value={values.tipo_pedido}
        >
          <View className="flex-row items-center mb-2">
            <RadioButton value="mayorista" />
            <Text>Mayorista</Text>
          </View>
          <View className="flex-row items-center">
            <RadioButton value="minorista" />
            <Text>Minorista</Text>
          </View>
        </RadioButton.Group>
      </View>

      <View className="mt-4">
        <Text className="mb-2">Fecha de pedido</Text>
        <DatePickerInput
          locale="es"
          label="Fecha de pedido"
          value={values.fecha_pedido ? new Date(values.fecha_pedido) : undefined}
          onChange={(date) => {
            if (date) {
              setFieldValue('fecha_pedido', date.toISOString().split('T')[0])
            }
          }}
          inputMode="start"
        />
        <HelperText type="error" visible={!!errors.fecha_entrega && touched.fecha_entrega}>
          {errors.fecha_entrega}
        </HelperText>
      </View>

      <View className="mt-4">
        <Text className="mb-2">Fecha de Entrega</Text>
        <DatePickerInput
          locale="es"
          label="Fecha de entrega"
          value={values.fecha_entrega ? new Date(values.fecha_entrega) : undefined}
          onChange={(date) => {
            if (date) {
              setFieldValue('fecha_entrega', date.toISOString().split('T')[0])
            }
          }}
          inputMode="start"
        />
        <HelperText type="error" visible={!!errors.fecha_entrega && touched.fecha_entrega}>
          {errors.fecha_entrega}
        </HelperText>
      </View>

      <Button
        mode="contained"
        onPress={() => handleSubmit()}
        loading={enProceso}
        disabled={enProceso}
        className="mt-6"
      >
        Guardar Pedido
      </Button>
    </ScrollView>
  )
}
