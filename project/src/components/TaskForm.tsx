import React, { useState, useEffect } from 'react';
import { useTaskContext } from '../context/GlobalState';
import { Task } from '../types/TaskTypes';
import { v4 as uuid } from 'uuid';
import { useNavigate, useLocation } from 'react-router-dom';

const TaskForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<Task['status']>('Pending');
  const [dueDate, setDueDate] = useState('');
  const { state, dispatch } = useTaskContext();
  const navigate = useNavigate();
  const location = useLocation();

  const taskId = new URLSearchParams(location.search).get('id');
  const taskToEdit = state.tasks.find(task => task.id === taskId);

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setStatus(taskToEdit.status);
      setDueDate(taskToEdit.dueDate);
    }
  }, [taskToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: Task = { id: taskToEdit ? taskToEdit.id : uuid(), title, description, status, dueDate };

    if (taskToEdit) {
      dispatch({ type: 'EDIT_TASK', payload: newTask });
    } else {
      dispatch({ type: 'ADD_TASK', payload: newTask });
    }

    navigate('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <select value={status} onChange={e => setStatus(e.target.value as Task['status'])}>
        <option value="Pending">Pending:</option>
        <option value="In Progress">In Progress:</option>
        <option value="Completed">Completed:</option>
      </select>
      <input
        type="date"
        value={dueDate}
        onChange={e => setDueDate(e.target.value)}
      />
      <button type="submit">{taskToEdit ? 'Update Task' : 'Add Task'}</button>
    </form>
  );
};

export default TaskForm;
