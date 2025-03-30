interface TodoListFiltersProps {
  filter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
}

type FilterStatus = "all" | "active" | "completed";

export function TodoListFilters({
  filter,
  onFilterChange,
}: TodoListFiltersProps) {
  return (
    <div className="border-b border-gray-200 p-4">
      <div className="flex gap-4">
        {(["all", "active", "completed"] as const).map((status) => (
          <button
            key={status}
            onClick={() => onFilterChange(status)}
            className={`px-4 py-2 rounded-md capitalize ${
              filter === status
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {status}
          </button>
        ))}
      </div>
    </div>
  );
}
