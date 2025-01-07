import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import TaskDashboard from './components/TaskDashboard';
import Login from './components/Auth/Login';
import Logout from './components/Auth/Logout';
import Profile from './components/Auth/Profile';
import ProtectedRoute from './components/Auth/ProtectedRoute';

const App: React.FC = () => {
  const { isAuthenticated, isLoading, error } = useAuth0();

  console.log('isLoading:', isLoading);
  console.log('isAuthenticated:', isAuthenticated);
  console.log('Auth0 error:', error);

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
        <Route path="/dashboard" element={<ProtectedRoute element={<TaskDashboard />} />} />
        <Route path="/" element={isAuthenticated ? <TaskDashboard /> : <Login />} />
      </Routes>
    </Router>
  );
};

export default App;
