import { z } from "zod";
import prisma from "../../clients/prisma";

// type GetOrdersParams = z.infer<typeof OrderFilters>;

export const getOrders = async () => {
  const orders = await prisma.order.findMany();
  console.log(orders)
  return orders
};

