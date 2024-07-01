export const taskKeyFactory = {
  tasks: ['tasks'],
  count: () => [...taskKeyFactory.tasks, 'count']
};
