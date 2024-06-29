import { useEffect, useState } from 'react';
import { getPaginatedTasks, getTasks } from '../libs/services/task';
import { ITask } from '../libs/types/task';
import useRevalidate from './use-revalidate';
import { taskKeyFactory } from './key-factories';

interface UsePaginatedTasksProps {
  page: number;
  pageSize: number;
}
export default function usePaginatedTasks({
  page: pageFromProps,
  pageSize: pageSizeFromProps
}: UsePaginatedTasksProps) {
  const [page, setPage] = useState(pageFromProps);
  const [pageSize, setPageSize] = useState(pageSizeFromProps);
  const [tasks, setTasks] = useState<ITask[]>([]);
  const { addRevalidationListener, updateRevalidationListener } = useRevalidate();

  const getTasks = (page: number, pageSize: number) => {
    const tasks = getPaginatedTasks(page, pageSize);
    if (tasks.length !== 0 || page <= 1) return tasks;
    setPage(page - 1);
    return getPaginatedTasks(page - 1, pageSize);
  };

  useEffect(() => {
    setTasks(getPaginatedTasks(page, pageSize));
    addRevalidationListener(taskKeyFactory.tasks, () => {
      setTasks(getTasks(page, pageSize));
    });
  }, []);

  useEffect(() => {
    updateRevalidationListener(taskKeyFactory.tasks, () => {
      setTasks(getTasks(page, pageSize));
    });
  }, [page, pageSize, updateRevalidationListener]);

  const fetchPaginatedTasks = (page: number, pageSize: number) => {
    setPage(page);
    setPageSize(pageSize);
    setTasks(getTasks(page, pageSize));
  };

  return { tasks, setTasks, fetchPaginatedTasks };
}
