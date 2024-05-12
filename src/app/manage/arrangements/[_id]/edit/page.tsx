"use client";

import EditArrangementForm from "@/app/manage/arrangements/[_id]/edit/components/edit-arrangement-form/edit-arrangement-form";
import {useQuery} from "@tanstack/react-query";
import {getArrangementById} from "@/lib/api/arrangement";

type EditArrangementPageProps = {
    params: { _id: string }
};

export default function EditArrangementPage({params: {_id}}: EditArrangementPageProps) {

    const {data: arrangement, isLoading} = useQuery({
        queryKey: ["ARRANGEMENT", _id],
        queryFn: () => getArrangementById(_id),
    });

    return (
        <div>
            <h2 className="p-2">Edit Arrangement</h2>
            <div className="p-4">
                {isLoading ? (
                    "Loading..."
                ) : (
                    <EditArrangementForm arrangement={arrangement!}/>
                )}
            </div>
        </div>
    );
};