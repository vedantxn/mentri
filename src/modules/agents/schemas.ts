import { z } from "zod";

export const agentsInsertSchema = z.object({
    name: z.string().min(1, "Name is required"),
    instructions: z.string().min(1, "Instruction is required"),
    
})

export const agentsUpdateSchema = agentsInsertSchema.extend({
    id: z.string().min(1, "ID is required"),
});
