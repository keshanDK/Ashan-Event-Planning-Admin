"use client";

import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { editChair } from "@/lib/api/cloth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import NumberInput from "@/app/manage/components/form/number-input";
import TextInput from "@/app/manage/components/form/text-input";
import ImagesInput from "@/app/manage/components/form/images-input";
import { GetChairFormDTO } from "@/server/application/common/dtos/cloth";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

const EditChairFormSchema = z
  .object({
    name: z.string().min(2).max(100),
    length: z.number().int().nonnegative(),
    width: z.number().int().nonnegative(),
    image: z.string().array().nonempty({ message: "Please upload at least 1 image" }),
  })

type EditChairFormProps = { chair: z.infer<typeof GetChairFormDTO> };

function EditChairForm({ chair }: EditChairFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const EditChairForm = useForm<z.infer<typeof EditChairFormSchema>>({
    resolver: zodResolver(EditChairFormSchema),
    defaultValues: { ...chair },
  });

  const { mutate: editChairMutate, isLoading: isEditChairLoading } =
    useMutation({
      mutationFn: editChair,
      onSuccess: () => {
        queryClient.invalidateQueries(["CHAIR", chair._id]);
        queryClient.invalidateQueries(["CHAIR"]);
        toast({ title: "Success", variant: "default" });
      },
      onError: () => {
        toast({
          title: "Error",
          variant: "destructive",
          description: "Error while editing product",
        });
      },
    });

  const onSubmit = async (values: z.infer<typeof EditChairFormSchema>) => {
    editChairMutate({
      _id: chair._id,
      chair: {
        ...values,
        _id: chair._id,
      },
    });
  };

  return (
    <div>
      <Form {...EditChairForm}>
        <form
          onSubmit={EditChairForm.handleSubmit(onSubmit)}
          className="w-1/2"
        >
          <h4>Basic Information</h4>
          <div className="flex flex-col gap-y-4">
            <TextInput name="name" placeholder="Square Chair" label="Name" />
            <NumberInput name="length" label="Length" />
            <NumberInput name="width" label="Width" />
            <ImagesInput
              constrain={1}
              name={`image`}
              label="Image"
            />
          </div>
          <div className="my-4">
            <Button type="submit">
              {isEditChairLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </Form>
      <DevTool control={EditChairForm.control} />
    </div>
  );
}

export default EditChairForm;
