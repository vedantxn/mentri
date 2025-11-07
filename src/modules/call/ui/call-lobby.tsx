import "@stream-io/video-react-sdk/dist/css/styles.css";
import {
    DefaultVideoPlaceholder,
    StreamVideoParticipant,
    ToggleAudioPreviewButton,
    ToggleVideoPreviewButton,
    useCallStateHooks,
    VideoPreview,
} from "@stream-io/video-react-sdk";
import { authClient } from "@/lib/auth-client";
import { generatedAvatarUri } from "@/lib/avatar";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { LogInIcon } from "lucide-react";

interface Props {
    onJoin: () => void;
};

const DisabledVideoPreview = () => {
    const { data } = authClient.useSession();

    return (
        <DefaultVideoPlaceholder
            participant={
                {
                    name: data?.user.name ?? "",
                    image: data?.user.image
                        ?? generatedAvatarUri({seed: data?.user.name ?? "", variant: "initials"}),
                } as StreamVideoParticipant
            }
        />
    )
};

const AllowBrowserPermissions = () => {
    return (
        <p className="text-sm">
            Please grant your browser a permisson to access your camera and microphone.
        </p>
    )
}

export const CallLobby = ({ onJoin }: Props) => {
    
    const { useCameraState, useMicrophoneState } = useCallStateHooks();
    const { hasBrowserPermission: hasMicrophonePermissions } = useMicrophoneState();
    const { hasBrowserPermission: hasCameraPermissions } = useCameraState();
    
    const hasBrowserPermissions = hasMicrophonePermissions && hasCameraPermissions;

    return (
        <div>
            <div>
                <div>
                    <div>
                        <h6>Ready to Join?</h6>
                        <p>Set up your call before joining</p>
                    </div>
                    <VideoPreview
                        DisabledVideoPreview={
                            hasBrowserPermissions ? DisabledVideoPreview : AllowBrowserPermissions
                        }
                    />
                </div>
                <div>
                    <ToggleAudioPreviewButton />
                    <ToggleVideoPreviewButton />
                </div>
                <div>
                    <Button variant="ghost" asChild>
                        <Link href="/meetings">Cancel</Link>
                    </Button>
                    <Button
                        onClick={onJoin}
                        disabled={!hasBrowserPermissions}
                    >
                        <LogInIcon />
                        Join
                    </Button>
                </div>
            </div>
        </div>
    )    
}