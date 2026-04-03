import { motion } from 'framer-motion';
import { Check, Trash2, Edit2, Save, X } from 'lucide-react';
import type { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
  isEditing: boolean;
  editingText: string;
  onEditStart: (id: string, text: string) => void;
  onEditChange: (text: string) => void;
  onEditCancel: () => void;
}

export function TodoItem({
  todo,
  onToggle,
  onDelete,
  onEdit,
  isEditing,
  editingText,
  onEditStart,
  onEditChange,
  onEditCancel,
}: TodoItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
      className={`group flex items-center gap-3 p-4 rounded-2xl backdrop-blur-xl border transition-all duration-300 ${
        todo.completed
          ? 'bg-white/40 border-green-300/30'
          : 'bg-white/60 border-white/40 hover:bg-white/80'
      }`}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
          todo.completed
            ? 'bg-gradient-to-br from-green-400 to-emerald-500 border-green-500'
            : 'border-gray-300 hover:border-blue-400'
        }`}
      >
        {todo.completed && (
          <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
        )}
      </button>

      {/* Task Text */}
      {isEditing ? (
        <input
          type="text"
          value={editingText}
          onChange={(e) => onEditChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onEdit(todo.id, editingText);
            } else if (e.key === 'Escape') {
              onEditCancel();
            }
          }}
          autoFocus
          className="flex-1 bg-white/80 border border-blue-300 rounded-lg px-3 py-2 text-gray-700 outline-none focus:ring-2 focus:ring-blue-400"
        />
      ) : (
        <span
          className={`flex-1 text-lg ${
            todo.completed
              ? 'text-gray-400 line-through'
              : 'text-gray-700'
          }`}
        >
          {todo.text}
        </span>
      )}

      {/* Action Buttons */}
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {isEditing ? (
          <>
            <button
              onClick={() => onEdit(todo.id, editingText)}
              className="p-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors"
            >
              <Save className="w-4 h-4" />
            </button>
            <button
              onClick={onEditCancel}
              className="p-2 rounded-lg bg-gray-400 text-white hover:bg-gray-500 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => onEditStart(todo.id, todo.text)}
              className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
}