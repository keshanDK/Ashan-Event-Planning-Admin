import { EditArrangementDTO } from "@/server/application/common/dtos/arrangement";
import { log } from "@/server/application/common/services/logging";
import { dynamicClient } from "@/server/infrastructure/clients/sanity";
import { z } from "zod";

type EditArrangementCommand = z.infer<typeof EditArrangementDTO>;

export default async function editArrangementCommandHandler(
    command: EditArrangementCommand
) {
    const { _id, name, chairspertable } = command;
    const arrangement = {
        _id,
        _type: "arrangement",
        name,
        chairspertable
    };
    const publishedCloth = await dynamicClient.createOrReplace(arrangement);
}
