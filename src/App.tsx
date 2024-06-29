import React from 'react';
import './App.scss';
import TaskList from './components/task-list/TaskList';
import AddTaskForm from './components/add-task-form/AddTaskForm';

function App() {
  return (
    <div className="app">
      <h1>Todo App</h1>
      <div className="app-inner">
        <TaskList />
        <AddTaskForm />
      </div>
    </div>
  );
}

export default App;
