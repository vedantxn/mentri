"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

import { EmptyState } from "@/components/empty-state";
import { LoadingState } from "@/components/loading-state";
import { AgentIdViewHeader } from "./agents-id-view-header";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { Badge } from "@/components/ui/badge";
import { VideoIcon } from "lucide-react";

interface Props {
    agentId: string;
}

export const AgentIdView = ({ agentId }: Props) => {

    const trpc=useTRPC();
    const { data } = useSuspenseQuery(trpc.agents.getOne.queryOptions({ id: agentId }));

    return (
        <div className="flex-1py-4 px-4">
            <AgentIdViewHeader
                agentId={agentId}
                agentName={data.name}
                onEdit={() => {}}
                onRemove={() => {}}
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