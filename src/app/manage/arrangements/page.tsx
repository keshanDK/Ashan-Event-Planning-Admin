"use client";

import {columns} from "./components/columns";
import {DataTable} from "./components/data-table";
import {getArrangements} from "@/lib/api/arrangement";
import {useQuery} from "@tanstack/react-query";

function TablesPage() {
    const {data: arrangement, isLoading} = useQuery({
        queryKey: ["TABLE"],
        queryFn: getArrangements,
    });

    // const enabledProducts = clothes?.filter((product: { enabled: boolean; }) => product.enabled == true).length

    return (
        <div>
            <h2 className="p-2">Arrangement</h2>
            <div className="p-4">
                {isLoading ? (
                    "Loading..."
                ) : (
                    <DataTable columns={columns} data={arrangement!} />
                )}
            </div>
        </div>
    );
}

export default TablesPage;
