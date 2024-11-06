import React, { useEffect, useState, useContext } from 'react';
import LogoutButton from '../components/LogoutButton';
import Navbar from '../components/Navbar';
import { AuthContext } from '../context/AuthContext';

export default function Home() {
  const [usernameFromContext, setUsernameFromContext] = useState();
  const [tokenFromContext, setTokenFromContext] = useState();
  const [loading, setLoading] = useState(true);
  const { token, username } = useContext(AuthContext);

  
  async function FetchToken () {
    setTokenFromContext(token);
    setUsernameFromContext(username);
    setLoading(false);
  }

  useEffect(() => {
    FetchToken();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-screen"><p>Loading...</p></div>;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-col items-center justify-center flex-grow">
        {tokenFromContext ? (
          <>
            <img src="https://picsum.photos/200/300" alt="Random" className="mb-4" />
            <h1 className="mb-4 text-3xl font-bold">Hello, {usernameFromContext || 'Guest'} 👋</h1>
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
