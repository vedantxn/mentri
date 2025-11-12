import { CircleCheckIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { features } from "process";

const pricingCardVariants = cva("rounded-lg p-4 py-6 w-full", {
    variants: {
        variant: {
            default: "bg-white text-black",
            highlighted: "bg-linear-to-br from [#093C23] to -[#051B16] text-white",
        }
    },
    defaultVariants: {
        variant: "default",
    },
});

const pricingCardIconVariants = cva("size-5", {
    variants: {
        variant: {
            default: "fill-primary text-white",
            highlighted: "fill-white text-black",
        },
    },
    defaultVariants: {
        variant: "default",
    }
});

const pricingCardSecondaryTextVaraint = cva("text-neutral-700", {
    variants: {
        variant: {
            default: "text-neutral-700",
            highlighted: "text-neutral-300",
        },
    },
});

const pricingCardBadgeVaraints = cva("text-black text-xs font-normal p-1", {
    variants: {
        variant: {
            default: "bg-primary/20",
            highlighted: "bg=[#F5B797]"
        },
    },
    defaultVariants: {
        variant: "default",
    },
});

interface Props extends VariantProps<typeof pricingCardVariants> {
    badge?: string | null;
    price: number;
    features: string[];
    title: string;
    description?: string | null;
    priceSuffix: string;
    className?: string;
    buttonText: string;
    onClick: () => void;
};

export const PricingCard = ({
    variant,
    badge,
    price,
    features,
    title,
    description,
    priceSuffix,
    className,
    buttonText,
    onClick,
}: Props) => {
    return (
        <div className={cn(pricingCardVariants({ variant }), className)}>
            <div>
                <div>
                    <div>
                        <h6>{title}</h6>
                        {badge ? (
                            <Badge className={cn(pricingCardBadgeVaraints({ variant }))}>{badge}</Badge>
                        ): null}
                    </div>
                    <p className={cn(pricingCardSecondaryTextVaraint({ variant }))}>
                        {description}
                    </p>
                </div>
                <div>
                    <h4>
                        {Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                            minimumFractionDigits: 0,
                        }).format(price)}
                    </h4>
                    <span className={cn(pricingCardSecondaryTextVaraint({ variant }))}>
                        {priceSuffix}
                    </span>
                </div>
            </div>
            <div>
                <Separator />
            </div>
            <Button 
                variant={variant === "default" ? "default" : "outline"} 
                onClick={onClick}
            >
                {buttonText}
            </Button>
            <div>
                <p>Features</p>
                <ul className={cn(pricingCardSecondaryTextVaraint({ variant }))}>
                    {features.map((feature, index) => (
                        <li key={index}>
                            <CircleCheckIcon className={cn(pricingCardIconVariants({ variant }))} />
                            {feature}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}