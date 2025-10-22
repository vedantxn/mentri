import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { db } from "@/db";
import { agents } from "@/db/schema";
import { agentsInsertSchema } from "../schemas";
import z from "zod";
import { eq } from "drizzle-orm";

export const agentsRouter = createTRPCRouter({
    //TODO: change getmany to use protectedprocedure
    getOne: protectedProcedure.input(z.object({ id: z.string() })).query(async ({input}) => {
        const [existingAgent] = await db
            .select()
            .from(agents)
            .where(eq(agents.id, input.id))
            
        return existingAgent;
    }),
    getMany: protectedProcedure.query(async () => {
        const data = await db
            .select()
            .from(agents)

        // await new Promise((resolve) => setTimeout(resolve, 5000))
        // throw new Error({ code: "BAD_REQUEST"})
        return data;
    }),
    create: protectedProcedure
      .input(agentsInsertSchema)
      .mutation(async ({ctx, input}) => {
        // const { name, instructions } = input;
        // const { auth } = ctx;
        const [createdAgent] = await db
            .insert(agents)
            .values({
                ...input,
                userId: ctx.auth.user.id,
                updatedAt: new Date(),
                createdAt: new Date(),
            })
            .returning()
        
        return createdAgent;
      })
});