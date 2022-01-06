import { Navigate, useLocation } from 'react-router-dom';
const PrivateRoute = ({ children, isLoggedIn }) => {
  const { pathname, search } = useLocation();

  localStorage.setItem('lastPath', pathname + search);

  return isLoggedIn ? children : <Navigate to='/auth/login' />;
};

export default PrivateRoute;
