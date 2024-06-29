import { useEffect, useState } from 'react';
import { getTasks } from '../libs/services/task';
import { ITask } from '../libs/types/task';

export default function useTasks() {
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    setTasks(getTasks());
  }, []);

  return { tasks, setTasks };
}
