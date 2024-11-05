import { useContext } from 'react';
import { AuthContext } from "../context/AuthContext";
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component }) => {
    const { token } = useContext(AuthContext);

    // If token exists, render the component, else redirect to login
    return token ? <Component /> : <Navigate to="/auth/login" replace />;
};

export default ProtectedRoute;
