import { useEffect, useState } from 'react';
import { getPaginatedTasks, getTasks } from '../libs/services/task';
import { ITask } from '../libs/types/task';
import useRevalidate from './use-revalidate';
import { taskKeyFactory } from './key-factories';

interface UsePaginatedTasksProps {
  page: number;
  pageSize: number;
}
export default function usePaginatedTasks({ page, pageSize }: UsePaginatedTasksProps) {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const { addRevalidationListener } = useRevalidate();

  useEffect(() => {
    setTasks(getPaginatedTasks(page, pageSize));
    addRevalidationListener(taskKeyFactory.tasks, () => {
      setTasks(getPaginatedTasks(page, pageSize));
    });
  }, [addRevalidationListener]);

  const fetchPaginatedTasks = (page: number, pageSize: number) => {
    setTasks(getPaginatedTasks(page, pageSize));
  };

  return { tasks, setTasks, fetchPaginatedTasks };
}
