"use client";

import {columns} from "./components/columns";
import {DataTable} from "./components/data-table";
import {getChairs} from "@/lib/api/cloth";
import {useQuery} from "@tanstack/react-query";

function ChairsPage() {
    const {data: chairs, isLoading} = useQuery({
        queryKey: ["CHAIR"],
        queryFn: getChairs,
    });

    // const enabledProducts = clothes?.filter((product: { enabled: boolean; }) => product.enabled == true).length

    return (
        <div>
            <h2 className="p-2">Chairs</h2>
            <div className="p-4">
                {isLoading ? (
                    "Loading..."
                ) : (
                    <DataTable columns={columns} data={chairs!} />
                )}
            </div>
        </div>
    );
}

export default ChairsPage;
