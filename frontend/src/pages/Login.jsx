import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Login(){
  const [form, setForm] = useState({ email:'', password:'' });
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const submit = async (e)=>{
    e.preventDefault(); setErr('');
    try{
      const { data } = await api.post('/auth/login', form);
      localStorage.setItem('token', data.token);
      navigate('/employees');
    }catch(e){ setErr(e.response?.data?.message || 'Failed'); }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-semibold mb-4">Login</h1>
      <form onSubmit={submit} className="space-y-3">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={form.email}
            onChange={e=>setForm({...form,email:e.target.value})} />
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            className="w-full border rounded px-3 py-2"
            value={form.password}
            onChange={e=>setForm({...form,password:e.target.value})} />
        </div>
        {err && <p className="text-red-600 text-sm">{err}</p>}
        <button className="w-full bg-blue-600 text-white rounded py-2">Login</button>
        <p className="text-sm">No account? <Link to="/register" className="text-blue-600">Create one</Link></p>
      </form>
    </div>
  )
}
