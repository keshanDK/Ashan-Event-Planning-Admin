import api from "./base";
import {
  GetOrderDTO,
} from "@/server/application/common/dtos/order";
import { z } from "zod";

export const getOrders = async () => {
  const res = await api.get(`/api/orders`);
  const orders = GetOrderDTO.array().parse(await res.json());
  return orders;
};


