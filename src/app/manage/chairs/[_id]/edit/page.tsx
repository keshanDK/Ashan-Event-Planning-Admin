"use client";

import EditChairForm from "@/app/manage/chairs/[_id]/edit/components/edit-chair-form/edit-chair-form";
import {useQuery} from "@tanstack/react-query";
import {getChairById} from "@/lib/api/cloth";

type EditChairPageProps = {
    params: { _id: string }
};

export default function EditChairPage({params: {_id}}: EditChairPageProps) {

    const {data: chair, isLoading} = useQuery({
        queryKey: ["CHAIR", _id],
        queryFn: () => getChairById(_id),
    });

    return (
        <div>
            <h2 className="p-2">Edit Chair</h2>
            <div className="p-4">
                {isLoading ? (
                    "Loading..."
                ) : (
                    <EditChairForm chair={chair!}/>
                )}
            </div>
        </div>
    );
};