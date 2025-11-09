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
    LoaderIcon, 
    CornerDownRightIcon,
    ClockFadingIcon
} from "lucide-react";
import { formatDuration } from "@/lib/utils";

// function formatDuration(duration: number) {
//     const hours = Math.floor(duration / 60);
//     const minutes = duration % 60;
//     return `${hours}h ${minutes}m`;
// };

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
    active: "bg-blue-500/20 text-blue-800",
    completed: "bg-green-500/20 text-green-800",
    processing: "bg-orange-500/20 text-orange-800",
    cancelled: "bg-red-500/20 text-red-800",
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
        <Badge variant="outline">
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
      <Badge variant="outline">
        <ClockFadingIcon className="size-4"/>
        {formatDuration(row.original.duration)}
      </Badge>
    )
  },
];