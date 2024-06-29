import { Button, ContainedList, ContainedListItem, IconButton, Tooltip } from '@carbon/react';
import { Close } from '@carbon/icons-react';
import './TaskList.scss';
export default function TaskList() {
  const tasks = [
    { id: 1, name: 'Task 1', completed: false },
    { id: 2, name: 'Task 2', completed: true },
    { id: 3, name: 'Task 3', completed: false }
  ];
  return (
    <div className="task-list">
      <ContainedList label="Tasks" kind="on-page">
        {tasks.map((task, index) => (
          <ContainedListItem
            key={index}
            action={
              <Button hasIconOnly iconDescription="Remove" kind="ghost">
                <Close />
              </Button>
            }>
            {task.name}
          </ContainedListItem>
        ))}
      </ContainedList>
    </div>
  );
}
