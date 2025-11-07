import { MeetingStatus } from "../types";
import { useMeetingsFilters } from "../hooks/use-meetings-filters";

import { CommandSelect } from "@/components/command-select";
import {
    CircleXIcon,
    CircleCheckIcon,
    VideoIcon,
    LoaderIcon
} from "lucide-react";

const options = [{
    id: MeetingStatus.Upcoming,
    value: MeetingStatus.Upcoming,
    label: "Upcoming",
    children: (
        <div className="flex items-center gap-x-2">
            <CircleCheckIcon />
            {MeetingStatus.Upcoming}
        </div>
    )
}, {
    id: MeetingStatus.Completed,
    value: MeetingStatus.Completed,
    label: "Completed",
    children: (
        <div className="flex items-center gap-x-2">
            <CircleCheckIcon />
            {MeetingStatus.Completed}
        </div>
    )
}, {
    id: MeetingStatus.Active,
    value: MeetingStatus.Active,
    label: "Active",
    children: (
        <div className="flex items-center gap-x-2">
            <VideoIcon />
            {MeetingStatus.Active}
        </div>
    )
}, {
    id: MeetingStatus.Processing,
    value: MeetingStatus.Processing,
    label: "Processing",
    children: (
        <div className="flex items-center gap-x-2">
            <LoaderIcon />
            {MeetingStatus.Processing}
        </div>
    )
}, {
    id: MeetingStatus.Cancelled,
    value: MeetingStatus.Cancelled,
    label: "Cancelled",
    children: (
        <div className="flex items-center gap-x-2">
            <CircleXIcon />
            {MeetingStatus.Cancelled}
        </div>
    ),
}];

export const StatusFilter = () => {
    const [filters, setFilters] = useMeetingsFilters();

    return (
        <CommandSelect
            placeholder="Select status"
            options={options}
            value={filters.status ?? ""}
            onSelect={(value) => setFilters({ status: value as MeetingStatus })}
            onSearch={() => {}} // TODO
        />
    );
}