import Link from "next/link";
import { Button } from "@/components/ui/button";

export const CallEnded = () => {

    return (
        <div>
            <div>
                <div>
                    <div>
                        <h6>Call has been ended</h6>
                        <p>Summary will appear in a few minutes.</p>
                    </div>
                </div>
                <div>
                    <Button variant="ghost" asChild>
                        <Link href="/meetings">Back to meetings</Link>
                    </Button>
                </div>
            </div>
        </div>
    )    
}