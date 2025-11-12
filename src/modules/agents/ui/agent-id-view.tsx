"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useConfirm } from "@/hooks/use-confirm";
import { toast } from "sonner";

import { EmptyState } from "@/components/empty-state";
import { LoadingState } from "@/components/loading-state";
import { AgentIdViewHeader } from "./agents-id-view-header";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { Badge } from "@/components/ui/badge";
import { VideoIcon } from "lucide-react";
import { UpdateAgentDialog } from "./update-agent-dialog";

interface Props {
    agentId: string;
}

export const AgentIdView = ({ agentId }: Props) => {

    const router = useRouter();
    const trpc=useTRPC();
    const queryClient = useQueryClient();

    const [updateAgentDialogOpen, setUpdateAgentDialogOpen] = useState(false);

    const { data } = useSuspenseQuery(trpc.agents.getOne.queryOptions({ id: agentId }));

    const removeAgent = useMutation(
        trpc.agents.remove.mutationOptions({
            onSuccess: async () => {
                await queryClient.invalidateQueries(
                    trpc.agents.getMany.queryOptions({})
                );

                await queryClient.invalidateQueries(
                    trpc.premium.getFreeUsage.queryOptions()
                );
                router.push("/agents");
            },
            onError: (error) => {
                toast.error(error.message);
            },
        }),
    );

    const [RemoveConfirmation, confirmRemove] = useConfirm(
        "Remove Agent",
        `Are you sure you want to remove this agent? The following action will remove ${data.meetingCount} associated meetings`,
    );

    const handleRemoveAgent = async () => {
        const ok = await confirmRemove();
        if (!ok) {
            return;
        }
        removeAgent.mutate({ id: agentId });
    };

    return (
        <>
        <RemoveConfirmation />
        <UpdateAgentDialog
          open={updateAgentDialogOpen}
          onOpenChange={setUpdateAgentDialogOpen}
          initialValues={data}
        />
        <div className="flex-1py-4 px-4">
            <AgentIdViewHeader
                agentId={agentId}
                agentName={data.name}
                onEdit={() => setUpdateAgentDialogOpen(true)}
                onRemove={handleRemoveAgent}
            />
            <div>
                <div>
                    <div>
                        <GeneratedAvatar 
                          variant="botttsNeutral"
                          seed={data.name}
                        />
                        <h2>{data.name}</h2>
                    </div>
                    <Badge variant="outline">
                        <VideoIcon />
                        {data.meetingCount} {data.meetingCount === 1 ? "Meeting" : "Meetings"}
                    </Badge>
                    <div>
                        <p>Instructions</p>
                        <p>{data.instructions}</p>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export const AgentIdViewLoading = () => {
    return (
        <LoadingState
            title="Loading Agents"
            description="Please wait while we load the agents"
        />
    );
};

export const AgentIdViewError = () => {
    return (
        <EmptyState
            title="Error Loading Agents"
            description="Please try again later"
        />
    );
};