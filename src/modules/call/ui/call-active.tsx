import Link from "next/link";
import Image from "next/image";
import { CallControls, SpeakerLayout } from "@stream-io/video-react-sdk";

interface Props {
    onLeave: () => void;
    meetingName: string;
};

export const CallActive = ({ onLeave, meetingName }: Props) => {
    return (
        <div>
            <div>
                <Link href="/meetings">
                    <Image 
                        src="logo.svg"
                        alt="Logo"
                        width={22}
                        height={22}
                    />
                </Link>
                <h6>{meetingName}</h6>
            </div>
            <SpeakerLayout />
            <div>
                <CallControls onLeave={onLeave} />
            </div>
        </div>
    );
};