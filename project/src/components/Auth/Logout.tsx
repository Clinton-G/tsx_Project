import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Logout: React.FC = () => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({
      returnTo: window.location.origin,
    });
  };

  return (
    <div>
      <h1>Logout</h1>
      <button onClick={handleLogout}>Log Out:</button>
    </div>
  );
};

export default Logout;
