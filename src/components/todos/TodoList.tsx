'use client';

import { TodoItem as TodoItemType } from '@/types';
import { TodoItem } from './TodoItem';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface TodoListProps {
  todos: TodoItemType[];
  loading: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string, description?: string) => void;
  currentFilter: 'all' | 'active' | 'completed';
}

export const TodoList = ({ 
  todos, 
  loading, 
  onToggle, 
  onDelete, 
  onEdit, 
  currentFilter 
}: TodoListProps) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Загрузка задач...</span>
        </div>
      </div>
    );
  }

  if (todos.length === 0) {
    const emptyStateConfig = {
      all: {
        icon: AlertCircle,
        title: 'Пока нет задач',
        subtitle: 'Добавьте первую задачу, чтобы начать организацию дел',
      },
      active: {
        icon: Clock,
        title: 'Нет активных задач',
        subtitle: 'Все задачи выполнены! Время добавить новые цели',
      },
      completed: {
        icon: CheckCircle,
        title: 'Нет выполненных задач',
        subtitle: 'Выполните задачи, чтобы увидеть их здесь',
      },
    };

    const config = emptyStateConfig[currentFilter];
    const Icon = config.icon;

    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
        <div className="text-center">
          <Icon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {config.title}
          </h3>
          <p className="text-gray-500 max-w-md mx-auto">
            {config.subtitle}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};