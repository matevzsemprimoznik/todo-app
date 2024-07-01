import { ITask } from '../types/task';

export const getTasks = () => {
  const tasks = localStorage.getItem('tasks');
  return (tasks ? JSON.parse(tasks) : []) as ITask[];
};

export const getTasksCount = () => {
  return getTasks().length || 0;
};

export function getPaginatedTasks(pageParam: number, pageSize: number) {
  const tasks = getTasks();
  return {
    data: tasks.slice(pageParam, pageParam + pageSize),
    currentPage: pageParam,
    nextPage: pageParam + pageSize < tasks.length ? pageParam + pageSize : null
  };
}

export const addTask = (task: ITask) => {
  const tasks = getTasks();
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

export const removeTask = (id: string) => {
  const tasks = getTasks();
  const updatedTasks = tasks.filter((task: ITask) => task.id !== id);
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
};

export const changeTaskCompleteStatus = (id: string, completed: boolean) => {
  const tasks = getTasks();
  const task = tasks.find((t: ITask) => t.id === id);
  if (task) {
    task.completed = completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
};
