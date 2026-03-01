import { useState, useEffect, useRef } from 'react';
import type { Todo, Priority } from '../../types';
import { useLang } from '../../LangContext';
import styles from './TodoItem.module.css';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, text: string) => void;
  onPriorityChange: (id: number, priority: Priority) => void;
}

const PRIORITY_CYCLE: Priority[] = ['high', 'medium', 'low'];

export function TodoItem({ todo, onToggle, onDelete, onEdit, onPriorityChange }: TodoItemProps) {
  const { t } = useLang();
  const PRIORITY_LABEL: Record<Priority, string> = {
    high: t.priorityHigh,
    medium: t.priorityMedium,
    low: t.priorityLow,
  };
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editing]);

  const handleStartEdit = () => {
    if (todo.done) return;
    setEditValue(todo.text);
    setEditing(true);
  };

  const handleFinishEdit = () => {
    setEditing(false);
    const trimmed = editValue.trim();
    if (trimmed && trimmed !== todo.text) {
      onEdit(todo.id, trimmed);
    } else if (!trimmed) {
      setEditValue(todo.text);
    }
  };

  const handleEditKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleFinishEdit();
    }
    if (e.key === 'Escape') {
      setEditing(false);
      setEditValue(todo.text);
    }
  };

  const handleCyclePriority = () => {
    const next = PRIORITY_CYCLE[(PRIORITY_CYCLE.indexOf(todo.priority) + 1) % PRIORITY_CYCLE.length];
    onPriorityChange(todo.id, next);
  };

  return (
    <div className={styles.todoItem}>
      <div
        className={`${styles.checkbox} ${todo.done ? styles.checkboxDone : ''}`}
        onClick={() => onToggle(todo.id)}
      />

      {editing ? (
        <input
          ref={inputRef}
          className={styles.editInput}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleFinishEdit}
          onKeyDown={handleEditKey}
        />
      ) : (
        <span
          className={`${styles.todoText} ${todo.done ? styles.todoTextDone : ''}`}
          onDoubleClick={handleStartEdit}
        >
          {todo.text}
        </span>
      )}

      <span
        className={`${styles.priorityTag} ${styles[todo.priority]}`}
        onClick={handleCyclePriority}
        title="点击切换优先级"
      >
        {PRIORITY_LABEL[todo.priority]}
      </span>

      <button className={styles.deleteBtn} onClick={() => onDelete(todo.id)}>
        &#x2715;
      </button>
    </div>
  );
}
