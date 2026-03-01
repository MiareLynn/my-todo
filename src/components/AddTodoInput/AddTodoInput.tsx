import { useState } from 'react';
import type { Priority } from '../../types';
import { useLang } from '../../LangContext';
import styles from './AddTodoInput.module.css';

interface AddTodoInputProps {
  onAdd: (text: string, priority: Priority) => void;
}

export function AddTodoInput({ onAdd }: AddTodoInputProps) {
  const { t } = useLang();
  const [value, setValue] = useState('');
  const [priority, setPriority] = useState<Priority>('high');

  const PRIORITY_OPTIONS: { value: Priority; label: string }[] = [
    { value: 'high', label: t.priorityHigh },
    { value: 'medium', label: t.priorityMedium },
    { value: 'low', label: t.priorityLow },
  ];

  const handleAdd = () => {
    if (!value.trim()) return;
    onAdd(value, priority);
    setValue('');
  };

  return (
    <div className={styles.inputArea}>
      <input
        className={styles.input}
        type="text"
        placeholder={t.inputPlaceholder}
        maxLength={100}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
      />
      <div className={styles.priorityGroup}>
        {PRIORITY_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            className={`${styles.priorityBtn} ${styles[opt.value]} ${priority === opt.value ? styles.priorityBtnActive : ''}`}
            onClick={() => setPriority(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>
      <button className={styles.button} onClick={handleAdd}>
        {t.addBtn}
      </button>
    </div>
  );
}
