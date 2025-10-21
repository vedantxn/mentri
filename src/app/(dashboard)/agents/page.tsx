import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

import { AgentsView } from "@/modules/agents/ui/agents-view";
import { ErrorPage } from "./error";

const Page = async () => {
    
    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<ErrorPage />}>
                <AgentsView />
            </Suspense>
        </HydrationBoundary>

    );
};

export default  Page