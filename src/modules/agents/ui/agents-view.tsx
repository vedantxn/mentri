"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { useAgentsFilters } from "../hooks/use-agents-filters";
import { useRouter } from "next/navigation";

import { DataTable } from "./data-table";
import { columns } from "./columns";
import { EmptyState } from "@/components/empty-state";
import { DataPagination } from "./agents-data-pagination";
import { LoadingState } from "@/components/loading-state";


export const AgentsView = () => {

    const [ filters, setFilters ] = useAgentsFilters();

    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions({
        ...filters,
    }));

    const router = useRouter();

    return (
        <div className="p-4 flex-1 pb-4 px-4 gap-y-4">
            <DataTable 
                columns={columns} 
                data={data.items} 
                onRowClick={(row) => router.push(`/agents/${row.id}`)}
            />
            <DataPagination
                page={filters.page}
                totalPages={data.totalPages}
                onPageChange={(page) => setFilters({ page })}
            />
            {data.items.length === 0 && <EmptyState 
              title="No Agents" 
              description="No agents found" 
              />}
        </div>
    )
};

export const AgentsViewLoading = () => {
    return (
        <LoadingState
            title="Loading Agents"
            description="Please wait while we load the agents"
        />
    );
};

export const AgentsViewError = () => {
    return (
        <EmptyState
            title="Error Loading Agents"
            description="Please try again later"
        />
    );
};