import { AlertCircle } from "lucide-react";
import Image from "next/image";

interface Props {
    title: string;
    description: string;
}

export const ErrorState = ({
    title, description }: Props) => {
    return (
        <div>
            <AlertCircle className="h-10 w-10 text-destructive" />
            <div>
                <h6 className="text-lg font-semibold">{title}</h6>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
        </div>
    );
};