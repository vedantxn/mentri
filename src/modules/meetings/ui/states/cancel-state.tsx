import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { VideoIcon } from "lucide-react";
import Link from "next/link";


export const CancelState = () => {
    return (
        <div>
            <EmptyState
                title="Meeting Cancelled"
                description="Meeting has been cancelled"
            />
            <div className="flex justify-center">
                <Button asChild>
                    <Link href={`/meetings`}>
                        <VideoIcon className="mr-2" />
                        Go Back
                    </Link>
                </Button>
            </div>
        </div>
    );
};