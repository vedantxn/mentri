"use client";

import { Button } from "@/components/ui/button";
import { PanelLeftCloseIcon, PanelLeftIcon, SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import DashboardCommand from "./dashboard-command";
import { useSidebarContext } from "@/lib/sidebar-context";

const DashboardNavbar = () => {
    const { isCollapsed, toggleSidebar } = useSidebarContext();
    const [commandOpen, setCommandOpen] = useState<boolean>(false);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                setCommandOpen((open) => !open);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    return (
        <>
            <DashboardCommand open={commandOpen} setOpen={setCommandOpen} />
            <nav className="flex px-4 gap-x-2 items-center py-3 border-b bg-background">
                <Button className="size-9" variant={"outline"} onClick={toggleSidebar}>
                    {isCollapsed ? (
                        <PanelLeftIcon className="size-4" />
                    ) : (
                        <PanelLeftCloseIcon className="size-4" />
                    )}
                </Button>
                <Button 
                  className="h-9 w-[240px] justify-start font-normal text-muted-foreground hover:text-muted-foreground"
                  variant="outline"
                  size="sm"
                  onClick={() => setCommandOpen((open) => !open)}
                >
                    <SearchIcon />
                    <span>Search</span>
                    <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                        <span className="text-xs">&#8984;</span>
                        <span>K</span>
                    </kbd>
                </Button>
            </nav>
        </>
    );
};

export default DashboardNavbar;