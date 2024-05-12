import { getOrders } from "@/server/infrastructure/repositories/order/order-repository";
import { z } from "zod";



export default async function getOrdersQueryHandler() {
    const orders = await getOrders();
    return orders;
}
