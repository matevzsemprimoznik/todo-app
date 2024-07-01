import { useEffect, useState } from 'react';
import { getPaginatedTasks } from '../libs/services/task';
import { taskKeyFactory } from './key-factories';
import { useInfiniteQuery } from '@tanstack/react-query';

interface UsePaginatedTasksProps {
  pageSize: number;
}
export default function usePaginatedTasks({ pageSize = 5 }: UsePaginatedTasksProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const infinityQueryProps = useInfiniteQuery({
    queryKey: [...taskKeyFactory.tasks, { pageSize }],
    queryFn: ({ pageParam }) => getPaginatedTasks(pageParam, pageSize),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage
  });

  useEffect(() => {
    if ((infinityQueryProps.data?.pages.length || 10000) < currentPage) {
      setCurrentPage(currentPage - 1);
    }
  }, [infinityQueryProps.data?.pageParams]);

  return {
    ...infinityQueryProps,
    currentPage,
    setCurrentPage
  };
}
