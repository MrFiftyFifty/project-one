'use client';

import { useState, useEffect, useCallback } from 'react';
import { TodoItem } from '@/types';
import { todosService } from '@/services/todosService';

export const useTodos = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    const loadTodos = async () => {
      setLoading(true);
      try {
        const savedTodos = await todosService.getTodos();
        setTodos(savedTodos);
      } catch (error) {
        console.error('Ошибка загрузки задач:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTodos();
  }, []);

  const addTodo = useCallback(
    async (title: string, description?: string) => {
      if (!title.trim()) return;

      const newTodo: TodoItem = {
        id: crypto.randomUUID(),
        title: title.trim(),
        description: description?.trim(),
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      try {
        setTodos((prev) => [newTodo, ...prev]);
        await todosService.saveTodos([newTodo, ...todos]);
      } catch (error) {
        console.error('Ошибка добавления задачи:', error);
        setTodos((prev) => prev.filter((todo) => todo.id !== newTodo.id));
      }
    },
    [todos],
  );

  const toggleTodo = useCallback(
    async (id: string) => {
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed, updatedAt: new Date() } : todo,
      );

      try {
        setTodos(updatedTodos);
        await todosService.saveTodos(updatedTodos);
      } catch (error) {
        console.error('Ошибка обновления задачи:', error);
        setTodos(todos);
      }
    },
    [todos],
  );

  const deleteTodo = useCallback(
    async (id: string) => {
      const updatedTodos = todos.filter((todo) => todo.id !== id);

      try {
        setTodos(updatedTodos);
        await todosService.saveTodos(updatedTodos);
      } catch (error) {
        console.error('Ошибка удаления задачи:', error);
        setTodos(todos);
      }
    },
    [todos],
  );

  const editTodo = useCallback(
    async (id: string, title: string, description?: string) => {
      if (!title.trim()) return;

      const updatedTodos = todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              title: title.trim(),
              description: description?.trim(),
              updatedAt: new Date(),
            }
          : todo,
      );

      try {
        setTodos(updatedTodos);
        await todosService.saveTodos(updatedTodos);
      } catch (error) {
        console.error('Ошибка редактирования задачи:', error);
        setTodos(todos);
      }
    },
    [todos],
  );

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  const stats = {
    total: todos.length,
    active: todos.filter((todo) => !todo.completed).length,
    completed: todos.filter((todo) => todo.completed).length,
  };

  return {
    todos: filteredTodos,
    loading,
    filter,
    stats,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    setFilter,
  };
};
