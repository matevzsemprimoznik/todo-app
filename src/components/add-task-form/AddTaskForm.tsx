import { Button, Form, TextInput, Stack, Heading, Section } from '@carbon/react';
import { useForm } from 'react-hook-form';
import './AddTaskForm.scss';

interface ITask {
  title: string;
  description: string;
}

export default function AddTaskForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<ITask>({
    defaultValues: {
      title: '',
      description: ''
    }
  });

  const onSubmit = (data: ITask) => {
    console.log(data);
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
