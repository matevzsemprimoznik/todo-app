import { useEffect, useState } from 'react';
import { getTasks } from '../libs/services/task';
import { ITask } from '../libs/types/task';
import useRevalidation from './use-revalidation';

export default function useTasks() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const { addRevalidationListener } = useRevalidation();

  useEffect(() => {
    setTasks(getTasks());
    addRevalidationListener('tasks', () => {
      setTasks(getTasks());
    });
  }, [addRevalidationListener]);

  return { tasks, setTasks };
}
