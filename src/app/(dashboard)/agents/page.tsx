import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { AgentsView } from "@/modules/agents/ui/agents-view";
import { ErrorPage } from "./error";
import { AgentListHeader } from "@/modules/agents/ui/agent-list-header";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SearchParams } from "nuqs";
import { loadSearchParams } from "@/modules/agents/params";

interface Props {
    searchParams: Promise<SearchParams>;
}

const Page = async ({ searchParams }: Props) => {

    const filters = await loadSearchParams(searchParams);

    const session = await auth.api.getSession({
        headers: await headers()
      });
    
    if (!session?.user) {
        redirect("/login");
    }

    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions({
        ...filters,
    }));

    return (
        <>
        <AgentListHeader />
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ErrorBoundary fallback={<ErrorPage />}>
                <Suspense fallback={<ErrorPage />}>
                    <AgentsView />
                </Suspense>
            </ErrorBoundary>
        </HydrationBoundary>
        </>

    );
};

export default  Page