import { Paginacion } from "./PaginatedType";

export interface PaginatedResponse<T> {
    data: T[];
    paginacion: Paginacion
    error?: string | null;  // De nuevo, para manejar posibles errores
};

export interface DataResponse<T> {
    data: T;  // Puede ser un solo objeto o un array de objetos
    error?: string | null;  // De nuevo, para manejar posibles errores
};