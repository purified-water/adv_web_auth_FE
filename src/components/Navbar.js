import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="flex items-center justify-between p-4 text-white bg-blue-500">
            <h1 className="text-xl font-bold">My App</h1>
            <div>
                <Link to="/" className="mx-4 hover:underline">Home</Link>
                <Link to="/profile" className="mx-4 hover:underline">Profile</Link>
            </div>
        </nav>
    );
};

export default Navbar;
