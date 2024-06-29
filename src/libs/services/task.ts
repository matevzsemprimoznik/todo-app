import { ITask } from '../types/task';

export const getTasks = () => {
  const tasks = localStorage.getItem('tasks');
  return (tasks ? JSON.parse(tasks) : []) as ITask[];
};

export const getTasksCount = () => {
  return getTasks().length || 0;
};

export const getPaginatedTasks = (page: number, pageSize: number) => {
  const tasks = getTasks();
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return tasks.slice(start, end);
};

export const addTask = (task: ITask) => {
  let tasks = getTasks();
  tasks = [task, ...tasks];
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
