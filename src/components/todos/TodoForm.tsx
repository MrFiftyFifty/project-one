'use client';

import { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Plus, ChevronDown, ChevronUp } from 'lucide-react';

interface TodoFormProps {
  onAdd: (title: string, description?: string) => Promise<void>;
  loading?: boolean;
}

export const TodoForm = ({ onAdd, loading }: TodoFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [errors, setErrors] = useState<{ title?: string }>({});

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    const newErrors: { title?: string } = {};
    if (!title.trim()) {
      newErrors.title = 'Название задачи обязательно';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await onAdd(title, description);
      setTitle('');
      setDescription('');
      setIsExpanded(false);
      setErrors({});
    } catch (error) {
      console.error('Ошибка добавления задачи:', error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Добавить новую задачу
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex gap-4">
          <div className="flex-1">
            <Input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) setErrors({ ...errors, title: undefined });
              }}
              placeholder="Введите название задачи..."
              error={errors.title}
              disabled={loading}
            />
          </div>
          <Button
            type="button"
            variant="secondary"
            onClick={() => setIsExpanded(!isExpanded)}
            disabled={loading}
            className="shrink-0"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-4 h-4 mr-2" />
                Скрыть
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 mr-2" />
                Детали
              </>
            )}
          </Button>
        </div>

        {isExpanded && (
          <div className="animate-in slide-in-from-top-5 duration-200">
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Добавьте описание задачи (необязательно)..."
              disabled={loading}
              rows={4}
            />
          </div>
        )}

        <div className="flex justify-end pt-4 border-t border-gray-100">
          <Button
            type="submit"
            loading={loading}
            disabled={!title.trim()}
            size="lg"
            className="min-w-[160px]"
          >
            <Plus className="w-5 h-5 mr-2" />
            {loading ? 'Добавляем...' : 'Добавить задачу'}
          </Button>
        </div>
      </form>
    </div>
  );
};