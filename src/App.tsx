import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Header } from "./components/Header";
import { TaskInput } from "./components/TaskInput";
import { FilterBar, type FilterType } from "./components/FilterBar";
import { Stats } from "./components/Stats";
import { TodoList } from "./components/TodoList";
import { useLocalStorage } from "./hooks/useLocalStorage";
import type { Todo } from "./types/todo";

function App() {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [darkMode, setDarkMode] = useLocalStorage<boolean>("darkMode", false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");

  // Calculate stats
  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter((t) => t.completed).length;
    const pending = total - completed;
    return { total, completed, pending };
  }, [todos]);

  // Filter todos
  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "completed":
        return todos.filter((t) => t.completed);
      case "pending":
        return todos.filter((t) => !t.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  // Sort todos: pending first, then by creation date
  const sortedTodos = useMemo(() => {
    return [...filteredTodos].sort((a, b) => {
      if (a.completed === b.completed) {
        return b.createdAt - a.createdAt;
      }
      return a.completed ? 1 : -1;
    });
  }, [filteredTodos]);

  // Add new task
  const addTask = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    const newTodo: Todo = {
      id: Date.now().toString(),
      text: trimmed,
      completed: false,
      createdAt: Date.now(),
    };

    setTodos((prev) => [newTodo, ...prev]);
    setInputValue("");
  };

  // Toggle task completion
  const toggleTask = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  // Delete task
  const deleteTask = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // Edit task
  const editTask = (id: string, newText: string) => {
    const trimmed = newText.trim();
    if (!trimmed) {
      // Cancel edit if user attempts to save empty text
      setEditingId(null);
      setEditingText("");
      return;
    }

    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text: trimmed } : todo)),
    );
    setEditingId(null);
    setEditingText("");
  };

  // Start editing
  const startEdit = (id: string, text: string) => {
    setEditingId(id);
    setEditingText(text);
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setEditingText("");
  };

  // Clear all tasks
  const clearAllTasks = () => {
    if (todos.length === 0) return;
    if (window.confirm("Are you sure you want to delete all tasks?")) {
      setTodos([]);
      setEditingId(null);
      setEditingText("");
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
          : "bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100"
      }`}
    >
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl ${
            darkMode ? "bg-purple-500/20" : "bg-blue-400/30"
          }`}
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className={`absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl ${
            darkMode ? "bg-indigo-500/20" : "bg-cyan-400/30"
          }`}
        />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-12">
        <Header
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode(!darkMode)}
        />

        <TaskInput
          value={inputValue}
          onChange={setInputValue}
          onSubmit={addTask}
          darkMode={darkMode}
        />

        <Stats {...stats} darkMode={darkMode} />

        <FilterBar
          filter={filter}
          onFilterChange={setFilter}
          onClearAll={clearAllTasks}
          darkMode={darkMode}
        />

        <TodoList
          todos={sortedTodos}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onEdit={editTask}
          editingId={editingId}
          editingText={editingText}
          onEditStart={startEdit}
          onEditChange={setEditingText}
          onEditCancel={cancelEdit}
        />
      </div>
    </div>
  );
}

export default App;
