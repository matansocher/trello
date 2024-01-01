import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '@context';

interface IProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: IProtectedRouteProps) => {
  const { user } = useUser();

  if (!user) {
    return <Navigate to='/login' />;
  }

  return children;
};

export default ProtectedRoute;
