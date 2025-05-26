import { AttributeType } from "./AttributeTypeModel"

export interface Attribute{
    id: number,
    tipo_atributo_id: number,
    valor: string
}

export interface AttributeWithRelations extends Attribute {
    tipos_atributos: AttributeType
}