import { ITask } from '../../libs/types/task';
import { AccordionItem, Button } from '@carbon/react';
import { CheckmarkFilled, ChevronDown, CircleOutline, Close } from '@carbon/icons-react';
import useRevalidation from '../../hooks/use-revalidate';
import { changeTaskCompleteStatus, removeTask } from '../../libs/services/task';
import { taskKeyFactory } from '../../hooks/key-factories';
import './TaskListItem.scss';

interface TaskListItemProps {
  task: ITask;
}

export default function TaskListItem({ task }: TaskListItemProps) {
  const { revalidate } = useRevalidation();

  const onClickRemoveTask = (id: string) => {
    removeTask(id);
    revalidate(taskKeyFactory.tasks);
  };

  const onClickTaskCompleted = (id: string, completed: boolean) => {
    changeTaskCompleteStatus(id, !completed);
    revalidate(taskKeyFactory.tasks);
  };

  return (
    <AccordionItem
      key={task.id}
      title="Section 1 title"
      renderToggle={({ onClick }) => (
        <div className="task-list-item">
          <p>{task.title}</p>
          <div className="task-list-item-actions">
            <Button
              hasIconOnly
              iconDescription={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
              kind="ghost"
              onClick={() => onClickTaskCompleted(task.id, task.completed)}
              renderIcon={task.completed ? CheckmarkFilled : CircleOutline}
            />
            <Button
              hasIconOnly
              iconDescription="Remove"
              kind="ghost"
              onClick={() => onClickRemoveTask(task.id)}
              renderIcon={Close}
            />
            <Button
              hasIconOnly
              iconDescription="Expand"
              kind="ghost"
              onClick={onClick}
              renderIcon={ChevronDown}
            />
          </div>
        </div>
      )}>
      <p>{task.description}</p>
    </AccordionItem>
  );
}
