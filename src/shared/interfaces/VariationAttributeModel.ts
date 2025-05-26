import { AttributeWithRelations } from "./AttributeModel";

export interface VariationAttribute {
  id: number;
  variacion_id: number;
  atributo_id: number;
}

export interface VariationAttributeWithRelations extends VariationAttribute {
  atributos: AttributeWithRelations
}