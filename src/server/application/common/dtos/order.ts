import { z } from "zod";

export const GetOrderDTO = z.object({
  id: z.number(),
  chair: z.string(),
  table: z.string(),
  arrangement: z.string(),
  length: z.number(),
  width: z.number(),
  location: z.string(),
  date: z.string(),
  time: z.string(),
  noOfArrangements: z.number(),
  userId: z.string(),
});
