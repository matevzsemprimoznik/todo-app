import { getTasksCount } from '../libs/services/task';
import { taskKeyFactory } from './key-factories';
import { useQuery } from '@tanstack/react-query';

export default function useTasksCount() {
  return useQuery({
    queryKey: taskKeyFactory.count(),
    queryFn: getTasksCount
  });
}
