"use client";

import {columns} from "./components/columns";
import {DataTable} from "./components/data-table";
import {getTables} from "@/lib/api/table";
import {useQuery} from "@tanstack/react-query";

function TablesPage() {
    const {data: tables, isLoading} = useQuery({
        queryKey: ["TABLE"],
        queryFn: getTables,
    });

    // const enabledProducts = clothes?.filter((product: { enabled: boolean; }) => product.enabled == true).length

    return (
        <div>
            <h2 className="p-2">Tables</h2>
            <div className="p-4">
                {isLoading ? (
                    "Loading..."
                ) : (
                    <DataTable columns={columns} data={tables!} />
                )}
            </div>
        </div>
    );
}

export default TablesPage;
