import { motion } from 'framer-motion';
import { Moon, Sun, CheckSquare } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export function Header({ darkMode, onToggleDarkMode }: HeaderProps) {
  return (
    <header className="text-center mb-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-center gap-3 mb-2"
      >
        <div className={`p-3 rounded-2xl ${
          darkMode ? 'bg-indigo-500/20' : 'bg-blue-500/20'
        }`}>
          <CheckSquare className={`w-8 h-8 ${
            darkMode ? 'text-indigo-400' : 'text-blue-600'
          }`} strokeWidth={2} />
        </div>
        <h1 className={`text-4xl font-bold ${
          darkMode ? 'text-white' : 'text-gray-800'
        }`}>
          TaskFlow
        </h1>
      </motion.div>
      <p className={`text-lg ${
        darkMode ? 'text-gray-400' : 'text-gray-500'
      }`}>
        Stay organized, get things done
      </p>
      <button
        onClick={onToggleDarkMode}
        className={`mt-4 p-3 rounded-full transition-all duration-300 ${
          darkMode
            ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
        aria-label="Toggle dark mode"
      >
        {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>
    </header>
  );
}