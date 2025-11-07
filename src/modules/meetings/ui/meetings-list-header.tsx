import { useState } from "react";
import { useMeetingsFilters } from "../hooks/use-meetings-filters";

import { Button } from "@/components/ui/button";
import { PlusIcon, XCircleIcon } from "lucide-react";
import { NewMeetingDialog } from "./new-meeting-dialog";
import { MeetingsSearchFilter } from "./meetings-search-filter";
import { StatusFilter } from "./status-filter";
import { AgentIdFilter } from "./agent-id-filter";
import { ScrollArea, Scrollbar } from "@radix-ui/react-scroll-area";

export const MeetingsListHeader = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [filters, setFilters] = useMeetingsFilters();

    const isAnyFilterModified = !!filters.status || !!filters.search || !!filters.agentId;
   
    const onClearFilters = () => {
        setFilters({
            status: null,
            search: "",
            agentId: "",
            page: 1,
        });
    };

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
            <ScrollArea>
                <div>
                    <MeetingsSearchFilter />
                    <StatusFilter />
                    <AgentIdFilter />
                    {isAnyFilterModified && (
                        <Button onClick={onClearFilters} variant="outline" size="icon">
                            <XCircleIcon />
                            Clear
                        </Button>
                    )}
                </div>
                <Scrollbar orientation="horizontal"/>
            </ScrollArea>            
        </div>
        </>
    );
};