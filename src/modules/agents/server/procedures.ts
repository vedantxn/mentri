import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { db } from "@/db";
import { agents } from "@/db/schema";
import { agentsInsertSchema } from "../schemas";
import z from "zod";
import { and, eq, getTableColumns, sql, ilike, desc, count } from "drizzle-orm";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE, MIN_PAGE_SIZE } from "@/constants";
import { TRPCError } from "@trpc/server";


export const agentsRouter = createTRPCRouter({
    //TODO: change getmany to use protectedprocedure
    getOne: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ input, ctx }) => {
            const [existingAgent] = await db
                .select({
                    meetingCount: sql<number>`5`,
                    ...getTableColumns(agents),
                })
                .from(agents)
                .where(and(
                    eq(agents.id, input.id),
                    eq(agents.userId, ctx.auth.user.id),
                ));
            
            if (!existingAgent) {
                throw new TRPCError({ code: "NOT_FOUND", message: "Agent not found" });
            }
                
            return existingAgent;
        }),
    getMany: protectedProcedure
        .input(z.object({
            page: z.number().default(DEFAULT_PAGE),
            pageSize: z
              .number()
              .min(MIN_PAGE_SIZE)
              .max(MAX_PAGE_SIZE)
              .default(DEFAULT_PAGE_SIZE),
            search: z.string().nullish()
            })
        )
        .query(async ({ input, ctx }) => {
            const { search, page, pageSize } = input;

            const data = await db
                    .select({
                        meetingCount: sql<number>`5`,
                        ...getTableColumns(agents),
                    })
                .from(agents)
                .where(
                    and(
                        eq(agents.userId, ctx.auth.user.id),
                        search ? ilike(agents.name, `%${search}%`) : undefined,
                    )
                )
                .orderBy(desc(agents.createdAt), desc(agents.id))
                .limit(pageSize)
                .offset((page - 1) * pageSize)
            
            const total = await db
                .select({ count: count() })
                .from(agents)
                .where(
                    and(
                        eq(agents.userId, ctx.auth.user.id),
                        search ? ilike(agents.name, `%${search}%`) : undefined,
                    )
                );

            const totalPages = Math.ceil(total[0].count / pageSize);
            
            
            return {
                items: data,
                total: total[0].count,
                totalPages,
            };
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