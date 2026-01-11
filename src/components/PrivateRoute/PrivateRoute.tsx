import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const token = sessionStorage.getItem('my-token');
  return token ? <>{children}</> : <Navigate to="/login" replace />;
};

export default PrivateRoute;

