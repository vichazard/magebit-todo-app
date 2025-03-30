import { z } from "zod";
import { TodoFilter } from "../types/todo.type";
export const CreateTodoSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
});

export const TodoIdSchema = z.object({
  id: z.string().transform((val) => parseInt(val, 10)),
});

export const TodoFilterSchema = z.object({
  filter: z
    .enum([TodoFilter.ALL, TodoFilter.COMPLETED, TodoFilter.ACTIVE])
    .optional(),
});

export const TodoStatusSchema = z.object({
  isCompleted: z.boolean(),
});
