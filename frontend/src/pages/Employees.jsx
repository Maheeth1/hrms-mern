import { useEffect, useState } from 'react';
import api from '../services/api';
import EmployeeForm from '../components/EmployeeForm';

export default function Employees(){
  const [list, setList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const load = async()=>{
    const { data } = await api.get('/employees');
    setList(data);
  }
  useEffect(()=>{ load(); },[]);

  const create = async (body)=>{ await api.post('/employees', body); setShowForm(false); load(); }
  const update = async (id, body)=>{ await api.put(`/employees/${id}`, body); setEditing(null); load(); }
  const del = async (id)=>{ if(confirm('Delete employee?')){ await api.delete(`/employees/${id}`); load(); } }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-semibold">Employees</h1>
        <button onClick={()=>{ setEditing(null); setShowForm(true); }} className="ml-auto px-3 py-2 bg-blue-600 text-white rounded">Add Employee</button>
      </div>

      {showForm && (
        <div className="bg-white p-4 rounded shadow">
          <EmployeeForm onSubmit={create} onCancel={()=>setShowForm(false)} />
        </div>
      )}

      {editing && (
        <div className="bg-white p-4 rounded shadow">
          <EmployeeForm initial={editing} onSubmit={(body)=>update(editing._id, body)} onCancel={()=>setEditing(null)} />
        </div>
      )}

      <div className="grid gap-3">
        {list.map(e=> (
          <div key={e._id} className="bg-white p-4 rounded shadow flex items-center gap-3">
            <div className="font-medium">{e.firstName} {e.lastName}</div>
            <div className="text-sm text-gray-600">{e.email}</div>
            <div className="text-sm text-gray-600">{e.phone}</div>
            <div className="ml-auto flex gap-2">
              <button onClick={()=>setEditing(e)} className="px-3 py-1 bg-gray-200 rounded">Edit</button>
              <button onClick={()=>del(e._id)} className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
