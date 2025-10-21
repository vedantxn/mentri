import { AlertCircle, Loader2 } from "lucide-react";

interface Props {
    title: string;
    description: string;
}

export const ErrorState = ({
    title, description }: Props) => {
    return (
        <div>
            <AlertCircle className="h-8 w-8 animate-spin" />
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="text-sm text-muted-foreground">{description}</p>
        </div>
    );
};