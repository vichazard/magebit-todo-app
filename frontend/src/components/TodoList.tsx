import { useState } from "react";
import { Check, Trash2, X } from "lucide-react";
import { Todo, FilterStatus } from "../types";
import { TodoListFilters } from "./TodoListFilters";
import { Pagination } from "./Pagination";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  filter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
}

const ITEMS_PER_PAGE = 5;

export function TodoList({
  todos,
  onToggle,
  onDelete,
  onFilterChange,
  filter,
}: TodoListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(todos.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTodos = todos.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <TodoListFilters filter={filter} onFilterChange={onFilterChange} />

      {todos.length === 0 ? (
        <div className="p-8 text-center text-gray-500">No tasks found</div>
      ) : (
        <>
          <ul className="divide-y divide-gray-200">
            {paginatedTodos.map((todo) => (
              <li key={todo.id} className="p-4">
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => onToggle(todo.id)}
                    className={`mt-1 p-1 rounded-full border ${
                      todo.isCompleted
                        ? "bg-green-500 border-green-500 text-white"
                        : "border-gray-300 hover:border-green-500"
                    }`}
                  >
                    {todo.isCompleted ? <Check size={16} /> : <X size={16} />}
                  </button>
                  <div className="flex-1">
                    <h3
                      className={`font-medium ${
                        todo.isCompleted
                          ? "line-through text-gray-500"
                          : "text-gray-800"
                      }`}
                    >
                      {todo.title}
                    </h3>
                    {todo.description && (
                      <p
                        className={`mt-1 text-sm ${
                          todo.isCompleted ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {todo.description}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => onDelete(todo.id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}
