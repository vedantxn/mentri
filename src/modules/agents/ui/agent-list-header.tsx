import { useState } from "react";
import { AgentsSearchFilter } from "./agents-search-filter";
import { useAgentsFilters } from "../hooks/use-agents-filters";
import { DEFAULT_PAGE } from "@/constants";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { NewAgentDialog } from "./new-agent-dialog";
import { ScrollArea, Scrollbar } from "@radix-ui/react-scroll-area";

export const AgentListHeader = () => {

    const [filters, setFilters] = useAgentsFilters();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const isAnyFilterModified = !!filters.search;

    const onClearFilters = () => {
        setFilters({ 
            search: "", 
            page: DEFAULT_PAGE 
        });
    }
    
    return (
        <>
        <NewAgentDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
        <div className="flex items-center gap-x-2">
            <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
                <h1 className="text-2xl font-bold flex items-center justify-between">Agents</h1>
                <h5>Manage your agents</h5>
                <Button onClick={() => setIsDialogOpen(true)}>
                    <PlusIcon />
                    New Agent
                </Button>
            </div>
            <ScrollArea>
                <div className="flex items-center gap-x-2">
                    <AgentsSearchFilter />
                    {isAnyFilterModified && (
                        <Button onClick={onClearFilters} variant="ghost">
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