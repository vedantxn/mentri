"use client";

import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useQueryClient, useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useConfirm } from "@/hooks/use-confirm";
import { useState } from "react";

import { MeetingIdViewHeader } from "./meeting-id-view-header";
import { UpdateMeetingDialog } from "./update-meeting-dialog";

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
            onSuccess: () => {
                queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
                //TODO: Invalidate free tier usage
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
    }

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
                {JSON.stringify(data, null, 2)}
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
