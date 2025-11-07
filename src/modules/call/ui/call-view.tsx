import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

import { CallProvider } from "./call-provider";
import { ErrorState } from "@/components/error-state";

interface Props {
    meetingId: string;
};

export const CallView = ({ meetingId }: Props) => {

    const trpc = useTRPC();
    const { data } = useSuspenseQuery(
        trpc.meetings.getOne.queryOptions({ id: meetingId })
    );

    if (data.status === "completed") {
        return (
            <div>
                <ErrorState
                    title="Meeting Completed"
                    description="You can no longer join this meeting"
                />
            </div>
        );
    }

    return (
        <div>
            <CallProvider meetingId={meetingId} meetingName={data.name} />
        </div>
    );
};