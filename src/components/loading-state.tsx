import { Loader2 } from "lucide-react";

interface Props {
    title: string;
    description: string;
}

export const LoadingState = ({
    title, description }: Props) => {
    return (
        <div>
            <Loader2 className="h-8 w-8 animate-spin" />
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="text-sm text-muted-foreground">{description}</p>
        </div>
    );
};