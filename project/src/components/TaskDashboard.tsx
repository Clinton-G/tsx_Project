import React from 'react';
import { Link } from 'react-router-dom';
import { useTaskContext } from '../context/GlobalState';
import { Task } from '../types/TaskTypes';

const TaskDashboard: React.FC = () => {
  const { state, dispatch } = useTaskContext();

  const handleDelete = (id: string) => {
    dispatch({ type: 'DELETE_TASK', payload: id });
  };

  return (
    <div>
      <h2>Task Dashboard</h2>

      <Link to="/taskform">
        <button>Create New Task:</button>
      </Link>

      <div>
        <h3>Task List</h3>
        {state.tasks.length === 0 ? (
          <p>No tasks avalable. Create one to get started</p>
        ) : (
          state.tasks.map((task: Task) => (
            <div key={task.id} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
              <h4>{task.title}</h4>
              <p>{task.description}</p>
              <p>Status: {task.status}</p>
              <p>Due Date: {task.dueDate}</p>

              <Link to={`/taskdetails/${task.id}`}>
                <button>View Details:</button>
              </Link>

              <Link to={`/taskform?id=${task.id}`}>
                <button>Edit:</button>
              </Link>

              <button onClick={() => handleDelete(task.id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskDashboard;
