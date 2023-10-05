import { Navigate } from 'react-router';
import { verifyCurrentUserInLocal } from 'utils/Util';

const PrivateRoute = ({ element }) => {
    const isAuthenticated = verifyCurrentUserInLocal();
    return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
