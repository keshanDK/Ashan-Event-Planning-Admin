"use client";

import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { getOrders } from "@/lib/api/order";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import { getRange } from "@/app/manage/orders/components/utils/utils";

function OrdersPage() {

  const { data, isLoading } = useQuery({
    queryKey: ["ORDER"],
    queryFn: () => getOrders(),
  });
  return (
    <div>
      <h2 className="p-2">Orders</h2>
      <div className={"p-4 grid grid-cols-1 gap-y-4"}>
        <div className="overflow-x-scroll ">
          {isLoading ? (
            "Loading..."
          ) : (
            <DataTable columns={columns} data={data!} />

          )}
        </div>
      </div>
    </div>
  );
}

export default OrdersPage;
