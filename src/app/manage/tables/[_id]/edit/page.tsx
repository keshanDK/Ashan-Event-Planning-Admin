"use client";

import EditTableForm from "@/app/manage/tables/[_id]/edit/components/edit-table-form/edit-table-form";
import {useQuery} from "@tanstack/react-query";
import {getTableById} from "@/lib/api/table";

type EditTablePageProps = {
    params: { _id: string }
};

export default function EditTablePage({params: {_id}}: EditTablePageProps) {

    const {data: table, isLoading} = useQuery({
        queryKey: ["CHAIR", _id],
        queryFn: () => getTableById(_id),
    });

    return (
        <div>
            <h2 className="p-2">Edit Table</h2>
            <div className="p-4">
                {isLoading ? (
                    "Loading..."
                ) : (
                    <EditTableForm table={table!}/>
                )}
            </div>
        </div>
    );
};