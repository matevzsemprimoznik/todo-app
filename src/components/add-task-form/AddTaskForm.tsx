import { Button, Form, TextInput, Stack, Heading, Section, TextArea } from '@carbon/react';
import { useForm } from 'react-hook-form';
import './AddTaskForm.scss';
import { ITask } from '../../libs/types/task';
import { addTask } from '../../libs/services/task';
import { uuid } from '../../utils/uuid';
import { taskKeyFactory } from '../../hooks/key-factories';
import { z, ZodType } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';

const AddTaskSchema = z.object({
  title: z
    .string({ message: 'Title is required' })
    .min(3, { message: 'Title must be at least 3 characters' })
    .max(30, { message: 'Title must be at most 30 characters' }),
  description: z.string({ message: 'Description is required' })
});

export default function AddTaskForm() {
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,

    formState: { errors }
  } = useForm<ITask>({
    resolver: zodResolver(AddTaskSchema),
    defaultValues: {
      title: '',
      description: '',
      completed: false
    }
  });
  const queryClient = useQueryClient();

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
    clearErrors('root');
    queryClient.invalidateQueries({
      queryKey: taskKeyFactory.tasks
    });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="add-task-form">
      <Section level={4} className="add-task-form-title-container">
        <Heading>Add New Task</Heading>
      </Section>
      <Stack gap={7}>
        <TextInput
          helperText={errors.title?.message}
          id="title"
          labelText="Task title"
          {...register('title', { required: true })}
        />
        <TextArea
          helperText={errors.description?.message}
          id="description"
          labelText="Task description"
          {...register('description', { required: true })}
        />
        <Button type="submit">Add Task</Button>
      </Stack>
    </Form>
  );
}
