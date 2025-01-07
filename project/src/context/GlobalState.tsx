import React, { createContext, useReducer, useContext } from 'react';
import { Task, TaskAction } from '../types/TaskTypes';

interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = { tasks: [] };

const TaskReducer = (state: TaskState, action: TaskAction): TaskState => {
  switch (action.type) {
    case 'ADD_TASK':
      return { tasks: [...state.tasks, action.payload] };
    case 'EDIT_TASK':
      return {
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    case 'DELETE_TASK':
      return { tasks: state.tasks.filter(task => task.id !== action.payload) };
    default:
      return state;
  }
};

const TaskContext = createContext<{
  state: TaskState;
  dispatch: React.Dispatch<TaskAction>;
}>({ state: initialState, dispatch: () => null });

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(TaskReducer, initialState);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => useContext(TaskContext);
