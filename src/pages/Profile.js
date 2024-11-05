import React, { useEffect, useState } from 'react';
import LogoutButton from '../components/LogoutButton';
import Navbar from '../components/Navbar';
import api from '../utils/api';
import ErrorNotification from '../components/ErrorNotification';

export default function Profile() {
    const [user, setUser] = useState({
        userId: '',
        username: '',
        fullname: '',
        email: '',
        createdAt: '',
    });
    const userId = localStorage.getItem('userId'); // Only userId is needed from local storage
    const [error, setError] = useState('');

    const fetchUser = async () => {
        try {
            const response = await api.get(`/users/${userId}`);
            setUser(response.data);
        } catch (error) {
            setError(error.message);
            console.error('An error occurred, please try again', error);
        }
    }

    useEffect(() => {
        fetchUser();
    }, [userId]); // Dependency on userId to refetch if it changes

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <Navbar />
            <div className="flex flex-col items-center justify-center h-full p-6 bg-gray-100">
                {error && <ErrorNotification message={error} />}
                <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
                    <h2 className="mb-4 text-3xl font-semibold text-center text-gray-800">Profile</h2>
                    <img src="https://picsum.photos/200/300" alt="Random" className="w-32 h-32 mx-auto mb-4 rounded-full" />
                    <div className="space-y-2">
                        <p className="text-gray-600"><strong>Full Name:</strong> {user.fullname || "N/A"}</p>
                        <p className="text-gray-600"><strong>Username:</strong> {user.username || "N/A"}</p>
                        <p className="text-gray-600"><strong>Email:</strong> {user.email || "N/A"}</p>
                    </div>

                    <div className="flex items-center justify-center mt-9">
                        {localStorage.getItem('token') && <LogoutButton />}
                    </div>
                </div>


            </div>
        </div>
    );
}
