import type { Todo, Priority } from '../../types';
import { TodoItem } from '../TodoItem/TodoItem';
import { useLang } from '../../LangContext';
import styles from './TodoList.module.css';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, text: string) => void;
  onPriorityChange: (id: number, priority: Priority) => void;
}

export function TodoList({ todos, onToggle, onDelete, onEdit, onPriorityChange }: TodoListProps) {
  const { t } = useLang();

  if (todos.length === 0) {
    return <div className={styles.empty}>{t.empty}</div>;
  }

  return (
    <div className={styles.todoList}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
          onPriorityChange={onPriorityChange}
        />
      ))}
    </div>
  );
}
