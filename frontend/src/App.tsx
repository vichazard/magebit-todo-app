import { TodoForm } from "./components/TodoForm";
import { TodoList } from "./components/TodoList";
import { useTodos } from "./hooks/useTodos";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const {
    todos,
    isLoading,
    error,
    addTodo,
    toggleTodo,
    deleteTodo,
    setFilter,
    filter,
  } = useTodos();

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Todo List</h1>
        <TodoForm onSubmit={addTodo} />
        {isLoading ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-500">
            Loading todos...
          </div>
        ) : (
          <TodoList
            todos={todos}
            filter={filter}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onFilterChange={setFilter}
          />
        )}
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
