const queryKeys = {
    productos: (pagina: number = 1, limite: number = 10) => ['productos', pagina, limite],
    productoById: (id: number | string) => `productos-${id}`,

    categorias: (pagina: number = 1, limite: number = 10) => ['categorias', pagina, limite],
    categoriaById: (id: number | string) => `categorias-${id}`,

    clientes: (pagina: number = 1, limite: number = 10) => ['clientes', pagina, limite],
    clienteById: (id: number | string) => `clientes-${id}`,

    ordenesEntrada: (pagina: number = 1, limite: number = 10) => ['ordenesEntrada', pagina, limite],
    ordenesSalida: (pagina: number = 1, limite: number = 10) => ['ordenesSalida', pagina, limite],
    ordenById: (id: number | string) => `ordenSalida-${id}`,

    detallesOrden: (orderId: number, pagina: number = 1, limite: number = 10) => ['detallesOrden', orderId, pagina, limite],
    detalleOrdenById: (orderId: number, id: number | string) => `detalleOrden-${id}-${orderId}`,

    tiposAtributosConValores: (pagina: number = 1, limite: number = 10) => ['tipoAtributosConValores', pagina, limite],
    tipoAtributoById: (id: string | number) => `tipoAtributo-${id}`,
    atributoById: (id: string | number) => `atributo-${id}`,

    variaciones: (productoId: number | string, pagina: number = 1, limite: number = 10) => ['variaciones', productoId, pagina, limite],
    variacionById: (productId: number | string, variacionId: number | string) => `variacion-${productId}-${variacionId}`,

    atributosVariacion: (productoId: number | string, variacionId: number | string, pagina: number = 1, limite: number = 10) => ['variaciones', productoId, variacionId, pagina, limite],
    atributosVariacionById: (productId: number | string, variacionId: number | string, variaAtributoId: number | string) => `variacion-${productId}-${variacionId}-${variaAtributoId}`,

    estadosPedidos: (pagina: number = 1, limite: number = 10) => ['estadosPedidos', pagina, limite],
    estadoPedidoById: (id: number | string) => `estadoPedido-${id}`,

    metodosEntrega: (pagina: number = 1, limite: number = 10) => ['metodosEntrega', pagina, limite],
    metodoEntregaById: (id: number | string) => `metodoEntrega-${id}`,
}

export default queryKeys
