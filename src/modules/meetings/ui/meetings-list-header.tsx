import { useState } from "react"

import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { NewMeetingDialog } from "./new-meeting-dialog"

export const MeetingsListHeader = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    
    return (
        <>
        <NewMeetingDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
        <div className="flex items-center gap-x-2">
            <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
                <h1 className="text-2xl font-bold flex items-center justify-between">Meetings</h1>
                <h5>Manage your meetings</h5>
                <Button onClick={() => setIsDialogOpen(true)}>
                    <PlusIcon />
                    New Meeting
                </Button>
            </div>
        </div>
        </>
    );
};