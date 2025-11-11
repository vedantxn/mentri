import { useState } from "react";
import { format } from "date-fns";
import Highlighter from "react-highlight-words";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { generatedAvatarUri } from "@/lib/avatar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface Props {
    meetingId: string;
}

export const Transcript = ({ meetingId }: Props) => {
    const trpc = useTRPC();
    const { data } = useQuery(trpc.meetings.getTranscript.queryOptions({ id: meetingId }))

    const [searchQuery, setSearchQuery] = useState("");
    const filteredData = (data ?? []).filter((item) => 
        item.text.toString().toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    return (
        <div>
            <p>Transcript</p>
            <div className="relative">
                <Input 
                    placeholder="Search transcript..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2" />
            </div>
            <ScrollArea>
                <div>
                    {filteredData.map((item) => {
                        return (
                            <div key={item.start_ts}>
                                <div>
                                    <Avatar>
                                        <AvatarImage
                                            src={item.user.image ?? generatedAvatarUri({ seed: item.user.name, variant: "botttsNeutral" })}
                                            alt={item.user.name}
                                        />
                                    </Avatar>
                                    <p>{item.user.name}</p>
                                    <p>
                                        {format(
                                            new Date(0, 0, 0, 0, 0, 0, item.start_ts),
                                            "mm:ss"
                                        )}
                                    </p>
                                </div>
                                <p>
                                    <Highlighter
                                        highlightClassName="bg-yellow-100"
                                        searchWords={[searchQuery]}
                                        textToHighlight={item.text}
                                    />
                                </p>
                            </div>
                        );
                    })}
                </div>
            </ScrollArea>
        </div>
    );
};