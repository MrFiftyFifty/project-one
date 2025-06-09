'use client';

import { useState } from 'react';
import { TodoItem as TodoItemType } from '@/types';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Check, Edit3, Trash2, Clock, Calendar } from 'lucide-react';
import { clsx } from 'clsx';

interface TodoItemProps {
  todo: TodoItemType;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string, description?: string) => void;
}

export const TodoItem = ({ todo, onToggle, onDelete, onEdit }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const handleSave = () => {
    if (editTitle.trim()) {
      onEdit(todo.id, editTitle, editDescription);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
    setIsEditing(false);
  };

  return (
    <div className={clsx(
      'bg-white rounded-lg shadow-sm border border-gray-200 p-4 transition-all duration-200',
      todo.completed && 'opacity-75 bg-gray-50'
    )}>
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggle(todo.id)}
          className={clsx(
            'flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors mt-1',
            todo.completed
              ? 'bg-green-500 border-green-500 text-white'
              : 'border-gray-300 hover:border-green-500'
          )}
        >
          {todo.completed && <Check className="w-3 h-3" />}
        </button>

        <div className="flex-1">
          {isEditing ? (
            <div className="space-y-3">
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Название задачи"
                autoFocus
              />
              <Textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Описание задачи"
                rows={2}
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={handleSave}>
                  Сохранить
                </Button>
                <Button size="sm" variant="ghost" onClick={handleCancel}>
                  Отмена
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <h3 className={clsx(
                'font-medium text-gray-900 mb-1',
                todo.completed && 'line-through text-gray-500'
              )}>
                {todo.title}
              </h3>
              
              {todo.description && (
                <p className={clsx(
                  'text-gray-600 text-sm mb-3',
                  todo.completed && 'line-through text-gray-400'
                )}>
                  {todo.description}
                </p>
              )}

              <div className="flex items-center gap-4 text-xs text-gray-400">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>Создано: {formatDate(todo.createdAt)}</span>
                </div>
                {todo.updatedAt.getTime() !== todo.createdAt.getTime() && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Изменено: {formatDate(todo.updatedAt)}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {!isEditing && (
          <div className="flex gap-1">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsEditing(true)}
              className="p-1 h-8 w-8"
            >
              <Edit3 className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onDelete(todo.id)}
              className="p-1 h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};