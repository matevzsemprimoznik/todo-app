import { Button, ContainedList, ContainedListItem, IconButton, Tooltip } from '@carbon/react';
import { Close } from '@carbon/icons-react';
import './TaskList.scss';
import useTasks from '../../hooks/use-tasks';
import { removeTask } from '../../libs/services/task';
import useRevalidation from '../../hooks/use-revalidate';
import { taskKeyFactory } from '../../hooks/key-factories';

export default function TaskList() {
  const { tasks } = useTasks();
  const { revalidate } = useRevalidation();

  const onClickRemoveTask = (id: string) => {
    removeTask(id);
    revalidate(taskKeyFactory.tasks);
  };

  return (
    <div className="task-list">
      <ContainedList label="Tasks" kind="on-page">
        {tasks.length === 0 ? (
          <ContainedListItem>No tasks found</ContainedListItem>
        ) : (
          <>
            {tasks.map((task) => (
              <ContainedListItem
                key={task.id}
                action={
                  <Button
                    hasIconOnly
                    iconDescription="Remove"
                    kind="ghost"
                    onClick={() => onClickRemoveTask(task.id)}>
                    <Close />
                  </Button>
                }>
                {task.title}
              </ContainedListItem>
            ))}
          </>
        )}
      </ContainedList>
    </div>
  );
}
