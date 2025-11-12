import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import { MAX_FREE_AGENTS, MAX_FREE_MEETINGS } from "@/modules/pricing/constants";
import { RocketIcon } from "lucide-react";

export const DashboardTrial = () => {
    const trpc = useTRPC();
    const { data } = useQuery(trpc.premium.getFreeUsage.queryOptions());

    if (!data) return null;

    return (
        <div>
            <div>
                <div>
                    <RocketIcon />
                    <p>Free Trial</p>
                </div>
                <div>
                    <p>
                        {data.agentCount}/{MAX_FREE_AGENTS} Agents
                    </p>
                    {/* add progress bar here for agents */}
                </div>
                <div>
                    <p>
                        {data.meetingCount}/{MAX_FREE_MEETINGS} Meetings
                    </p>
                    {/* add progress bar here for meetings */}
                </div>
                <Button asChild>
                    <Link href="/upgrade">Upgrade</Link>
                </Button>
            </div>
        </div>
    )
}