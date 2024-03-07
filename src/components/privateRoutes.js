import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children, ...rest }) => {
  const token = sessionStorage.getItem('token');
  const location = useLocation();

  return token ? children : <Navigate to="/login" state={{ from: location }} />;
};

export default PrivateRoute;