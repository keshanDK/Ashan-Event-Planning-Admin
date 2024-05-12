import {AddArrangementDTO, EditArrangementDTO} from "@/server/application/common/dtos/arrangement";
import ValidationError from "@/server/application/common/errors/validation-error";
import createArrangementCommandHandler from "@/server/application/features/arrangement/commands/create-arrangement-command";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const requestBody = AddArrangementDTO.safeParse(body);
  if (!requestBody.success) {
    throw new ValidationError(requestBody.error.message);
  }
  await createArrangementCommandHandler({ ...requestBody.data });

  return new Response(null, {
    status: 201,
    headers: {
      "Content-Type": "application/json",
    },
  });
}