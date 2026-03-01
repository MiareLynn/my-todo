import { useTodos } from './hooks/useTodos';
import { AddTodoInput } from './components/AddTodoInput/AddTodoInput';
import { FilterBar } from './components/FilterBar/FilterBar';
import { TodoList } from './components/TodoList/TodoList';
import styles from './App.module.css';

function App() {
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
      <h1 className={styles.title}>待办事项</h1>
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
        清除已完成
      </button>
    </div>
  );
}

export default App;
