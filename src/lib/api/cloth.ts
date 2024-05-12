import { Chair } from "@/server/application/common/dtos/schemas";
import {
  dynamicClient,
  staticClient,
} from "@/server/infrastructure/clients/sanity";
import groq from "groq";
import { z } from "zod";
import {
  AddChairDTO,
  EditChairDTO,
  GetChairFormDTO,
} from "@/server/application/common/dtos/cloth";
import api from "@/lib/api/base";

export const getChairs = async () => {
  let query = `*[_type == "chair" ] {_id,name,length,width,image}`;
  const data = Chair.array().parse(await staticClient.fetch(query));
  return data;
};

export const getChairById = async (_id: string) => {
  let query = groq`*[_type == "chair" && _id == "${_id}"] {_id,name,length,width,image}`;
  const data = GetChairFormDTO.parse((await dynamicClient.fetch(query))[0]);
  console.log(data);
  return data;
};

export const addChair = async (chair: z.infer<typeof AddChairDTO>) => {
  const res = await api.post("/api/chair", { json: chair });
};
export const editChair = async ({
  _id,
  chair,
}: {
  _id: string;
  chair: z.infer<typeof EditChairDTO>;
}) => {
  const res = await api.put(`/api/chair/${_id}`, { json: chair });
};
