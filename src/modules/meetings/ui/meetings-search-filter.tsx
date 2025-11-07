import { useMeetingsFilters } from "../hooks/use-meetings-filters";

import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

export const MeetingsSearchFilter = () => {

    const [filters, setFilters] = useMeetingsFilters();

    return (
        <div className="flex items-center gap-x-2">
            <Input 
              placeholder="Search meetings" 
              value={filters.search} 
              onChange={(e) => setFilters({ search: e.target.value })} 
            />
            <SearchIcon />
        </div>
    );
};