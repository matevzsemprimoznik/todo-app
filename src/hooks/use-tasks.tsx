import { useEffect, useState } from 'react';
import { getTasks } from '../libs/services/task';
import { ITask } from '../libs/types/task';
import useRevalidate from './use-revalidate';
import { taskKeyFactory } from './key-factories';

export default function useTasks() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const { addRevalidationListener } = useRevalidate();

  useEffect(() => {
    setTasks(getTasks());
    addRevalidationListener(taskKeyFactory.tasks, () => {
      setTasks(getTasks());
    });
  }, [addRevalidationListener]);

  return { tasks, setTasks };
}
