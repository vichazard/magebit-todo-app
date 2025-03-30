import { TodoFilter } from "../types/todo.type";
import { HttpException } from "../exceptions";
import { TodoService } from "../services";
import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";
export const TodoController = {
  getTodos: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { filter = TodoFilter.ALL } = req.query;
      const todos = await TodoService.getTodos(filter as TodoFilter);
      logger.info(`Fetched ${todos.length} todos`);
      res.status(200).json({
        todos,
        message: "Todos fetched successfully",
      });
    } catch (error) {
      next(error);
    }
  },
  createTodo: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, description } = req.body;
      const todo = await TodoService.createTodo(title, description);
      logger.info(`Todo created: ${todo.id}`);
      res.status(201).json({
        todo,
        message: "Todo created successfully",
      });
    } catch (error) {
      next(error);
    }
  },
  updateTodoStatus: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { isCompleted } = req.body;
      const todo = await TodoService.updateTodoStatus(Number(id), isCompleted);
      logger.info(`Todo status updated: ${todo.id}`);
      res.status(200).json({
        id: todo.id,
        message: "Todo status updated successfully",
      });
    } catch (error) {
      if (error instanceof HttpException) {
        logger.error(`Error updating todo status: ${error.message}`);
        res.status(error.statusCode).json({
          code: error.statusCode,
          message: error.message,
        });
      } else {
        next(error);
      }
    }
  },
  deleteTodo: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const todo = await TodoService.deleteTodo(Number(id));
      logger.info(`Todo deleted: ${todo.id}`);
      res.status(200).json({
        id: todo.id,
        message: "Todo deleted successfully",
      });
    } catch (error) {
      if (error instanceof HttpException) {
        logger.error(`Error deleting todo: ${error.message}`);
        res.status(error.statusCode).json({
          code: error.statusCode,
          message: error.message,
        });
      } else {
        next(error);
      }
    }
  },
};
