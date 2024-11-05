import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const GuestRoute = ({ component: Component }) => {
    const { token } = useContext(AuthContext);

    return !token ? <Component /> : <Navigate to="/" replace />;
};

export default GuestRoute;
