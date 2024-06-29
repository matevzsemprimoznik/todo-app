import { Button, Form, TextInput, Stack, Heading, Section } from '@carbon/react';
import { useForm } from 'react-hook-form';
import './AddTaskForm.scss';
import { ITask } from '../../libs/types/task';
import { addTask } from '../../libs/services/task';
import useRevalidation from '../../hooks/use-revalidation';
export default function AddTaskForm() {
  const { register, handleSubmit, reset } = useForm<ITask>({
    defaultValues: {
      title: '',
      description: ''
    }
  });
  const { revalidate } = useRevalidation();

  const onSubmit = (data: ITask) => {
    addTask(data);
    reset({
      title: '',
      description: ''
    });
    revalidate('tasks');
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="add-task-form">
      <Section level={6} className="add-task-form-title-container">
        <Heading>Add New Task</Heading>
      </Section>
      <Stack gap={7}>
        <TextInput id="title" labelText="Task title" {...register('title')} />
        <TextInput id="description" labelText="Task description" {...register('description')} />
        <Button type="submit">Add Task</Button>
      </Stack>
    </Form>
  );
}
