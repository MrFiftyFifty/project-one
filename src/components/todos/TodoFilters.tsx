'use client';

import { Button } from '@/components/ui/Button';
import { clsx } from 'clsx';

interface TodoFiltersProps {
  activeFilter: 'all' | 'active' | 'completed';
  onFilterChange: (filter: 'all' | 'active' | 'completed') => void;
  stats: {
    total: number;
    active: number;
    completed: number;
  };
}

export const TodoFilters = ({ activeFilter, onFilterChange, stats }: TodoFiltersProps) => {
  const filters = [
    { key: 'all' as const, label: 'Все задачи', count: stats.total },
    { key: 'active' as const, label: 'Активные', count: stats.active },
    { key: 'completed' as const, label: 'Выполненные', count: stats.completed },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex flex-wrap gap-2">
        {filters.map(({ key, label, count }) => (
          <Button
            key={key}
            variant={activeFilter === key ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => onFilterChange(key)}
            className={clsx(
              'flex items-center gap-2 transition-all',
              activeFilter === key && 'shadow-md'
            )}
          >
            <span className="font-medium">{label}</span>
            <span className={clsx(
              'px-2 py-0.5 rounded-full text-xs font-bold',
              activeFilter === key 
                ? 'bg-white/90 text-blue-700' 
                : 'bg-gray-100 text-gray-800'
            )}>
              {count}
            </span>
          </Button>
        ))}
      </div>

      {stats.total > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="text-sm text-gray-800">
            <span className="font-semibold">Прогресс: </span>
            <span className="text-gray-700">
              {stats.completed} из {stats.total} задач выполнено
              {stats.total > 0 && (
                <span className="ml-2 text-green-700 font-bold">
                  ({Math.round((stats.completed / stats.total) * 100)}%)
                </span>
              )}
            </span>
          </div>
          
          <div className="mt-3 w-full bg-gray-200 rounded-full h-3 shadow-inner">
            <div 
              className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500 shadow-sm"
              style={{ 
                width: stats.total > 0 ? `${(stats.completed / stats.total) * 100}%` : '0%' 
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};