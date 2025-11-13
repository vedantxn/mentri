import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { VideoIcon } from "lucide-react";
import Link from "next/link";

interface Props {
    meetingId: string;
}

export const UpcomingState = ({ meetingId }: Props) => {
    return (
        <div>
            <EmptyState
                title="No Upcoming Meetings"
                description="You have no upcoming meetings"
            />
            <div className="flex justify-center">
                <Button asChild>
                    <Link href={`/call/${meetingId}`}>
                        <VideoIcon className="mr-2" />
                        Start Meeting
                    </Link>
                </Button>
            </div>
        </div>
    );
};