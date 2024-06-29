import { Button, Form, TextInput, Stack, Heading, Section, TextArea } from '@carbon/react';
import { useForm } from 'react-hook-form';
import './AddTaskForm.scss';
import { ITask } from '../../libs/types/task';
import { addTask } from '../../libs/services/task';
import useRevalidate from '../../hooks/use-revalidate';
import { uuid } from '../../utils/uuid';
import { taskKeyFactory } from '../../hooks/key-factories';

export default function AddTaskForm() {
  const { register, handleSubmit, reset } = useForm<ITask>({
    defaultValues: {
      title: '',
      description: ''
    }
  });
  const { revalidate } = useRevalidate();

  const onSubmit = (data: ITask) => {
    const task = {
      ...data,
      id: uuid()
    };
    addTask(task);
    reset({
      title: '',
      description: ''
    });
    revalidate(taskKeyFactory.tasks);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="add-task-form">
      <Section level={4} className="add-task-form-title-container">
        <Heading>Add New Task</Heading>
      </Section>
      <Stack gap={7}>
        <TextInput id="title" labelText="Task title" {...register('title')} />
        <TextArea id="description" labelText="Task description" {...register('description')} />
        <Button type="submit">Add Task</Button>
      </Stack>
    </Form>
  );
}
