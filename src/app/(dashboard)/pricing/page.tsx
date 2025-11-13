import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { PricingView, UpgradeViewError, UpgradeViewLoading } from "@/modules/pricing/ui/pricing-page";

const Page = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    })
    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(
        trpc.premium.getCurrentSubscription.queryOptions(),
    );
    void queryClient.prefetchQuery(
        trpc.premium.getProducts.queryOptions(),
    );

    if (!session) {
        redirect("/login");
    }

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<UpgradeViewLoading />}>
                <ErrorBoundary fallback={<UpgradeViewError />}>
                    <PricingView />
                </ErrorBoundary>
            </Suspense>
        </HydrationBoundary>
    )
}

export default Page;