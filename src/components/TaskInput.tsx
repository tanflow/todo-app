import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

interface TaskInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  darkMode: boolean;
}

export function TaskInput({ value, onChange, onSubmit, darkMode }: TaskInputProps) {
  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="mb-8"
    >
      <div className="flex gap-3">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="What needs to be done?"
          className={`flex-1 px-6 py-4 rounded-2xl border-2 outline-none transition-all duration-300 text-lg ${
            darkMode
              ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-indigo-500'
              : 'bg-white/80 border-gray-200 text-gray-700 placeholder-gray-400 focus:border-blue-400'
          }`}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={!value.trim()}
          className={`px-6 py-4 rounded-2xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
            darkMode
              ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/30'
              : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-blue-500/30'
          }`}
        >
          <Plus className="w-6 h-6" strokeWidth={2.5} />
        </motion.button>
      </div>
      {value.trim() && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`mt-2 text-sm ${
            darkMode ? 'text-gray-500' : 'text-gray-400'
          }`}
        >
          Press Enter to add task
        </motion.p>
      )}
    </motion.form>
  );
}