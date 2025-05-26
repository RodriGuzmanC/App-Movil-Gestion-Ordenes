import { Category } from "./CategoryModel";

export interface CategoryProduct {
  id: number;
  producto_id: number;
  categoria_id: number;
}

export interface CategoryProductWithRelations extends CategoryProduct {
  categorias: Category[]
}