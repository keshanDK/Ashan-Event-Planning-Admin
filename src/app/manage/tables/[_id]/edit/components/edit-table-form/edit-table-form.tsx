"use client";

import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { editTable } from "@/lib/api/table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import NumberInput from "@/app/manage/components/form/number-input";
import TextInput from "@/app/manage/components/form/text-input";
import ImagesInput from "@/app/manage/components/form/images-input";
import { GetTableFormDTO } from "@/server/application/common/dtos/table";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

const EditTableFormSchema = z
  .object({
    name: z.string().min(2).max(100),
    length: z.number().int().nonnegative(),
    width: z.number().int().nonnegative(),
    image: z.string().array().nonempty({ message: "Please upload at least 1 image" }),
  })

type EditTableFormProps = { table: z.infer<typeof GetTableFormDTO> };

function EditTableForm({ table }: EditTableFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const EditTableForm = useForm<z.infer<typeof EditTableFormSchema>>({
    resolver: zodResolver(EditTableFormSchema),
    defaultValues: { ...table },
  });

  const { mutate: editTableMutate, isLoading: isEditTableLoading } =
    useMutation({
      mutationFn: editTable,
      onSuccess: () => {
        queryClient.invalidateQueries(["TABLE", table._id]);
        queryClient.invalidateQueries(["TABLE"]);
        toast({ title: "Success", variant: "default" });
      },
      onError: () => {
        toast({
          title: "Error",
          variant: "destructive",
          description: "Error while editing table",
        });
      },
    });

  const onSubmit = async (values: z.infer<typeof EditTableFormSchema>) => {
    editTableMutate({
      _id: table._id,
      table: {
        ...values,
        _id: table._id,
      },
    });
  };

  return (
    <div>
      <Form {...EditTableForm}>
        <form
          onSubmit={EditTableForm.handleSubmit(onSubmit)}
          className="w-1/2"
        >
          <h4>Basic Information</h4>
          <div className="flex flex-col gap-y-4">
            <TextInput name="name" placeholder="Square Table" label="Name" />
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
              {isEditTableLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </Form>
      <DevTool control={EditTableForm.control} />
    </div>
  );
}

export default EditTableForm;
