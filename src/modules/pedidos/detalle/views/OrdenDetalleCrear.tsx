import { useProductos } from '@/src/modules/productos/hooks/useProductos'
import { ErrorItemsComponent, LoadingComponent, NoItemsComponent } from '@/src/shared/components/StatusComponents'
import { Order } from '@/src/shared/interfaces/OrderModel'
import { VariationWithRelations } from '@/src/shared/interfaces/VariationModel'
import { Stack } from 'expo-router'
import React, { useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Button, HelperText, Icon, Modal, Portal, Text, useTheme } from 'react-native-paper'
import { Dropdown } from 'react-native-paper-dropdown'
import { useOrdenById } from '../../hooks/useOrdenes'
import ListaVariacionesFiltro from '../components/ListaVariacionesFiltro'
import ResumenOrden from '../components/ResumenOrden'
import { Cantidades, Precios } from '../schemas/OrdenDetalleSchema'

interface Props {
  orderId: number,
  tipoOrden: Order['categoria_pedido']
}

const OrderDetailCreateScreen: React.FC<Props> = ({ orderId, tipoOrden }) => {

  // Estados para la paginación y límite de productos
  const [pagina, setPagina] = useState(1)
  const [limite, setLimite] = useState(10)
  const { productos, cargando, error } = useProductos(pagina, limite)
  const { ordenById, error: errorOrden } = useOrdenById(orderId)

  // Estados para manejar la selección de producto y visibilidad de variaciones
  const [productoIdSeleccionado, setProductoIdSeleccionado] = useState<number | null>(null)
  const [visible, setVisible] = useState(false)

  const handleProductoChange = (productoId: string | undefined) => {
    if (productoId === undefined) {
      return null
    }
    setVisible(true)
    setProductoIdSeleccionado(parseInt(productoId) ?? null)
  }

  // Estado para manejar las cantidades y precios de las variaciones seleccionadas
  const [variacionesSeleccionadas, setVariacionesSeleccionadas] = useState<VariationWithRelations[]>([])


  const [cantidades, setCantidades] = useState<Cantidades[]>([])
  const [precios, setPrecios] = useState<Precios[]>([])
  const [submits, setSubmits] = useState<Record<number, () => void>>({})

  const theme = useTheme()


  const registrarSubmit = (variacionId: number, submitFunction: () => void) => {
    setSubmits(prev => ({
      ...prev,
      [variacionId]: submitFunction
    }))
  }

  const eliminarSubmit = (variacionId: number) => {
    setSubmits(prev => {
      const copia = { ...prev }
      delete copia[variacionId]
      return copia
    })
  }

  const registrarVariacionSeleccionada = (nuevaVariacionElegida: VariationWithRelations) => {
    setVariacionesSeleccionadas((prev: VariationWithRelations[]) => {
      // Verifica si la variación ya está seleccionada
      const existe = prev.some(v => v.id === nuevaVariacionElegida.id);
      if (!existe) {
        // Si no está, la agrega
        return [...prev, nuevaVariacionElegida];
      } else {
        // Si no está, no hace nada
        return [...prev];
      }
    });
  }

  const eliminarVariacionSeleccionada = (variacionId: number) => {
    setVariacionesSeleccionadas((prev: VariationWithRelations[]) => {
      // Verifica si la variación ya está seleccionada
      const existe = prev.some(v => v.id === variacionId);
      if (existe) {
        // Si ya está, la elimina
        return prev.filter(v => v.id !== variacionId);
      } else {
        // Si no está, no hace nada
        return [...prev];
      }
    });
  }

  const registrarPrecio = (variacionId: number, precio: number) => {
    setPrecios(prev => ([
      ...prev,
      {
        variacionId: variacionId,
        precio: precio
      }
    ]))
  }

  const modificarPrecio = (variacionId: number, nuevoPrecio: number) => {
    setPrecios((prev) =>
      prev.map(item =>
        item.variacionId === variacionId
          ? { ...item, precio: nuevoPrecio }
          : item
      )
    );
  }

  const eliminarPrecio = (variacionId: number) => {
    setPrecios(prev => {
      return prev.filter(v => v.variacionId !== variacionId);
    })
  }


  const registrarCantidad = (variacionId: number, cantidad: number) => {
    setCantidades(prev => ([
      ...prev,
      {
        variacionId: variacionId,
        cantidad: cantidad
      }
    ]))
  }

  const modificarCantidad = (variacionId: number, nuevaCantidad: number) => {
    setCantidades((prev) =>
      prev.map(item =>
        item.variacionId === variacionId
          ? { ...item, cantidad: nuevaCantidad }
          : item
      )
    );
  }

  const eliminarCantidad = (variacionId: number) => {
    setCantidades(prev => {
      return prev.filter(v => v.variacionId !== variacionId);

    })
  }

  const handlerAgregarDePedido = (variacion: VariationWithRelations) => {

    registrarVariacionSeleccionada(variacion)
    const precioDefecto = ordenById?.data.tipo_pedido === 'mayorista' ? variacion.precio_mayorista : variacion.precio_unitario
    registrarPrecio(variacion.id, precioDefecto)
    registrarCantidad(variacion.id, 1)
  }

  const handlerQuitarDePedido = (variacionId: number) => {

    eliminarVariacionSeleccionada(variacionId)
    eliminarPrecio(variacionId)
    eliminarCantidad(variacionId)
    eliminarSubmit(variacionId)
  }



  const [modalVisible, setModalVisible] = useState(false);


  const totalCantidad = cantidades.reduce((total, item) => total + item.cantidad, 0)

  const totalSoles = precios.reduce((total, itemPrecios) => {
    const cantidadInd = cantidades.find(itemCantidad => itemCantidad.variacionId === itemPrecios.variacionId)

    const subtotal = (cantidadInd?.cantidad ?? 0) * itemPrecios.precio;

    return +(total + subtotal).toFixed(2);  // Redondea después de cada suma
  }, 0)

  const handleCrearPedido = () => {
    Object.values(submits).forEach(submit => submit())
  }



  // Manejo de erros y estados de carga
  if (cargando && pagina === 1) return <LoadingComponent message="Cargando categorías..." />
  if ((productos == undefined || !productos.data) && pagina === 1) return <NoItemsComponent message="No hay categorías disponibles." />
  if (error) return <ErrorItemsComponent message="Error al cargar las categorías." />
  if (!productos) return <NoItemsComponent message="No hay categorías disponibles." />

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <Stack.Screen
        options={{
          title: `${tipoOrden == 'salida' ? 'Venta' : 'Pedido'} N° ${orderId}`,
          headerTitleAlign: 'center',
        }}
      ></Stack.Screen>


      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <Dropdown
            label="Productos"
            mode="outlined"
            options={
              productos?.data.map(product => ({
                label: product.nombre_producto,
                value: product.id.toString(),
              })) || []
            }
            onSelect={handleProductoChange}
          />

          {!productoIdSeleccionado && (
            <HelperText type="error" visible={true}>
              Selecciona un producto para continuar
            </HelperText>
          )}

          <ScrollView>
            {productoIdSeleccionado && (
              <ListaVariacionesFiltro
                productoId={productoIdSeleccionado}
                handlerAgregarDePedido={handlerAgregarDePedido}
                productos={productos.data}
              />
            )}
          </ScrollView>

          <Button mode='contained' onPress={() => setModalVisible(false)}>
            Cerrar
          </Button>
        </Modal>
      </Portal>
      <View style={{ padding: 16, flex: 1 }}>
        <>
          <View >
            <Button mode="contained" onPress={() => setModalVisible(true)}>
              Empezar a agregar un Producto
            </Button>
          </View>


          <ResumenOrden
            variacionesSeleccionadas={variacionesSeleccionadas}
            orderId={orderId}
            tipoOrden={ordenById?.data.tipo_pedido ?? 'mayorista'} // cambiar
            cantidades={cantidades}
            precios={precios}
            registrarSubmit={registrarSubmit}
            handlerQuitarDePedido={handlerQuitarDePedido}
            modificarCantidad={modificarCantidad}
            modificarPrecio={modificarPrecio}
            submits={submits}
            productos={productos.data}
          ></ResumenOrden>

          <View style={[styles.footerContainer, { backgroundColor: theme.colors.background }]}>
            <View style={styles.footerContent}>
              <Icon source="cube-outline" size={20} />
              <Text style={styles.footerText}>Total: {totalCantidad} unidades</Text>
            </View>

            <View style={styles.footerContent}>
              <Icon source="cash-multiple" size={20} />
              <Text style={styles.footerText}>Monto: S/ {totalSoles}</Text>
            </View>

            <Button
              icon="check-circle"
              mode='contained'
              style={styles.createButton}
              disabled={Object.keys(submits).length === 0}
              onPress={handleCrearPedido}
            >
              Crear {tipoOrden == 'salida' ? 'Venta' : 'Pedido'}
            </Button>
          </View>

        </>
      </View>
    </View>
  )
}

export default OrderDetailCreateScreen

const styles = StyleSheet.create({

  title: {
    marginBottom: 16,
    textAlign: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
    gap: 10,
    maxHeight: '100%'
  },
  cerrarBtn: {
    marginTop: 20,
  },

  footerContainer: {
    paddingTop: 16,
    gap: 4
  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
  },
  createButton: {
    borderRadius: 6,
  },
})
