import {NextRequest} from "next/server";
import {EditTableDTO} from "@/server/application/common/dtos/table";
import ValidationError from "@/server/application/common/errors/validation-error";
import editTableCommandHandler from "@/server/application/features/table/commands/edit-table-command-handler";

export async function PUT(
    request: NextRequest,
    {params: {_id}}: { params: { _id: string } }
) {
    const body = await request.json();
    const requestBody = EditTableDTO.safeParse(body);
    if (!requestBody.success) {
        throw new ValidationError(requestBody.error.message);
    }

    await editTableCommandHandler({...requestBody.data});

    return new Response(null, {
        status: 201,
        headers: {
            "Content-Type": "application/json",
        },
    });
}