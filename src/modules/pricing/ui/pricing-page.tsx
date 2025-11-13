"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { authClient } from "@/lib/auth-client";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { PricingCard } from "./pricing-card";

export const PricingView = () => {
    const trpc = useTRPC();
    const { data: subscription } = useSuspenseQuery(
        trpc.premium.getCurrentSubscription.queryOptions(),
    );
    const { data: products } = useSuspenseQuery(
        trpc.premium.getProducts.queryOptions(),
    );

    return (
        <div>
            <div>
                <h3>Current Plan: {subscription?.name ?? "Free"}</h3>
                <div>
                    {products.map((product) => {
                        const isCurrentProduct = subscription?.id === product.id;
                        const isPremium = !!subscription;

                        let buttonText = "Upgrade";
                        let onClick = () => authClient.checkout({ products: [product.id] });

                        if (isCurrentProduct) {
                            buttonText = "Manage";
                            onClick = () => authClient.customer.portal();
                        } else if (isPremium) {
                            buttonText = "Change Plan";
                            onClick = () => authClient.customer.portal();
                        }

                        return (
                            <PricingCard 
                                key={product.id}
                                buttonText={buttonText}
                                onClick={onClick}
                                variant={
                                    product.metadata.variant === "highlighted" 
                                        ? "highlighted"
                                        : "default"
                                }
                                title={product.name}
                                price={
                                    product.prices[0].amountType === "fixed"
                                    ? product.prices[0].priceAmount / 100
                                    : 0
                                }
                                description={product.description}
                                priceSuffix={`${product.prices[0].recurringInterval}`}
                                features={product.benefits.map(
                                    (benefit) => benefit.description
                                )}
                                badge={product.metadata.badge as string | null}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export const UpgradeViewLoading = () => {
    return (
        <LoadingState 
            title="Loading..."
            description="Please wait while we load your subscription."
        />
    );
};

export const UpgradeViewError = () => {
    return (
        <ErrorState 
            title="Error"
            description="Something went wrong while loading your subscription."
        />
    );
};