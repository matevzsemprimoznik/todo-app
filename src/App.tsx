import React from 'react';
import './App.scss';
import TaskList from './components/task-list/TaskList';

function App() {
  return (
    <div className="app">
      <h1>Todo App</h1>
      <div className="app-inner">
        <TaskList />
      </div>
    </div>
  );
}

export default App;
