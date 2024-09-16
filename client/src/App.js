import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {Toaster} from 'react-hot-toast'
import axios from 'axios'
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import AddProperty from './components/Property/AddProperty';
import ProtectedRoutes from './services/ProtectedRoutes';

// Set base URL based on environment
const baseURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:8000'
  : '';

axios.defaults.baseURL= baseURL;
axios.defaults.withCredentials=true;

function App() {
  return (
    <Router>
      <Toaster position='top-center' toastOptions={{duration:2000}}/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/dashboard' element={<ProtectedRoutes/>}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
