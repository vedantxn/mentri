"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useMeetingsFilters } from "../hooks/use-meetings-filters";

import { EmptyState } from "@/components/empty-state";
import { LoadingState } from "@/components/loading-state";
import { DataTable } from "@/components/data-table-global";
import { columns } from "./columns";
import { DataPagination } from "./data-pagination";

export const MeetingsView = () => {
    const router = useRouter();
    const trpc = useTRPC();

    const [filters, setFilters] = useMeetingsFilters();
    const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({
        ...filters,
    }));

    return (
        <div className="flex-1 pb-4">
            <DataTable
                columns={columns}
                data={data.items}
                onRowClick={(row) => router.push(`/meetings/${row.id}`)}
            />
            <DataPagination
                page={filters.page}
                totalPages={data.totalPages}
                onPageChange={(page) => setFilters({ page })}
            />
        </div>
    );
};

export const MeetingsViewLoading = () => {
    return (
        <LoadingState
            title="Loading Meetings"
            description="Please wait while we load the meetings"
        />
    );
};

export const MeetingsViewError = () => {
    return (
        <EmptyState
            title="Error Loading Agents"
            description="Please try again later"
        />
    );
};