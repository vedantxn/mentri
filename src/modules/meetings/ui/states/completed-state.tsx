import { MeetingGetOne } from "../../types";
import Link from "next/link";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { formatDuration } from "@/lib/utils";
import { format } from "date-fns";
import Markdown from "react-markdown";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpenTextIcon, ClockFadingIcon, FileTextIcon, FileVideoIcon, SparklesIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Transcript } from "../transcript";
import { ChatProvider } from "../chat-provider";

interface Props { 
    data: MeetingGetOne;
}

export const CompletedState = ({ data }: Props) => {
    return (
        <div>
            <Tabs>
                <div>
                    <ScrollArea>
                        <TabsList>
                            <TabsTrigger value="summary">
                                <BookOpenTextIcon />
                                Summary
                            </TabsTrigger>
                            <TabsTrigger value="transcript">
                                <FileTextIcon />
                                Transcript
                            </TabsTrigger>
                            <TabsTrigger value="recording">
                                <FileVideoIcon />
                                Recording
                            </TabsTrigger>
                            <TabsTrigger value="chat">
                                <SparklesIcon />
                                Ask AI
                            </TabsTrigger>
                        </TabsList>
                        <ScrollBar />
                    </ScrollArea>
                </div>
                <TabsContent value="transcript">
                    <Transcript meetingId={data.id} />
                </TabsContent>
                <TabsContent value="chat">
                    <ChatProvider meetingId={data.id} meetingName={data.name} />
                </TabsContent>
                <TabsContent value="recording">
                    <div>
                        <video
                            src={data.recordingUrl!}
                            controls
                        />
                    </div>
                </TabsContent>
                <TabsContent value="summary">
                    <div>
                        <div>
                            <h2>{data.name}</h2>
                            <div>
                                <Link href={`/agents/${data.agent.id}`}>
                                    <GeneratedAvatar
                                        seed={data.agent.name}
                                        variant="botttsNeutral"
                                    />
                                    {data.agent.name}
                                </Link>{" "}
                                <p>{data.startedAt ? format(data.startedAt, "PPP") : ""}</p>
                            </div>
                            <div>
                                <SparklesIcon />
                                <p>Generate Summary</p>
                            </div>
                            <Badge variant="outline">
                                <ClockFadingIcon />
                                {data.duration ? formatDuration(data.duration) : ""}
                            </Badge>
                            <div>
                                <Markdown components={{
                                    h1: (props) => (
                                    <h1 {...props} className="text-2xl font-bold" />
                                    ),
                                    h2: (props) => (
                                        <h2 {...props} className="text-xl font-bold" />
                                    ),
                                    h3: (props) => (
                                        <h3 {...props} className="text-lg font-bold" />
                                    ),
                                    h4: (props) => (
                                        <h4 {...props} className="text-md font-bold" />
                                    ),
                                    p: (props) => (
                                        <p {...props} className="text-sm" />
                                    ),
                                    ul: (props) => (
                                        <ul {...props} className="list-disc" />
                                    ),
                                    li: (props) => (
                                        <li {...props} className="list-disc" />
                                    ),
                                    ol: (props) => (
                                        <ol {...props} className="list-decimal" />
                                    ),
                                    strong: (props) => (
                                        <strong {...props} className="font-bold" />
                                    ),
                                    em: (props) => (
                                        <em {...props} className="italic" />
                                    ),
                                    a: (props) => (
                                        <a {...props} className="underline" />
                                    ),
                                    code: (props) => (
                                        <code {...props} className="bg-gray-100 px-1 rounded" />
                                    ),
                                    
                                }}>
                                    {data.summary}
                                </Markdown>
                            </div>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};