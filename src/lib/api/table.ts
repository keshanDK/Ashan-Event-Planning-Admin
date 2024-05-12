import { Table } from "@/server/application/common/dtos/schemas";
import {
  dynamicClient,
  staticClient,
} from "@/server/infrastructure/clients/sanity";
import groq from "groq";
import { z } from "zod";
import {
  AddTableDTO,
  EditTableDTO,
  GetTableFormDTO,
} from "@/server/application/common/dtos/table";
import api from "@/lib/api/base";

export const getTables = async () => {
  let query = `*[_type == "table" ] {_id,name,length,width,image}`;
  const data = Table.array().parse(await staticClient.fetch(query));
  console.log(data)
  return data;
};

export const getTableById = async (_id: string) => {
  let query = groq`*[_type == "table" && _id == "${_id}"] {_id,name,length,width,image}`;
  const data = GetTableFormDTO.parse((await dynamicClient.fetch(query))[0]);
  console.log(data);
  return data;
};

export const addTable = async (table: z.infer<typeof AddTableDTO>) => {
  const res = await api.post("/api/table", { json: table });
};
export const editTable = async ({
  _id,
  table,
}: {
  _id: string;
  table: z.infer<typeof EditTableDTO>;
}) => {
  const res = await api.put(`/api/table/${_id}`, { json: table });
};
