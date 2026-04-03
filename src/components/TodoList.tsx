import { motion, AnimatePresence } from 'framer-motion';
import { TodoItem } from './TodoItem';
import type { Todo } from '../types/todo';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
  editingId: string | null;
  editingText: string;
  onEditStart: (id: string, text: string) => void;
  onEditChange: (text: string) => void;
  onEditCancel: () => void;
}

export function TodoList({
  todos,
  onToggle,
  onDelete,
  onEdit,
  editingId,
  editingText,
  onEditStart,
  onEditChange,
  onEditCancel,
}: TodoListProps) {
  if (todos.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16"
      >
        <div className="text-6xl mb-4">📝</div>
        <p className="text-xl text-gray-500">No tasks yet</p>
        <p className="text-gray-400 mt-2">Add a task to get started!</p>
      </motion.div>
    );
  }

  return (
    <AnimatePresence mode="popLayout">
      <div className="space-y-3">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
            isEditing={editingId === todo.id}
            editingText={editingText}
            onEditStart={onEditStart}
            onEditChange={onEditChange}
            onEditCancel={onEditCancel}
          />
        ))}
      </div>
    </AnimatePresence>
  );
}