import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import { useEffect } from 'react';

function App() {
  // Check for token in local storage
  const token = localStorage.getItem('token');
  console.log(token);

  return (
    <Router>
      <Routes>
        <Route path="/" element={token ? <Home /> : <Navigate to="/user/login" replace />} />
        <Route path="/user/register" element={<Register />} />
        <Route path="/user/login" element={!token ? <Login /> : <Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
