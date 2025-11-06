import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { BanIcon, VideoIcon } from "lucide-react";
import Link from "next/link";

interface Props {
    meetingId: string;
    onCancelMeeting: () => void;
    isCacelling: boolean;
}

export const UpcomingState = ({ meetingId, onCancelMeeting, isCacelling }: Props) => {
    return (
        <div>
            <EmptyState
                title="No Upcoming Meetings"
                description="You have no upcoming meetings"
            />
            <div className="flex justify-center">
                <Button variant="destructive" onClick={onCancelMeeting} disabled={isCacelling}>
                    <BanIcon className="mr-2" />
                    Cancel Meeting
                </Button>
                <Button asChild disabled={isCacelling}>
                    <Link href={`/call/${meetingId}`}>
                        <VideoIcon className="mr-2" />
                        Start Meeting
                    </Link>
                </Button>
            </div>
        </div>
    );
};