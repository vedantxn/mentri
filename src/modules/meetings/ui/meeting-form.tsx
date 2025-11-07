import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { CommandSelect } from "@/components/command-select";
import { GeneratedAvatar } from "@/components/generated-avatar";

import { useTRPC } from "@/trpc/client";
//import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";

import type { MeetingGetOne } from "@/modules/meetings/types";
import { meetingsInsertSchema } from "@/modules/meetings/schemas";
import { NewAgentDialog } from "@/modules/agents/ui/new-agent-dialog";


interface MeetingFormProps {
  onSuccess?: (id?: string) => void;
  onCancel?: () => void;
  initialValues?: MeetingGetOne;
}

export const MeetingForm = ({ onSuccess, onCancel, initialValues }: MeetingFormProps) => {

  const trpc = useTRPC();
  const queryClient = useQueryClient();
  //const router = useRouter();
  // const firstInputRef = useRef<HTMLInputElement>(null);

  const [openNewAgentDialog, setOpenNewAgentDialog] = useState(false);
  const [agentSearch, setAgentSearch] = useState("");

  const agents = useQuery(trpc.agents.getMany.queryOptions({
    pageSize: 100,
    search: agentSearch,
  }));

  const createMeeting = useMutation(
    trpc.meetings.create.mutationOptions({
      onSuccess: async (data) => {
        await queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));

        if (initialValues?.id) {
          await queryClient.invalidateQueries(trpc.meetings.getOne.queryOptions({ id: initialValues.id }));
        }

        onSuccess?.(data.id);
      },
      onError: (error) => {
        toast.error(`Error creating agent: ${error.message}`);
        // TODO: Check if error code is 'CONFLICT' and show a specific message
      },
    })
  );

  const updateMeeting = useMutation(
    trpc.meetings.update.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.meetings.getMany.queryOptions({})
        );

        //TODO: Invalidate free tier usage
        // if (initialValues?.id) {
        //   await queryClient.invalidateQueries(
        //     trpc.agents.getOne.queryOptions({ id: initialValues.id })
        //   );
        // }

        onSuccess?.();
      },
      onError: (error) => {
        toast.error(`Error updating agent: ${error.message}`);
        // TODO: Check if error code is 'CONFLICT' and show a specific message
      },
    })
  );

  const form = useForm<z.infer<typeof meetingsInsertSchema>>({
    resolver: zodResolver(meetingsInsertSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      agentId: initialValues?.agentId ?? "",
    },
  });

  // Focus management for accessibility
  useEffect(() => {
    // Focus the first input when the form mounts (dialog opens)
    const timer = setTimeout(() => {
      // firstInput
      // Ref.current?.focus();
    }, 100); // Small delay to ensure dialog is fully opened

    return () => clearTimeout(timer);
  }, []);

  const isEdit = !!initialValues?.id;
  const isPending = createMeeting.isPending || updateMeeting.isPending;

  const onSubmit = (values: z.infer<typeof meetingsInsertSchema>) => {
    if (isEdit) {
      updateMeeting.mutate({
        ...values,
        id: initialValues.id,
      });
    } else {
      createMeeting.mutate(values);
    }
  };

  return (
    <>
    <NewAgentDialog open={openNewAgentDialog} onOpenChange={setOpenNewAgentDialog}/>
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter agent name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="agentId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Agent</FormLabel>
              <FormControl>
                <CommandSelect
                  options = {(agents.data?.items || []).map((agent) => ({
                    value: agent.id,
                    id: agent.id,
                    children: (
                      <div>
                        <GeneratedAvatar seed={agent.id} variant="botttsNeutral" />
                        <span>{agent.name}</span>
                      </div>
                    ),
                  }))}
                  onSelect={field.onChange}
                  onSearch={setAgentSearch}
                  value={field.value}
                  placeholder="Select an agent"
                />
              </FormControl>
              <FormDescription>
                Not found what&apos;re looking for?{" "}
                <Button
                  variant="link"
                  type="button"
                  onClick={() => setOpenNewAgentDialog(true)}
                >
                  Create new agent
                </Button>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between gap-x-2">
          {onCancel && (
            <Button onClick={onCancel} disabled={isPending} variant="ghost" className="mr-2" type="button">
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={isPending}>
            {isEdit ? "Update Agent" : "Create Agent"}
          </Button>
        </div>
      </form>
    </Form>
    </>
  );
};