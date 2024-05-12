"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { addTable  } from "@/lib/api/table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import NumberInput from "../../../../components/form/number-input";
import TextInput from "@/app/manage/components/form/text-input";
import ImagesInput from "@/app/manage/components/form/images-input";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

const AddTableFormSchema = z
  .object({
    name: z.string().min(2).max(100),
    length: z.number().int().nonnegative(),
    width: z.number().int().nonnegative(),
    image: z.string().array().nonempty({ message: "Please upload at least 1 image" }),
  })

function AddTableForm() {
  const AddTableForm = useForm<z.infer<typeof AddTableFormSchema>>({
    resolver: zodResolver(AddTableFormSchema),
    defaultValues: {
      name: "",
      length: 0,
      width: 0,
      image:[]
    },
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();


  const { mutate: addTableMutate, isLoading: isAddTableLoading } =
    useMutation({
      mutationFn: addTable,
      onSuccess: () => {
        queryClient.invalidateQueries(["TABLE"]);
        toast({ title: "Success", variant: "default" });
      },
      onError: () => {
        toast({
          title: "Error",
          variant: "destructive",
          description: "Error while adding table",
        });
      },
    });

  const onSubmit = async (values: z.infer<typeof AddTableFormSchema>) => {
    addTableMutate(values);
  };

  return (
    <div>
      <Form {...AddTableForm}>
        <form
          onSubmit={AddTableForm.handleSubmit(onSubmit)}
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
              {isAddTableLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Create"
              )}
            </Button>
          </div>
        </form>
      </Form>
      {/* <DevTool control={AddTableForm.control} /> */}
    </div>
  );
}

export default AddTableForm;
