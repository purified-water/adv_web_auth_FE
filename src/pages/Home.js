import React, { useEffect, useState } from 'react';
import LogoutButton from '../components/LogoutButton';
import Navbar from '../components/Navbar';
import { useLocation } from 'react-router-dom';

export default function Home() {
  const [username, setUsername] = useState('');
  const [token, setToken] = useState(null); // Initialize token as null
  const [loading, setLoading] = useState(true); // Loading state
  const location = useLocation(); // Get location object
  const isLoggedIn = location.state?.isLoggedIn;

  useEffect(() => {
    const fetchToken = async () => {
      // Simulate a token fetching process
      const storedToken = localStorage.getItem('token');
      const storedUsername = localStorage.getItem('username');

      await new Promise(resolve => setTimeout(resolve, 500));

      setToken(storedToken);
      if (storedUsername) {
        setUsername(storedUsername);
      }

      setLoading(false);
    };

    fetchToken();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-screen"><p>Loading...</p></div>;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-col items-center justify-center flex-grow">
        {isLoggedIn ? (
          <>
            <img src="https://picsum.photos/200/300" alt="Random" className="mb-4" />
            <h1 className="mb-4 text-3xl font-bold">Hello, {username || 'Guest'} 👋</h1>
            <LogoutButton />
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
