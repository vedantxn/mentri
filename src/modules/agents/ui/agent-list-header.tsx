import { useState } from "react"

import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { NewAgentDialog } from "./new-agent-dialog"

export const AgentListHeader = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    
    return (
        <>
        <NewAgentDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
        <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
            <h1 className="text-2xl font-bold flex items-center justify-between">Agents</h1>
            <h5>Manage your agents</h5>
            <Button onClick={() => setIsDialogOpen(true)}>
                <PlusIcon />
                New Agent
            </Button>
        </div>
        </>
    )
}