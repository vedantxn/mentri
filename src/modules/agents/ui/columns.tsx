"use client"

import { ColumnDef } from "@tanstack/react-table";
import { AgentGetOne } from "../types";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { CornerDownRightIcon, VideoIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<AgentGetOne>[] = [
  {
    accessorKey: "name",
    header: "Agent Name",
    cell: ({ row }) => (
      <div>
        <div>
          <GeneratedAvatar seed={row.original.name} variant="botttsNeutral" />
          <span>{row.original.name}</span>
        </div>
        <div>
          <CornerDownRightIcon className="size-3 text-muted-foreground"/>
          <span>
            {row.original.instructions}
          </span>
        </div>
      </div>
    )
  },
  {
    accessorKey: "meetingCount",
    header: "Meetings",
    cell: ({ row }) => (
      <Badge variant="outline">
        <VideoIcon className="text-blue-700"/>
        {/* {row.original.meetingCount} {row.original.meetingCount === 1 ? "Meeting" : "Meetings"} */}
        5 Meetings
      </Badge>
    )
  },
  {
    accessorKey: "status",
    header: "Status",
  },
]