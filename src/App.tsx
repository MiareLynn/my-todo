import { useTodos } from './hooks/useTodos';
import { AddTodoInput } from './components/AddTodoInput/AddTodoInput';
import { FilterBar } from './components/FilterBar/FilterBar';
import { TodoList } from './components/TodoList/TodoList';
import { useLang } from './LangContext';
import styles from './App.module.css';

function App() {
  const { t, toggleLang } = useLang();
  const {
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
  } = useTodos();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{t.title}</h1>
        <button className={styles.langBtn} onClick={toggleLang}>
          {t.langToggle}
        </button>
      </div>
      <AddTodoInput onAdd={addTodo} />
      <FilterBar
        filter={filter}
        onFilterChange={setFilter}
        doneCount={doneCount}
        totalCount={totalCount}
      />
      <TodoList
        todos={filteredTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onEdit={editTodo}
        onPriorityChange={changePriority}
      />
      <button className={styles.clearBtn} onClick={clearDone}>
        {t.clearDone}
      </button>
    </div>
  );
}

export default App;
