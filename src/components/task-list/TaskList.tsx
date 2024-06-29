import {
  Accordion,
  AccordionItem,
  Button,
  ContainedList,
  ContainedListItem,
  Heading,
  IconButton,
  Pagination,
  Section,
  Tooltip
} from '@carbon/react';
import './TaskList.scss';
import usePaginatedTasks from '../../hooks/use-paginated-tasks';
import TaskListItem from '../task-list-item/TaskListItem';
import useTasksCount from '../../hooks/use-tasks-count';

const DefaultPaginationData = {
  page: 1,
  pageSize: 5
};

export default function TaskList() {
  const { tasks, fetchPaginatedTasks } = usePaginatedTasks(DefaultPaginationData);
  const { tasksCount } = useTasksCount();

  const onChangePaginationProps = (page: number, pageSize: number) => {
    fetchPaginatedTasks(page, pageSize);
  };

  return (
    <div className="task-list">
      <Section level={4} className="task-list-title-container">
        <Heading>Tasks</Heading>
      </Section>
      <Accordion>
        {tasks.length === 0 && <p>No tasks found</p>}
        {tasks.length > 0 && (
          <div>
            {tasks.map((task) => (
              <TaskListItem task={task} key={task.id} />
            ))}
            <Pagination
              backwardText="Previous page"
              forwardText="Next page"
              itemsPerPageText="Items per page:"
              onChange={(data) => onChangePaginationProps(data.page, data.pageSize)}
              page={DefaultPaginationData.page}
              pageSize={DefaultPaginationData.pageSize}
              pageSizes={[5, 10]}
              totalItems={tasksCount}
              size="md"
            />
          </div>
        )}
      </Accordion>
    </div>
  );
}
