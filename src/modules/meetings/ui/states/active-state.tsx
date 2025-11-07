import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { VideoIcon } from "lucide-react";
import Link from "next/link";

interface Props {
    meetingId: string;
}

export const ActiveState = ({ meetingId }: Props) => {
    return (
        <div>
            <EmptyState
                title="Meeting is Active"
                description="Meeting will end once all participants have left"
            />
            <div className="flex justify-center">
                <Button asChild>
                    <Link href={`/call/${meetingId}`}>
                        <VideoIcon className="mr-2" />
                        Join Meeting
                    </Link>
                </Button>
            </div>
        </div>
    );
};