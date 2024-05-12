import {AddChairDTO, EditChairDTO} from "@/server/application/common/dtos/cloth";
import ValidationError from "@/server/application/common/errors/validation-error";
import createChairCommandHandler from "@/server/application/features/chair/commands/create-chair-command";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const requestBody = AddChairDTO.safeParse(body);
  if (!requestBody.success) {
    throw new ValidationError(requestBody.error.message);
  }
  await createChairCommandHandler({ ...requestBody.data });

  return new Response(null, {
    status: 201,
    headers: {
      "Content-Type": "application/json",
    },
  });
}