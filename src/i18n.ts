export type Lang = 'zh' | 'en';

export const messages = {
  zh: {
    title: '待办事项',
    inputPlaceholder: '添加新任务，按 Enter 确认',
    addBtn: '添加',
    filterAll: '全部',
    filterActive: '待完成',
    filterDone: '已完成',
    stats: (done: number, total: number) => `${done}/${total} 已完成`,
    clearDone: '清除已完成',
    empty: '暂无任务',
    priorityHigh: '高',
    priorityMedium: '中',
    priorityLow: '低',
    langToggle: 'EN',
  },
  en: {
    title: 'Todo List',
    inputPlaceholder: 'Add a task, press Enter to confirm',
    addBtn: 'Add',
    filterAll: 'All',
    filterActive: 'Active',
    filterDone: 'Done',
    stats: (done: number, total: number) => `${done}/${total} done`,
    clearDone: 'Clear done',
    empty: 'No tasks',
    priorityHigh: 'High',
    priorityMedium: 'Med',
    priorityLow: 'Low',
    langToggle: '中',
  },
} satisfies Record<Lang, object>;
