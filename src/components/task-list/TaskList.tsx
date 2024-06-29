import { Button, ContainedList, ContainedListItem, IconButton, Tooltip } from '@carbon/react';
import { Close } from '@carbon/icons-react';
import './TaskList.scss';
import useTasks from '../../hooks/use-tasks';

export default function TaskList() {
  const { tasks } = useTasks();

  return (
    <div className="task-list">
      <ContainedList label="Tasks" kind="on-page">
        {tasks.length === 0 ? (
          <ContainedListItem>No tasks found</ContainedListItem>
        ) : (
          <>
            {tasks.map((task, index) => (
              <ContainedListItem
                key={index}
                action={
                  <Button hasIconOnly iconDescription="Remove" kind="ghost">
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
