import { useProductos } from '@/src/modules/productos/hooks/useProductos'
import { ErrorItemsComponent, LoadingComponent, NoItemsComponent } from '@/src/shared/components/StatusComponents'
import { VariationWithRelations } from '@/src/shared/interfaces/VariationModel'
import React, { useState } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { HelperText, Text } from 'react-native-paper'
import { Dropdown } from 'react-native-paper-dropdown'
import { useOrdenById } from '../../hooks/useOrdenes'
import ListaVariacionesFiltro from '../components/ListaVariacionesFiltro'
import ResumenOrden from '../components/ResumenOrden'
import { Cantidades, Precios } from '../schemas/OrdenDetalleSchema'

interface Props {
  orderId: number
}

const OrderDetailCreateScreen: React.FC<Props> = ({ orderId }) => {

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




  // Manejo de erros y estados de carga
  if (cargando && pagina === 1) return <LoadingComponent message="Cargando categorías..." />
  if ((productos == undefined || !productos.data) && pagina === 1) return <NoItemsComponent message="No hay categorías disponibles." />
  if (error) return <ErrorItemsComponent message="Error al cargar las categorías." />
  if (!productos) return <NoItemsComponent message="No hay categorías disponibles." />

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        Crear Detalle de Pedido
      </Text>
      {/* Seleccionador de producto */}
      <Dropdown
        label="Productos"
        mode="outlined"
        options={productos?.data.map(product => ({
          label: product.nombre_producto,
          value: product.id.toString()
        })) || []}
        onSelect={(value) => {
          handleProductoChange(value)
        }}
      />

      {!productoIdSeleccionado && <HelperText type="error" visible={true}>Selecciona un producto para continuar</HelperText>}

      {visible && productoIdSeleccionado && (
        <ListaVariacionesFiltro
          productoId={productoIdSeleccionado}
          handlerAgregarDePedido={handlerAgregarDePedido}

        ></ListaVariacionesFiltro>
      )}

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
      ></ResumenOrden>
    </ScrollView>
  )
}

export default OrderDetailCreateScreen

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginBottom: 16,
    textAlign: 'center',
  },
})
