import {
  Accordion,
  AccordionItem,
  Button,
  ContainedList,
  ContainedListItem,
  Heading,
  IconButton,
  Section,
  Tooltip
} from '@carbon/react';
import { ChevronDown, Close } from '@carbon/icons-react';
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
      <Section level={4} className="task-list-title-container">
        <Heading>Tasks</Heading>
      </Section>
      <Accordion>
        {tasks.length === 0 ? (
          <p>No tasks found</p>
        ) : (
          <>
            {tasks.map((task) => (
              <AccordionItem
                key={task.id}
                title="Section 1 title"
                renderExpando={({ onClick }) => (
                  <div className="task-list-item">
                    <p>{task.title}</p>
                    <div className="task-list-item-actions">
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
            ))}
          </>
        )}
      </Accordion>
    </div>
  );
}
