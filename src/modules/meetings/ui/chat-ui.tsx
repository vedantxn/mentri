import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import type { Channel as StreamChannel } from "stream-chat";
import {
    useCreateChatClient,
    Chat,
    Channel,
    MessageInput,
    MessageList,
    Thread,
    Window,
} from "stream-chat-react";
import { useTRPC } from "@/trpc/client";
import { LoadingState } from "@/components/loading-state";
import "stream-chat-react/dist/css/v2/index.css";
import { trpc } from "@/trpc/server";

interface ChatUIProps {
    meetingId: string;
    meetingName: string;
    userId: string | undefined;
    userName: string | undefined;
    userImage: string | undefined;
};

export const ChatUI = ({
    meetingId,
    meetingName,
    userId,
    userName,
    userImage,
}: ChatUIProps) => {
    const trpc = useTRPC();
    const { mutateAsync: generateChatToken } = useMutation(
        trpc.meetings.generateChatToken.mutationOptions(),
    );

    const [channel, setChannel] = useState<StreamChannel>();
    const client = useCreateChatClient({
        apiKey: process.env.NEXT_PUBLIC_STREAM_CHAT_API_KEY!,
        tokenOrProvider: generateChatToken,
        userData: {
            id: userId!,
            name: userName!,
            image: userImage,
        },
    });

    useEffect(() => {
        if (!client) return;
        
        const channel = client.channel("messaging", meetingId, {
            // name: meetingName,
            members: [userId!],
        });
        setChannel(channel);
    }, [client, meetingId, meetingName, userId]);

    if (!client || !channel) {
        return (
            <LoadingState 
                title="Loading"
                description="Please wait while we load the chat"
            />
        );
    }

    return (
        <div>
            <Chat client={client}>
                <Channel channel={channel}>
                    <Window>
                        <div>
                            <MessageList />
                        </div>
                        <MessageInput />
                    </Window>
                </Channel>
            </Chat>
        </div>
    );
}


