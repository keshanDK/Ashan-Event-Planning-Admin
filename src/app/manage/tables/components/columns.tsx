"use client";

import {Table} from "@/server/application/common/dtos/schemas";
import {ColumnDef} from "@tanstack/react-table";
import * as z from "zod";

import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {ArrowUpDown, MoreHorizontal} from "lucide-react";
import EditAction from "@/app/manage/components/table/edit-action";

export const columns: ColumnDef<z.infer<typeof Table>>[] = [
    {
        accessorKey: "name",
        header: "Name"
    },
    {
        accessorKey: "length",
        header: "Enabled"
    },
    {
        accessorKey: "width",
        header: "Category"
    },
    {
        id: "actions",
        header: "Manage",
        cell: ({row}) => {
            const table = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem><EditAction href={`/manage/tables/${table._id}/edit`}
                                                      text={"Edit"}/></DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
