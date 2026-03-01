import type { Filter } from '../../types';
import styles from './FilterBar.module.css';

interface FilterBarProps {
  filter: Filter;
  onFilterChange: (f: Filter) => void;
  doneCount: number;
  totalCount: number;
}

const FILTERS: { label: string; value: Filter }[] = [
  { label: '全部', value: 'all' },
  { label: '待完成', value: 'active' },
  { label: '已完成', value: 'done' },
];

export function FilterBar({ filter, onFilterChange, doneCount, totalCount }: FilterBarProps) {
  return (
    <div className={styles.filters}>
      {FILTERS.map(({ label, value }) => (
        <button
          key={value}
          className={`${styles.filterBtn} ${filter === value ? styles.active : ''}`}
          onClick={() => onFilterChange(value)}
        >
          {label}
        </button>
      ))}
      <span className={styles.stats}>
        {doneCount}/{totalCount} 已完成
      </span>
    </div>
  );
}
