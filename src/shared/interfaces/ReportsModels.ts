import { OrderWithFullRelations } from "./OrderModel";

export interface ReportLastOrdersByMonth extends OrderWithFullRelations {
    cantidad: number
}
