import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function RegisterOrg(){
  const [form, setForm] = useState({ orgName:'', adminName:'', email:'', password:'' });
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const submit = async (e)=>{
    e.preventDefault(); setErr('');
    try{
      const { data } = await api.post('/auth/register', form);
      localStorage.setItem('token', data.token);
      navigate('/employees');
    }catch(e){ setErr(e.response?.data?.message || 'Failed'); }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-semibold mb-4">Create Organisation</h1>
      <form onSubmit={submit} className="space-y-3">
        {['orgName','adminName','email','password'].map((k)=> (
          <div key={k}>
            <label className="block text-sm font-medium capitalize">{k}</label>
            <input
              type={k==='password'?'password':'text'}
              value={form[k]}
              onChange={e=>setForm({...form,[k]:e.target.value})}
              className="w-full border rounded px-3 py-2"
              required />
          </div>
        ))}
        {err && <p className="text-red-600 text-sm">{err}</p>}
        <button className="w-full bg-blue-600 text-white rounded py-2">Register</button>
        <p className="text-sm">Already have an account? <Link to="/login" className="text-blue-600">Login</Link></p>
      </form>
    </div>
  )
}
