import { TodoEntity } from "../entities";
import { AppDataSource } from "../db";
import { HttpException } from "../exceptions";
import { TodoFilter } from "../types";
export const TodoService = {
  getTodos: async (filter: TodoFilter) => {
    const todos = await AppDataSource.getRepository(TodoEntity).find({
      where: {
        isCompleted:
          filter === TodoFilter.COMPLETED
            ? true
            : filter === TodoFilter.ACTIVE
            ? false
            : undefined,
        deletedAt: null,
      },
      order: {
        id: "ASC",
      },
    });
    return todos;
  },
  createTodo: async (title: string, description?: string) => {
    const todo = new TodoEntity();
    todo.title = title;
    todo.description = description;
    await AppDataSource.getRepository(TodoEntity).save(todo);
    return todo;
  },
  updateTodoStatus: async (id: number, isCompleted: boolean) => {
    const todo = await AppDataSource.getRepository(TodoEntity).findOneBy({
      id,
    });
    if (!todo) {
      throw new HttpException(404, "Todo not found");
    }
    todo.isCompleted = isCompleted;
    await AppDataSource.getRepository(TodoEntity).save(todo);
    return todo;
  },
  deleteTodo: async (id: number) => {
    const todo = await AppDataSource.getRepository(TodoEntity).findOneBy({
      id,
    });
    if (!todo) {
      throw new HttpException(404, "Todo not found");
    }
    await AppDataSource.getRepository(TodoEntity).softDelete(id);
    return todo;
  },
};
