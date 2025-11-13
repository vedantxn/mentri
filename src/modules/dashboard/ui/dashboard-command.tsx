import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

import { GeneratedAvatar } from "@/components/generated-avatar";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const DashboardCommand = ({ open, setOpen }: Props) => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  
  const trpc = useTRPC();
  const meetings = useQuery(
    trpc.meetings.getMany.queryOptions({
      search, pageSize: 100
    })
  );

  const agents = useQuery(
    trpc.agents.getMany.queryOptions({
      search, pageSize: 100
    })
  );

  return (
    <CommandDialog open={open} onOpenChange={setOpen} >
      <CommandInput 
        placeholder="find a meeting or agent  " 
        value={search}
        onValueChange={setSearch}
      />
      <CommandList>
        <CommandGroup heading="meetings">
          <CommandEmpty>
            <span>No meetings found.</span>
          </CommandEmpty>
          {meetings.data?.items.map((meeting) => (
            <CommandItem
              onSelect={() => {
                router.push(`/meetings/${meeting.id}`);
                setOpen(false);
              }}
              key={meeting.id}
            >
              {meeting.name}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="agents">
          <CommandEmpty>
            <span>No agents found.</span>
          </CommandEmpty>
          {agents.data?.items.map((agent) => (
            <CommandItem
              onSelect={() => {
                router.push(`/agents/${agent.id}`);
                setOpen(false);
              }}
              key={agent.id}
            >
              <GeneratedAvatar
                seed={agent.name}
                variant="botttsNeutral"
                className="size-5" 
              />
              {agent.name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default DashboardCommand;