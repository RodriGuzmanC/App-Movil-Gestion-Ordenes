const queryKeys = {
    productos: (pagina: number = 1, limite: number = 10) => ['productos', pagina, limite],
    productoById: (id: number | string) => `productos-${id}`,

    categorias: (pagina: number = 1, limite: number = 10) => ['categorias', pagina, limite],
    categoriaById: (id: number | string) => `categorias-${id}`,

    ventas: 'ventas',
    ventaById: (id: number | string) => `ventas-${id}`,

    clientes: 'clientes',
    clienteById: (id: number | string) => `clientes-${id}`,

    pedidos: 'pedidos',
    pedidoById: (id: number | string) => `pedidos-${id}`,

    usuarios: 'usuarios',
    usuarioById: (id: number | string) => `usuarios-${id}`,

    metodosDeEntrega: 'metodosDeEntrega',
    metodoDeEntregaById: (id: number | string) => `metodosDeEntrega-${id}`,
}

export default queryKeys
