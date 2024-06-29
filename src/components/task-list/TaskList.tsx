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
import { CheckmarkFilled, ChevronDown, CircleOutline, Close } from '@carbon/icons-react';
import './TaskList.scss';
import useTasks from '../../hooks/use-tasks';
import { changeTaskCompleteStatus, removeTask } from '../../libs/services/task';
import useRevalidation from '../../hooks/use-revalidate';
import { taskKeyFactory } from '../../hooks/key-factories';
import TaskListItem from '../task-list-item/TaskListItem';

export default function TaskList() {
  const { tasks } = useTasks();

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
              <TaskListItem task={task} key={task.id} />
            ))}
          </>
        )}
      </Accordion>
    </div>
  );
}
