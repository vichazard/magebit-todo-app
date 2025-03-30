import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CreateTodo, FilterStatus, Todo, TodoResponse } from "../types";
import axios from "axios";
import { API_URL } from "../consts";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterStatus>("all");

  const fetchTodos = async () => {
    try {
      const response = await axios.get<TodoResponse>(`${API_URL}/api/todos`, {
        params: {
          filter,
        },
      });
      setTodos(response.data.todos);
    } catch (error) {
      setError("Failed to fetch todos");
      toast.error("Failed to fetch todos");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [filter]);

  const addTodo = async ({ title, description }: CreateTodo) => {
    try {
      const response = await axios.post(`${API_URL}/api/todos`, {
        title,
        description,
      });
      setTodos((prev) => [...prev, response.data.todo]);
      toast.success("Todo added");
    } catch (error) {
      toast.error("Failed to add todo");
    }
  };

  const toggleTodo = async (id: number) => {
    try {
      const todo = todos.find((t) => t.id === id);
      if (!todo) {
        toast.error("Todo not found");
        return;
      }
      await axios.put(`${API_URL}/api/todos/${id}`, {
        isCompleted: !todo.isCompleted,
      });
      setTodos((prev) =>
        prev
          .map((t) => (t.id === id ? { ...t, isCompleted: !t.isCompleted } : t))
          .filter((t) => {
            if (filter === "active") return !t.isCompleted;
            if (filter === "completed") return t.isCompleted;
            return true;
          })
      );
      toast.success("Todo status updated");
    } catch (error) {
      toast.error("Failed to update todo status");
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/api/todos/${id}`);
      setTodos((prev) => prev.filter((t) => t.id !== id));
      toast.success("Todo deleted");
    } catch (error) {
      toast.error("Failed to delete todo");
    }
  };

  return {
    error,
    isLoading,
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    filter,
    setFilter,
  };
}
