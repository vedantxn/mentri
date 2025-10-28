"use client"

import { ColumnDef } from "@tanstack/react-table";
import { MeetingGetMany } from "../types";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

import { GeneratedAvatar } from "@/components/generated-avatar";
import { Badge } from "@/components/ui/badge";
import { 
    CircleXIcon, 
    CircleCheckIcon, 
    ClockArrowUpIcon, 
    ClockFadingIcon, 
    LoaderIcon, 
    CornerDownRightIcon
} from "lucide-react";

function formatDuration(duration: number) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}h ${minutes}m`;
};

const statusIconMap: {
    [key: string]: React.ComponentType<{ className?: string }>;
} = {
    upcoming: ClockArrowUpIcon,
    active: LoaderIcon,
    completed: CircleCheckIcon,
    processing: LoaderIcon,
    cancelled: CircleXIcon,
};

const statusColorMap = {
    upcoming: "bg-yellow-500/20 text-yellow-800",
    active: "",
    completed: "",
    processing: "",
    cancelled: "",
}

export const columns: ColumnDef<MeetingGetMany[number]>[] = [
  {
    accessorKey: "name",
    header: "Meeting Name",
    cell: ({ row }) => (
      <div>
        <div>
          <span>{row.original.name}</span>
        </div>
        <div>
          <CornerDownRightIcon className="size-3 text-muted-foreground"/>
          <span>
            {row.original.agent.name}
          </span>
        </div>
        <GeneratedAvatar seed={row.original.agent.name} variant="botttsNeutral" />
        <span>
          {row.original.startedAt ? format(row.original.startedAt, "MMM d") : ""}
        </span>
      </div>
    )
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const Icon = statusIconMap[row.original.status];
      return (
        <Badge>
          <Icon className={cn(statusColorMap[row.original.status], "size-4")}/>
          <span>{row.original.status}</span>
        </Badge>
      )
    },
  },
  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => (
      <span>{formatDuration(row.original.duration)}</span>
    )
  },
];