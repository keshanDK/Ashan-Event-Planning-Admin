import {AddChairDTO} from "@/server/application/common/dtos/cloth";
import {log} from "@/server/application/common/services/logging";
import {dynamicClient} from "@/server/infrastructure/clients/sanity";
import {z} from "zod";
import {createId} from "@paralleldrive/cuid2";

type AddChairCommand = z.infer<typeof AddChairDTO>;

export default async function createChairCommandHandler(
    command: AddChairCommand
) {
    const {name,length,width,image} = command;
    const chair = {
        _id:createId(),
        _type: "chair",
        name,
        length,
        width,
        image
    };
    const publishedCloth = await dynamicClient.create(chair);
}
