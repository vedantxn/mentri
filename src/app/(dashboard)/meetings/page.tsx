import {
    MeetingsView,
    MeetingsViewLoading,
    MeetingsViewError
} from "@/modules/meetings/ui/meetings-view";
import { MeetingsListHeader } from "@/modules/meetings/ui/meetings-list-header";

import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const Page = async () => {

    const session = await auth.api.getSession({
        headers: await headers()
    });
        
    if (!session?.user) {
        redirect("/login");
    }

    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(
        trpc.meetings.getMany.queryOptions({})
    );

    return (
        <>
        <MeetingsListHeader />
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<MeetingsViewLoading />}>
                <ErrorBoundary fallback={<MeetingsViewError />}>
                    <MeetingsView />
                </ErrorBoundary>
            </Suspense>
        </HydrationBoundary>
        </>
    )
}

export default Page
