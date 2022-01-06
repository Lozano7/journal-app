import { Navigate } from 'react-router-dom';
const PublicRoute = ({ children, isLoggedIn }) => {
  return !isLoggedIn ? children : <Navigate to='/' />;
};

export default PublicRoute;
