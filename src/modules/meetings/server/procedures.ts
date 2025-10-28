import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE, MIN_PAGE_SIZE } from "@/constants";

import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { db } from "@/db";
import { agents, meetings } from "@/db/schema";
import z from "zod";
import { and, eq, getTableColumns, ilike, desc, count, sql } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { meetingsInsertSchema, meetingsUpdateSchema } from "../schemas";


export const meetingsRouter = createTRPCRouter({

    update: protectedProcedure
        .input(meetingsUpdateSchema)
        .mutation(async({ ctx, input }) => {
            const [updatedMeeting] = await db
                .update(meetings)
                .set(input)
                .where(and(
                    eq(meetings.id, input.id),
                    eq(meetings.userId, ctx.auth.user.id),
                ))
                .returning();
                
            if (!updatedMeeting) {
                throw new TRPCError({ code: "NOT_FOUND", message: "Meeting not found" });
            }
                
            return updatedMeeting;
        }),

    create: protectedProcedure
          .input(meetingsInsertSchema)
          .mutation(async ({ctx, input}) => {
            const [createdMeeting] = await db
                .insert(meetings)
                .values({
                    ...input,
                    userId: ctx.auth.user.id,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                })
                .returning();
            
            return createdMeeting;
          }),

    getOne: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ input, ctx }) => {
            const [existingMeeting] = await db
                .select({
                    ...getTableColumns(meetings),
                })
                .from(meetings)
                .where(and(
                    eq(meetings.id, input.id),
                    eq(meetings.userId, ctx.auth.user.id),
                ));
            
            if (!existingMeeting) {
                throw new TRPCError({ code: "NOT_FOUND", message: "Meeting not found" });
            }
                
            return existingMeeting;
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
                    ...getTableColumns(meetings),
                    agent: agents,
                    duration: sql<number>`EXTRACT(EPOCH FROM ("endAt" - "startAt")).as(duration)`,
                })
                .from(meetings)
                .innerJoin(agents, eq(meetings.agentId, agents.id))
                .where(
                    and(
                        eq(meetings.userId, ctx.auth.user.id),
                        search ? ilike(meetings.name, `%${search}%`) : undefined,
                    )
                )
                .orderBy(desc(meetings.createdAt), desc(meetings.id))
                .limit(pageSize)
                .offset((page - 1) * pageSize)
            
            const total = await db
                .select({ count: count() })
                .from(meetings)
                .innerJoin(agents, eq(meetings.agentId, agents.id))
                .where(
                    and(
                        eq(meetings.userId, ctx.auth.user.id),
                        search ? ilike(meetings.name, `%${search}%`) : undefined,
                    )
                );

            const totalPages = Math.ceil(total[0].count / pageSize);
            
            
            return {
                items: data,
                total: total[0].count,
                totalPages,
            };
        })
});