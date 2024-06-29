import { useEffect, useState } from 'react';
import { getTasksCount } from '../libs/services/task';
import useRevalidate from './use-revalidate';
import { taskKeyFactory } from './key-factories';

export default function useTasksCount() {
  const [tasksCount, setTasksCount] = useState<number>(0);
  const { addRevalidationListener } = useRevalidate();

  useEffect(() => {
    setTasksCount(getTasksCount());
    addRevalidationListener(taskKeyFactory.tasks, () => {
      setTasksCount(getTasksCount());
    });
  }, []);

  return { tasksCount };
}
