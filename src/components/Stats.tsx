import { motion } from 'framer-motion';
import { CheckCircle, Circle, ListTodo } from 'lucide-react';

interface StatsProps {
  total: number;
  completed: number;
  pending: number;
  darkMode: boolean;
}

export function Stats({ total, completed, pending, darkMode }: StatsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className={`grid grid-cols-3 gap-4 mb-8`}
    >
      <StatCard
        icon={<ListTodo className="w-5 h-5" />}
        label="Total"
        value={total}
        darkMode={darkMode}
        color="blue"
      />
      <StatCard
        icon={<CheckCircle className="w-5 h-5" />}
        label="Completed"
        value={completed}
        darkMode={darkMode}
        color="green"
      />
      <StatCard
        icon={<Circle className="w-5 h-5" />}
        label="Pending"
        value={pending}
        darkMode={darkMode}
        color="orange"
      />
    </motion.div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  darkMode: boolean;
  color: 'blue' | 'green' | 'orange';
}

function StatCard({ icon, label, value, darkMode, color }: StatCardProps) {
  const colorClasses = {
    blue: darkMode ? 'from-indigo-500 to-blue-500' : 'from-blue-400 to-cyan-400',
    green: darkMode ? 'from-green-500 to-emerald-500' : 'from-green-400 to-emerald-400',
    orange: darkMode ? 'from-orange-500 to-amber-500' : 'from-orange-400 to-amber-400',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`p-4 rounded-2xl backdrop-blur-xl border transition-all duration-300 ${
        darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white/60 border-white/40'
      }`}
    >
      <div className={`inline-flex p-2 rounded-xl bg-gradient-to-br ${colorClasses[color]} mb-2`}>
        {icon}
      </div>
      <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        {value}
      </div>
      <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        {label}
      </div>
    </motion.div>
  );
}