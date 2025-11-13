"use client";

import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useQueryClient, useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useConfirm } from "@/hooks/use-confirm";
import { useState } from "react";

import { MeetingIdViewHeader } from "./meeting-id-view-header";
import { UpdateMeetingDialog } from "./update-meeting-dialog";
import { UpcomingState } from "./states/upcoming-state";
import { ActiveState } from "./states/active-state";
import { CancelState } from "./states/cancel-state";
import { ProcessingState } from "./states/processing-state";
import { CompletedState } from "./states/completed-state";

interface Props {
    meetingId: string;
};

export const MeetingIdView = ({ meetingId }: Props) => {
    const trpc = useTRPC();
    const queryClient = useQueryClient();
    const router = useRouter();

    const [updateMeetingDialogOpen, setUpdateMeetingDialogOpen] = useState(false);

    const [RemoveConfirmationModalOpen, setRemoveConfirmModalOpen] = useConfirm(
        "Are you sure?",
        "The following action will remove this meeting"
    )

    const { data } = useSuspenseQuery(
        trpc.meetings.getOne.queryOptions({ id: meetingId }),
    );

    const removeMeeting = useMutation(
        trpc.meetings.remove.mutationOptions({
            onSuccess: async () => {
                await queryClient.invalidateQueries(
                    trpc.meetings.getMany.queryOptions({})
                );
                await queryClient.invalidateQueries(
                    trpc.premium.getFreeUsage.queryOptions()
                );
                router.push('/meetings');
            },
            onError: (error) => {
                router.push('/meetings');
            },
        }),
    );

    const handleRemoveMeeting = async () => {
        const ok = await RemoveConfirmationModalOpen();
        if (!ok) return;
        removeMeeting.mutate({ id: meetingId });
    };

    const isActive = data.status === 'active';
    const isUpcoming = data.status === 'upcoming';
    const isCancelled = data.status === 'cancelled';
    const isCompleted = data.status === 'completed';
    const isProcessing = data.status === 'processing';

    return (
        <>
            <RemoveConfirmationModalOpen />

            <UpdateMeetingDialog
                open={updateMeetingDialogOpen}
                onOpenChange={setUpdateMeetingDialogOpen}
                initialValues={data}
            />

            <div className="flex-1 py-4 px-4 md:px-4 flex flex-col">
                <MeetingIdViewHeader
                    meetingId={meetingId}
                    meetingName={data.name}
                    onRemove={handleRemoveMeeting}
                    onEdit={() => setUpdateMeetingDialogOpen(true)}
                />
                {isCancelled && <CancelState />}
                {isCompleted && <CompletedState data={data} />}
                {isProcessing && <ProcessingState />}
                {isUpcoming && <UpcomingState 
                    meetingId={meetingId} 
                />}
                {isActive && <ActiveState 
                    meetingId={meetingId} 
                />}
                {/* {JSON.stringify(data, null, 2)} */}
            </div>
        </>
    );
};

export const MeetingIdViewLoading = () => {
    return (
        <LoadingState 
            title="Loading Meeting"
            description="Please wait while we load the meeting"
        />
    );
};

export const MeetingIdViewError = () => {
    return (
        <LoadingState 
            title="Loading Meeting"
            description="Please wait while we load the meeting"
        />
    );
};
