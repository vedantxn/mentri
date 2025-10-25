import Image from "next/image";

interface Props {
    title: string;
    description: string;
}

export const EmptyState = ({
    title, description }: Props) => {
    return (
        <div>
            <Image src="logo.svg" alt="Empty" width={100} height={100} />
            <div>
                <h6 className="text-lg font-semibold">{title}</h6>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
        </div>
    );
};