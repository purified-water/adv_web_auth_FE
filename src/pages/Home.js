import React from 'react';

const LogoutButton = () => {
    const handleLogout = () => {
      localStorage.removeItem('token'); // Delete the token from local storage
      window.location.href = '/user/login'; // Redirect to login page
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
  

export default function Home() {
    const token = localStorage.getItem('token');

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">Hello, User 👋</h1>
            {token && <LogoutButton />}
        </div>
    );
}
