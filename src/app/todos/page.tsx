'use client';

import { useTodos } from '@/hooks/useTodos';
import { TodoForm } from '@/components/todos/TodoForm';
import { TodoFilters } from '@/components/todos/TodoFilters';
import { TodoList } from '@/components/todos/TodoList';
import { CheckSquare, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function TodosPage() {
  const {
    todos,
    loading,
    filter,
    stats,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    setFilter,
  } = useTodos();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/">
              <Button variant="secondary" size="sm" className="shadow-sm border-2 border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50">
                <ArrowLeft className="w-4 h-4 mr-2" />
                <span className="font-medium text-gray-900">На главную</span>
              </Button>
            </Link>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <CheckSquare className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Менеджер задач
              </h1>
              <p className="text-gray-600 mt-1">
                Организуйте свои дела и достигайте целей
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <TodoForm onAdd={addTodo} loading={loading} />

          <TodoFilters
            activeFilter={filter}
            onFilterChange={setFilter}
            stats={stats}
          />

          <TodoList
            todos={todos}
            loading={loading}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
            currentFilter={filter}
          />
        </div>
      </div>
    </div>
  );
}