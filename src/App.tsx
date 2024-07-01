import React from 'react';
import './App.scss';
import TaskList from './components/task-list/TaskList';
import AddTaskForm from './components/add-task-form/AddTaskForm';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <h1 className="app-title">Todo App</h1>
        <div className="app-inner">
          <TaskList />
          <AddTaskForm />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
