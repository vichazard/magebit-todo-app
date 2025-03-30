import { Router } from "express";
import { TodoController } from "../controllers/todo.controller";
import { validate, validateParams, validateQuery } from "../validations/zod";
import {
  CreateTodoSchema,
  TodoIdSchema,
  TodoFilterSchema,
  TodoStatusSchema,
} from "../validations";

export const todoRouter = Router();

todoRouter.get("/", validateQuery(TodoFilterSchema), TodoController.getTodos);
todoRouter.post("/", validate(CreateTodoSchema), TodoController.createTodo);
todoRouter.delete(
  "/:id",
  validateParams(TodoIdSchema),
  TodoController.deleteTodo
);
todoRouter.put(
  "/:id",
  validateParams(TodoIdSchema),
  validate(TodoStatusSchema),
  TodoController.updateTodoStatus
);
