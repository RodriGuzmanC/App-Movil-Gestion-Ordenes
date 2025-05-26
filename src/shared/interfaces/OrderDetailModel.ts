import { VariationWithFullRelations } from "./VariationModel";

export interface OrderDetail {
  id: number;
  pedido_id: number;
  variacion_id: number;
  cantidad: number;
  precio: number;
  precio_rebajado?: number;
}

export interface OrderDetailWithFullRelations extends OrderDetail {
  variaciones: VariationWithFullRelations
}

