import { useState, useEffect } from 'react';
import type { Todo, Filter, Priority } from '../types';

const STORAGE_KEY = 'todos';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch {
      return [];
    }
  });
  const [filter, setFilter] = useState<Filter>('all');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const filteredTodos = todos.filter((t) =>
    filter === 'all' ? true : filter === 'active' ? !t.done : t.done
  );

  const doneCount = todos.filter((t) => t.done).length;
  const totalCount = todos.length;

  const addTodo = (text: string, priority: Priority = 'high') => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setTodos((prev) => [{ id: Date.now(), text: trimmed, done: false, priority }, ...prev]);
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const editTodo = (id: number, text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: trimmed } : t))
    );
  };

  const changePriority = (id: number, priority: Priority) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, priority } : t))
    );
  };

  const clearDone = () => {
    setTodos((prev) => prev.filter((t) => !t.done));
  };

  return {
    filteredTodos,
    filter,
    setFilter,
    doneCount,
    totalCount,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    changePriority,
    clearDone,
  };
}
