import React, { useEffect, useState } from 'react';
import LogoutButton from '../components/LogoutButton';
import Navbar from '../components/Navbar';

export default function Home() {
  const [username, setUsername] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []); // This effect runs only once after the initial render

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-col items-center justify-center flex-grow">
        <img src="https://picsum.photos/200/300" alt="Random" className="mb-4" />
        <h1 className="mb-4 text-3xl font-bold">Hello, {username || 'Guest'} 👋</h1>
        {token && <LogoutButton />}
      </div>
    </div>
  );
}
