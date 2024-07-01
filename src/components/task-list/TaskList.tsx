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
import { useEffect, useMemo, useState } from 'react';

const DefaultPaginationData = {
  page: 1,
  pageSize: 5
};

export default function TaskList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const { data: tasks, hasNextPage, fetchNextPage } = usePaginatedTasks({ pageSize });
  const { data: tasksCount } = useTasksCount();

  const onChangePaginationProps = async (page: number, pageSize: number) => {
    if (page > currentPage) {
      await fetchNextPage();
    }
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const onDeleteTask = (id: string) => {
    const currentTasks = tasks?.pages[currentPage - 1]?.data;
    if (currentTasks && (currentTasks.length - 1) % pageSize === 0 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="task-list">
      <Section level={4} className="task-list-title-container">
        <Heading>Tasks</Heading>
      </Section>
      <Accordion>
        {tasks?.pages.length === 0 && <p>No tasks found</p>}
        {tasks?.pages.length && tasks?.pages.length > 0 && (
          <div>
            {tasks.pages[currentPage - 1].data.map((task) => (
              <TaskListItem task={task} key={task.id} onDeleteTask={onDeleteTask} />
            ))}
            <Pagination
              key={tasksCount}
              backwardText="Previous page"
              forwardText="Next page"
              itemsPerPageText="Items per page:"
              onChange={(data) => onChangePaginationProps(data.page, data.pageSize)}
              page={currentPage}
              pageSize={pageSize}
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
