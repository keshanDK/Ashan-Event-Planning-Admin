"use client";

import { GetOrderDTO } from "@/server/application/common/dtos/order";
import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";

export const columns: ColumnDef<z.infer<typeof GetOrderDTO>>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "chair",
    header: "Chair",
  },
  {
    accessorKey: "table",
    header: "Table",
  },
  {
    accessorKey: "arrangement",
    header: "Arrangement",
  },
  {
    accessorKey: "length",
    header: "Length",
  },
  {
    accessorKey: "width",
    header: "Width",
  },
  {
    accessorKey: "location",
    header: "Status",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "time",
    header: "Time",
  },
  // {
  //   id: "actions",
  //   header: "Manage",
  //   cell: ({ row }) => {
  //     const { id } = row.original;
  //     return (
  //       <ActionDropdown>
  //         <DropdownMenuItem>
  //           <Link className="block w-full" href={`/manage/orders/${id}`}>View</Link>
  //         </DropdownMenuItem>
  //         {/* <DropdownMenuItem className="text-red-500">
  //           <DeleteAction
  //             _id={id}
  //             queryKey="ORDER"
  //             mutationFn={deleteOrder}
  //             message="This category is referenced by other documents"
  //           />
  //         </DropdownMenuItem> */}
  //       </ActionDropdown>
  //     );
  //   },
  // },
];
