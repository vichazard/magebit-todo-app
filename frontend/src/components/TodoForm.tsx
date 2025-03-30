import React, { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "react-toastify";
import { CreateTodo } from "../types";

interface TodoFormProps {
  onSubmit: (todo: CreateTodo) => void;
}

export function TodoForm({ onSubmit }: TodoFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Please enter a task title");
      return;
    }

    onSubmit({
      title: title.trim(),
      description: description.trim(),
    });

    setTitle("");
    setDescription("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-md p-6 mb-8"
    >
      <div className="mb-4">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <textarea
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
        />
      </div>
      <button
        type="submit"
        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        <Plus size={20} />
        Add Task
      </button>
    </form>
  );
}
