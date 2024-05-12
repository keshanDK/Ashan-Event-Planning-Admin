import {AddTableDTO, EditTableDTO} from "@/server/application/common/dtos/table";
import ValidationError from "@/server/application/common/errors/validation-error";
import createTableCommandHandler from "@/server/application/features/table/commands/create-table-command";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const requestBody = AddTableDTO.safeParse(body);
  if (!requestBody.success) {
    throw new ValidationError(requestBody.error.message);
  }
  await createTableCommandHandler({ ...requestBody.data });

  return new Response(null, {
    status: 201,
    headers: {
      "Content-Type": "application/json",
    },
  });
}