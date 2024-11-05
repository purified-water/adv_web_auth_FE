import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"

export default function LogoutButton() {
    const { logout } = useContext(AuthContext);
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
        logout();
        window.location.href = '/auth/login';
    };

    return (
        <button
            onClick={handleLogout}
            className="px-4 py-2 font-semibold text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none"
        >
            Logout
        </button>
    );
};