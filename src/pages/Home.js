import React, { useEffect, useState } from 'react';
import LogoutButton from '../components/LogoutButton';
import Navbar from '../components/Navbar';

export default function Home() {
  const [username, setUsername] = useState('');
  const [token, setToken] = useState();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    setToken(localStorage.getItem('token'));

    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []); // This effect runs only once after the initial render

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-col items-center justify-center flex-grow">
        {token ? (
          <>
            <img src="https://picsum.photos/200/300" alt="Random" className="mb-4" />
            <h1 className="mb-4 text-3xl font-bold">Hello, {username || 'Guest'} 👋</h1>
            <LogoutButton/>
          </>
        ) : (
          <>
            <h1 className="mb-4 text-3xl font-bold">Welcome to our website! 👋</h1>
            <p className="mb-4 text-lg text-gray-600">Please login to access your profile.</p>
            <a href="/auth/login" className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none">Login</a>
          </>
        )}
      </div>
    </div>
  );
}
