import React from 'react';
import TaskItem from './TaskItem';
import './TaskList.css';

function TaskList({ tasks, onToggleComplete, onDeleteTask, onUpdateTask }) {
  return (
    <div className="task-list">
      {tasks.map((task, index) => (
        <TaskItem
          key={task._id}
          task={task}
          index={index}
          onToggleComplete={onToggleComplete}
          onDeleteTask={onDeleteTask}
          onUpdateTask={onUpdateTask}
        />
      ))}
    </div>
  );
}

export default TaskList;
