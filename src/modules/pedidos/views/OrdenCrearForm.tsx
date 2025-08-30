import { useClientes } from '@/src/modules/clientes/hooks/useClientes'
import { Order } from '@/src/shared/interfaces/OrderModel'
import { ajustarFechaSinZona } from '@/src/shared/utils/datetimeConvert'
import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
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
    <ScrollView contentContainerStyle={styles.container}>

      {/* Cliente */}
      <Dropdown
        label="Cliente"
        mode="outlined"
        value={values.cliente_id?.toString() || ''}
        onSelect={(value) => setFieldValue('cliente_id', parseInt(value ?? '0'))}
        options={clientes?.data.map(cliente => ({
          label: cliente.nombre,
          value: cliente.id.toString()
        })) || []}
      />
      <HelperText type="error" visible={!!errors.cliente_id && touched.cliente_id}>
        {errors.cliente_id}
      </HelperText>

      {/* Estado Pedido */}
      <Dropdown
        label="Estado del Pedido"
        mode="outlined"
        value={values.estado_pedido_id?.toString() || ''}
        onSelect={(value) => setFieldValue('estado_pedido_id', parseInt(value ?? '0'))}
        options={estadosPedidos?.data.map(estado => ({
          label: estado.nombre,
          value: estado.id.toString()
        })) || []}
      />
      <HelperText type="error" visible={!!errors.estado_pedido_id && touched.estado_pedido_id}>
        {errors.estado_pedido_id}
      </HelperText>

      {/* Método de Entrega */}
      <Dropdown
        label="Método de Entrega"
        mode="outlined"
        value={values.metodo_entrega_id?.toString() || ''}
        onSelect={(value) => setFieldValue('metodo_entrega_id', parseInt(value ?? '0'))}
        options={metodosEntrega?.data.map(metodo => ({
          label: metodo.nombre,
          value: metodo.id.toString()
        })) || []}
      />
      <HelperText type="error" visible={!!errors.metodo_entrega_id && touched.metodo_entrega_id}>
        {errors.metodo_entrega_id}
      </HelperText>

      {/* Tipo de Pedido */}
      <View style={styles.section}>
        <Text style={styles.label}>Tipo de Pedido</Text>
        <RadioButton.Group
          onValueChange={handleChange('tipo_pedido')}
          value={values.tipo_pedido}
        >
          <View style={{ flexDirection: 'row', gap: 16 }}>
            <View style={styles.radioRow}>
            <RadioButton value="mayorista" />
            <Text>Mayorista</Text>
          </View>
          <View style={styles.radioRow}>
            <RadioButton value="minorista" />
            <Text>Minorista</Text>
          </View>
          </View>
        </RadioButton.Group>
      </View>

      {/* Fecha Pedido */}
      <View style={styles.section}>
        <Text style={styles.label}>Fecha de Pedido</Text>
        <DatePickerInput
          locale="es"
          label="Fecha de pedido"
          value={values.fecha_pedido ? new Date(values.fecha_pedido) : undefined}
          onChange={(date) => {
            if (date) {
              setFieldValue('fecha_pedido', ajustarFechaSinZona(date))
            }
          }}
          inputMode="start"
        />
        <HelperText type="error" visible={!!errors.fecha_pedido && touched.fecha_pedido}>
          {errors.fecha_pedido}
        </HelperText>
      </View>

      {/* Fecha Entrega */}
      <View style={styles.section}>
        <Text style={styles.label}>Fecha de Entrega</Text>
        <DatePickerInput
          locale="es"
          label="Fecha de entrega"
          value={values.fecha_entrega ? new Date(values.fecha_entrega) : undefined}
          onChange={(date) => {
            if (date) {
              setFieldValue('fecha_entrega', ajustarFechaSinZona(date))
            }
          }}
          inputMode="start"
        />
        <HelperText type="error" visible={!!errors.fecha_entrega && touched.fecha_entrega}>
          {errors.fecha_entrega}
        </HelperText>
      </View>

      {/* Botón Guardar */}
      <Button
        mode="contained"
        onPress={() => handleSubmit()}
        loading={enProceso}
        disabled={enProceso}
        style={styles.submitButton}
        icon="content-save"
      >
        Guardar Pedido
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    marginBottom: 16,
    fontWeight: 'black',
    fontSize: 18,
  },
  section: {
    marginTop: 2,
  },
  label: {
    marginBottom: 8,
    fontWeight: '500',
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  submitButton: {
    marginTop: 2,
  },
});
