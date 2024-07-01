import { useEffect, useState } from 'react';
import { getTasksCount } from '../libs/services/task';
import { taskKeyFactory } from './key-factories';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export default function useTasksCount() {
  return useQuery({
    queryKey: taskKeyFactory.count(),
    queryFn: getTasksCount
  });
}
