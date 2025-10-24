"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

import { DataTable } from "./data-table";
import { columns } from "./columns";
import { EmptyState } from "@/components/empty-state";


export const AgentsView = () => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

    return (
        <div className="p-4 flex-1 pb-4 px-4 gap-y-4">
            <DataTable columns={columns} data={data} />
            {data.length === 0 && <EmptyState 
              title="No Agents" 
              description="No agents found" 
              />}
        </div>
    )
};