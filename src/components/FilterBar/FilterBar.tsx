import type { Filter } from '../../types';
import { useLang } from '../../LangContext';
import styles from './FilterBar.module.css';

interface FilterBarProps {
  filter: Filter;
  onFilterChange: (f: Filter) => void;
  doneCount: number;
  totalCount: number;
}

export function FilterBar({ filter, onFilterChange, doneCount, totalCount }: FilterBarProps) {
  const { t } = useLang();

  const FILTERS: { label: string; value: Filter }[] = [
    { label: t.filterAll, value: 'all' },
    { label: t.filterActive, value: 'active' },
    { label: t.filterDone, value: 'done' },
  ];

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
      <span className={styles.stats}>{t.stats(doneCount, totalCount)}</span>
    </div>
  );
}
