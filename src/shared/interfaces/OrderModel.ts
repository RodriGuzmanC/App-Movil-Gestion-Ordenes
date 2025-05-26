import { Client } from "./ClientModel";
import { DeliveryMethod } from "./DeliveryMethodModel";
import { OrderDetail, OrderDetailWithFullRelations } from "./OrderDetailModel";
import { OrderStatus } from "./OrderStatusModel";
import { VariationWithRelations } from "./VariationModel";

export interface Order {
  id: number;
  codigo: string;
  fecha_pedido: string;
  fecha_entrega: string;
  usuario_id: number;
  estado_pedido_id: number;
  metodo_entrega_id: number;
  categoria_pedido: 'entrada' | 'salida';
  tipo_pedido: 'mayorista' | 'minorista';
  fecha_creacion?: string;
  cliente_id: number;
}


export interface OrderWithBasicRelations extends Order {
  estados_pedidos: OrderStatus
  metodos_entregas: DeliveryMethod
  clientes: Client
}

export interface OrderWithFullRelations extends Order {
  estados_pedidos: OrderStatus
  metodos_entregas: DeliveryMethod
  detalles_pedidos: OrderDetailWithFullRelations[]
  clientes: Client
}


export interface PrepareOrderDetail extends OrderDetail {
  id: number,
  nombre_producto: string,
  variacion: VariationWithRelations,
}


