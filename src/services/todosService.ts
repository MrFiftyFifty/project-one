import { TodoItem } from '@/types';

const STORAGE_KEY = 'todos-app-data';

interface StoredTodoItem {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

class TodosService {
  async getTodos(): Promise<TodoItem[]> {
    try {
      if (typeof window === 'undefined') return [];

      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return [];

      const parsed: StoredTodoItem[] = JSON.parse(stored);
      return parsed.map((todo: StoredTodoItem) => ({
        ...todo,
        createdAt: new Date(todo.createdAt),
        updatedAt: new Date(todo.updatedAt),
      }));
    } catch (error) {
      console.error('Ошибка загрузки данных из localStorage:', error);
      return [];
    }
  }

  async saveTodos(todos: TodoItem[]): Promise<void> {
    try {
      if (typeof window === 'undefined') return;

      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      console.error('Ошибка сохранения данных в localStorage:', error);
      throw new Error('Не удалось сохранить данные');
    }
  }

  async clearTodos(): Promise<void> {
    try {
      if (typeof window === 'undefined') return;

      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Ошибка очистки localStorage:', error);
      throw new Error('Не удалось очистить данные');
    }
  }
}

export const todosService = new TodosService();
