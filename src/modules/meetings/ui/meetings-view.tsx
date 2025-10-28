"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

import { EmptyState } from "@/components/empty-state";
import { LoadingState } from "@/components/loading-state";
import { DataTable } from "@/components/data-table-global";

export const MeetingsView = () => {

    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}))

    return (
        <div>
            <DataTable
                columns={columns}
                data={data.items}
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