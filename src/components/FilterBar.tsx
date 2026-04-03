import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';

export type FilterType = 'all' | 'pending' | 'completed';

interface FilterBarProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  onClearAll: () => void;
  darkMode: boolean;
}

export function FilterBar({ filter, onFilterChange, onClearAll, darkMode }: FilterBarProps) {
  const filters: { value: FilterType; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className={`flex items-center justify-between mb-6 p-2 rounded-2xl backdrop-blur-xl ${
        darkMode ? 'bg-gray-800/50' : 'bg-white/60'
      }`}
    >
      <div className="flex gap-1">
        {filters.map((f) => (
          <motion.button
            key={f.value}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onFilterChange(f.value)}
            className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
              filter === f.value
                ? darkMode
                  ? 'bg-indigo-500 text-white'
                  : 'bg-blue-500 text-white'
                : darkMode
                ? 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
            }`}
          >
            {f.label}
          </motion.button>
        ))}
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClearAll}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
          darkMode
            ? 'text-red-400 hover:bg-red-500/20'
            : 'text-red-500 hover:bg-red-100'
        }`}
      >
        <Trash2 className="w-4 h-4" />
        Clear All
      </motion.button>
    </motion.div>
  );
}