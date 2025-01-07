import React from 'react';
import { useParams } from 'react-router-dom';
import { useTaskContext } from '../context/GlobalState';

const TaskDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { state } = useTaskContext();
  const task = state.tasks.find(task => task.id === id);

  if (!task) return <div>Task Nit Found</div>;

  return (
    <div>
      <h1>{task.title}</h1>
      <p>{task.description}</p>
      <p>Status: {task.status}</p>
      <p>Due Date: {task.dueDate}</p>
    </div>
  );
};

export default TaskDetails;
