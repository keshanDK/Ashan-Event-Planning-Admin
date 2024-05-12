"use client";

import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { editArrangement } from "@/lib/api/arrangement";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import NumberInput from "@/app/manage/components/form/number-input";
import TextInput from "@/app/manage/components/form/text-input";
import ImagesInput from "@/app/manage/components/form/images-input";
import { GetArrangementFormDTO } from "@/server/application/common/dtos/arrangement";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

const EditArrangementFormSchema = z
  .object({
    name: z.string().min(2).max(100),
    chairspertable: z.number().int().nonnegative(),
  })

type EditArrangementFormProps = { arrangement: z.infer<typeof GetArrangementFormDTO> };

function EditArrangementForm({ arrangement }: EditArrangementFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const EditArrangementForm = useForm<z.infer<typeof EditArrangementFormSchema>>({
    resolver: zodResolver(EditArrangementFormSchema),
    defaultValues: { ...arrangement },
  });

  const { mutate: editArrangementMutate, isLoading: isEditArrangementLoading } =
    useMutation({
      mutationFn: editArrangement,
      onSuccess: () => {
        queryClient.invalidateQueries(["ARRANGEMENT", arrangement._id]);
        queryClient.invalidateQueries(["ARRANGEMENT"]);
        toast({ title: "Success", variant: "default" });
      },
      onError: () => {
        toast({
          title: "Error",
          variant: "destructive",
          description: "Error while editing arrangement",
        });
      },
    });

  const onSubmit = async (values: z.infer<typeof EditArrangementFormSchema>) => {
    editArrangementMutate({
      _id: arrangement._id,
      arrangement: {
        ...values,
        _id: arrangement._id,
      },
    });
  };

  return (
    <div>
      <Form {...EditArrangementForm}>
        <form
          onSubmit={EditArrangementForm.handleSubmit(onSubmit)}
          className="w-1/2"
        >
          <h4>Basic Information</h4>
          <div className="flex flex-col gap-y-4">
            <TextInput name="name" placeholder="Square Arrangement" label="Name" />
            <NumberInput name="chairspertable" label="Chairs per table" />
          </div>
          <div className="my-4">
            <Button type="submit">
              {isEditArrangementLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </Form>
      <DevTool control={EditArrangementForm.control} />
    </div>
  );
}

export default EditArrangementForm;
