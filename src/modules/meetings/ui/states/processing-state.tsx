import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { VideoIcon } from "lucide-react";
import Link from "next/link";


export const ProcessingState = () => {
    return (
        <div>
            <EmptyState
                title="Meeting Processing"
                description="Meeting is processing"
            />
        </div>
    );
};