import { Button, Form, TextInput, Stack, Heading, Section } from '@carbon/react';
import { useForm } from 'react-hook-form';
import './AddTaskForm.scss';
import { ITask } from '../../libs/types/task';
import { addTask } from '../../libs/services/task';
export default function AddTaskForm() {
  const { register, handleSubmit } = useForm<ITask>({
    defaultValues: {
      title: '',
      description: ''
    }
  });

  const onSubmit = (data: ITask) => {
    addTask(data);
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
