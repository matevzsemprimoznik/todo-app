import { Accordion, Heading, Pagination, Section } from '@carbon/react';
import './TaskList.scss';
import usePaginatedTasks from '../../hooks/use-paginated-tasks';
import TaskListItem from '../task-list-item/TaskListItem';
import useTasksCount from '../../hooks/use-tasks-count';
import { useMemo, useState } from 'react';

export default function TaskList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const { data: tasks, hasNextPage, fetchNextPage } = usePaginatedTasks({ pageSize });
  const { data: tasksCount } = useTasksCount();
  const selectedTasks = useMemo(() => tasks?.pages[currentPage - 1]?.data, [tasks, currentPage]);

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
        {selectedTasks?.length === 0 && <p>No tasks found</p>}
        {selectedTasks && selectedTasks?.length > 0 && (
          <div>
            {tasks?.pages[currentPage - 1].data.map((task) => (
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
