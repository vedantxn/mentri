import { EmptyState } from "@/components/empty-state";


export const CompletedState = () => {
    return (
        <div>
            <EmptyState
                title="Meeting Completed"
                description="Meeting has been completed"
            />
        </div>
    );
};