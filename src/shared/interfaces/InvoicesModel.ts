import { Client } from "./ClientModel";
import { OrderWithFullRelations } from "./OrderModel";

export interface Invoice {
    id: number,
    cliente_id: number,
    fecha_emision: string,
    total: number,
}

export interface InvoiceOrder {
    id: number,
    boleta_id: number,
    pedido_id: number,
}

export interface InvoiceOrderWithFullRelations extends InvoiceOrder {
    pedidos: OrderWithFullRelations,
}



export interface InvoiceWithFullRelations extends Invoice {
    clientes: Client
    boletas_pedidos: InvoiceOrderWithFullRelations[],
}