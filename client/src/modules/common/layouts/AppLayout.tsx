import { Navigate, Outlet } from 'react-router-dom';

export const AppLayout = () => {
  const isAuthenticated = true;
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
