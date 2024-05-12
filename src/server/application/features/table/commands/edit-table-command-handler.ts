import {EditTableDTO} from "@/server/application/common/dtos/table";
import {log} from "@/server/application/common/services/logging";
import {dynamicClient} from "@/server/infrastructure/clients/sanity";
import {z} from "zod";

type EditTableCommand = z.infer<typeof EditTableDTO>;

export default async function editTableCommandHandler(
    command: EditTableCommand
) {
    const {_id,name,length, width, image} = command;
    const table = {
        _id,
        _type: "table",
        name,
        length,
        width,
        image
    };
    const publishedCloth = await dynamicClient.createOrReplace(table);
}
