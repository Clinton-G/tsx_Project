import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import TaskDashboard from './components/TaskDashboard';
import Login from './components/Auth/Login';
import Logout from './components/Auth/Logout';
import Profile from './components/Auth/Profile';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import TaskForm from './components/TaskForm';
import TaskDetails from './components/TaskDetails';

const App: React.FC = () => {
  const { isAuthenticated, isLoading, error } = useAuth0();

  if (isLoading) {
    return <div>Loading..</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/taskform" element={<TaskForm />} />
        <Route path="/taskdetails/:id" element={<TaskDetails />} />
        <Route path="/dashboard" element={<ProtectedRoute element={<TaskDashboard />} />} />
        <Route path="/" element={isAuthenticated ? <TaskDashboard /> : <Login />} />
      </Routes>
    </Router>
  );
};

export default App;
