import { z } from "zod";

export const AddTableDTO = z
    .object({
        name: z.string().min(2).max(100),
        length: z.number().int().nonnegative(),
        width: z.number().int().nonnegative(),
        image: z.string().array().nonempty({ message: "Please upload at least 1 image" }),
    })
    .strict();

export const GetTableFormDTO = z
    .object({
        _id: z.string(),
        name: z.string().min(2).max(100),
        length: z.number().int().nonnegative(),
        width: z.number().int().nonnegative(),
        image: z.string().array().nonempty({ message: "Please upload at least 1 image" }),
    })

export const EditTableDTO = z
    .object({
        _id: z.string(),
        name: z.string().min(2).max(100),
        length: z.number().int().nonnegative(),
        width: z.number().int().nonnegative(),
        image: z.string().array().nonempty({ message: "Please upload at least 1 image" }),
    })
    .strict();
