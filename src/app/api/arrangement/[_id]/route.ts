import {NextRequest} from "next/server";
import {EditArrangementDTO} from "@/server/application/common/dtos/arrangement";
import ValidationError from "@/server/application/common/errors/validation-error";
import editArrangementCommandHandler from "@/server/application/features/arrangement/commands/edit-arrangement-command-handler";

export async function PUT(
    request: NextRequest,
    {params: {_id}}: { params: { _id: string } }
) {
    const body = await request.json();
    const requestBody = EditArrangementDTO.safeParse(body);
    if (!requestBody.success) {
        throw new ValidationError(requestBody.error.message);
    }

    await editArrangementCommandHandler({...requestBody.data});

    return new Response(null, {
        status: 201,
        headers: {
            "Content-Type": "application/json",
        },
    });
}