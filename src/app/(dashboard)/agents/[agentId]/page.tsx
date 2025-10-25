import { getQueryClient, trpc } from "@/trpc/server";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { Suspense } from "react";

import { ErrorBoundary } from "react-error-boundary";
import { 
    AgentIdView, 
    AgentIdViewError, 
    AgentIdViewLoading 
} from "@/modules/agents/ui/agent-id-view";

interface Props {
    params: Promise<{ agentId: string }>
}

const Page = async ({ params }: Props) => {
    const { agentId } = await params;

    const QueryClient = getQueryClient();
    void QueryClient.prefetchQuery(
        trpc.agents.getOne.queryOptions({ id: agentId }),
    );

    return (
        <HydrationBoundary state={dehydrate(QueryClient)}>
            <Suspense fallback={<AgentIdViewLoading />}>
                <ErrorBoundary fallback={<AgentIdViewError />}>
                    <AgentIdView agentId={agentId} />
                </ErrorBoundary>
            </Suspense>

        </HydrationBoundary>
    );
};

export default Page;