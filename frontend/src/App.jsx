import { useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import RegisterOrg from './pages/RegisterOrg.jsx';
import Employees from './pages/Employees.jsx';
import Teams from './pages/Teams.jsx';

function Nav(){
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  return (
    <nav className="flex gap-4 p-4 bg-gray-100 border-b">
      <Link to="/employees" className="font-medium">Employees</Link>
      <Link to="/teams" className="font-medium">Teams</Link>
      <button onClick={logout} className="ml-auto px-3 py-1 bg-gray-800 text-white rounded">Logout</button>
    </nav>
  );
}

export default function App(){
  const isAuthed = !!localStorage.getItem('token');
  useEffect(()=>{},[isAuthed]);
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {isAuthed && <Nav />}
      <div className="max-w-5xl mx-auto p-4">
        <Routes>
          <Route path="/" element={isAuthed ? <Employees/> : <Login/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<RegisterOrg/>} />
          <Route path="/employees" element={<Employees/>} />
          <Route path="/teams" element={<Teams/>} />
        </Routes>
      </div>
    </div>
  )
}
