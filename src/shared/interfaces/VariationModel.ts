import { Product } from "./ProductModel";
import { VariationAttributeWithRelations } from "./VariationAttributeModel";

export interface Variation {
  id: number;
  producto_id: number;
  precio_unitario: number;
  precio_mayorista: number;
  stock: number;
}

export interface VariationWithFullRelations extends Variation {
  productos: Product
  variaciones_atributos: VariationAttributeWithRelations[]
}

export interface VariationWithRelations extends Variation {
  variaciones_atributos: VariationAttributeWithRelations[]
}