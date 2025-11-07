"use client";

import { Loader2Icon } from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { generatedAvatarUri } from "@/lib/avatar";
import { CallConnect } from "./call-connect";

interface Props {
    meetingId: string;
    meetingName: string;
};

export const CallProvider = ({ meetingId, meetingName }: Props) => {
    const { data, isPending } = authClient.useSession();
    
    if(!data || isPending ) {
        return (
            <div>
                <Loader2Icon className="h-10 w-10 animate-spin" />
            </div>
        );
    }

    return (
        <CallConnect
            meetingId={meetingId}
            meetingName={meetingName}
            userId={data.user.id}
            userName={data.user.name}
            userImage={
                data.user.image ??generatedAvatarUri({ 
                    seed: data.user.name, variant: "initials"
                })
            }
        />
    )
    
};