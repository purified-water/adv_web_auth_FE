import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import GuestRoute from './components/GuestRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ProtectedRoute component={Home} />} />
          <Route path="/profile" element={<ProtectedRoute component={Profile} />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/login" element={<GuestRoute component={Login} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
