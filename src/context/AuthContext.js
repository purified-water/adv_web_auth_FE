import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [username, setUsername] = useState(localStorage.getItem('username'));
    const [userId, setUserId] = useState(localStorage.getItem('userId'));

    // Update token in local storage whenever it changes
    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
            localStorage.setItem('username', username);
            localStorage.setItem('userId', userId);
        } else {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            localStorage.removeItem('userId');
        }
    }, [token]);

    // Function to log in and set token
    const login = (newToken, newUsername, newUserId) => {
        setToken(newToken);
        setUsername(newUsername);
        setUserId(newUserId);
    };

    // Function to log out and clear token
    const logout = () => {
        setToken(null);
        setUsername(null);
        setUserId(null);
    };

    // Axios interceptor to set token in headers for protected routes
    useEffect(() => {
        const requestInterceptor = axios.interceptors.request.use((config) => {
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        });
        return () => axios.interceptors.request.eject(requestInterceptor);
    }, [token]);

    return (
        <AuthContext.Provider value={{ token, username, userId, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};