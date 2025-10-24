import { useAgentsFilters } from "../hooks/use-agents-filters";

import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

export const AgentsSearchFilter = () => {

    const [filters, setFilters] = useAgentsFilters();

    return (
        <div className="flex items-center gap-x-2">
            <Input 
              placeholder="Search agents" 
              value={filters.search} 
              onChange={(e) => setFilters({ search: e.target.value })} 
            />
            <SearchIcon />
        </div>
    );
};