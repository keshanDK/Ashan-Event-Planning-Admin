"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { addArrangement  } from "@/lib/api/arrangement";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import NumberInput from "../../../../components/form/number-input";
import TextInput from "@/app/manage/components/form/text-input";
import ImagesInput from "@/app/manage/components/form/images-input";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

const AddArrangementFormSchema = z
  .object({
    name: z.string().min(2).max(100),
    chairspertable: z.number().int().nonnegative(),
  })

function AddArrangementForm() {
  const AddArrangementForm = useForm<z.infer<typeof AddArrangementFormSchema>>({
    resolver: zodResolver(AddArrangementFormSchema),
    defaultValues: {
      name: "",
      chairspertable: 0,
    },
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();


  const { mutate: addArrangementMutate, isLoading: isAddArrangementLoading } =
    useMutation({
      mutationFn: addArrangement,
      onSuccess: () => {
        queryClient.invalidateQueries(["ARRANGEMENT"]);
        toast({ title: "Success", variant: "default" });
      },
      onError: () => {
        toast({
          title: "Error",
          variant: "destructive",
          description: "Error while adding arrangement",
        });
      },
    });

  const onSubmit = async (values: z.infer<typeof AddArrangementFormSchema>) => {
    addArrangementMutate(values);
  };

  return (
    <div>
      <Form {...AddArrangementForm}>
        <form
          onSubmit={AddArrangementForm.handleSubmit(onSubmit)}
          className="w-1/2"
        >
          <h4>Basic Information</h4>
          <div className="flex flex-col gap-y-4">
            <TextInput name="name" placeholder="Square Arrangement" label="Name" />
            <NumberInput name="chairspertable" label="Chairs per table" />
          </div>

          <div className="my-4">
            <Button type="submit">
              {isAddArrangementLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Create"
              )}
            </Button>
          </div>
        </form>
      </Form>
      {/* <DevTool control={AddArrangementForm.control} /> */}
    </div>
  );
}

export default AddArrangementForm;
