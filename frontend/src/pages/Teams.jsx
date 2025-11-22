import { useEffect, useState } from 'react';
import api from '../services/api';
import TeamForm from '../components/TeamForm';

export default function Teams(){
  const [teams, setTeams] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [members, setMembers] = useState([]);

  const load = async()=>{
    const t = await api.get('/teams');
    setTeams(t.data);
    const e = await api.get('/employees');
    setEmployees(e.data);
  }
  useEffect(()=>{ load(); },[]);

  const create = async (body)=>{ await api.post('/teams', body); setShowForm(false); load(); }
  const update = async (id, body)=>{ await api.put(`/teams/${id}`, body); setEditing(null); load(); }
  const del = async (id)=>{ if(confirm('Delete team?')){ await api.delete(`/teams/${id}`); load(); } }

  const openMembers = async (team)=>{
    setSelectedTeam(team);
    const { data } = await api.get(`/teams/${team._id}/members`);
    setMembers(data);
  }

  const assign = async (employeeId)=>{
    await api.post(`/teams/${selectedTeam._id}/assign`, { employeeId });
    openMembers(selectedTeam);
  }
  const unassign = async (employeeId)=>{
    await api.post(`/teams/${selectedTeam._id}/unassign`, { employeeId });
    openMembers(selectedTeam);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-semibold">Teams</h1>
        <button onClick={()=>{ setEditing(null); setShowForm(true); }} className="ml-auto px-3 py-2 bg-blue-600 text-white rounded">Add Team</button>
      </div>

      {showForm && (
        <div className="bg-white p-4 rounded shadow">
          <TeamForm onSubmit={create} onCancel={()=>setShowForm(false)} />
        </div>
      )}

      {editing && (
        <div className="bg-white p-4 rounded shadow">
          <TeamForm initial={editing} onSubmit={(body)=>update(editing._id, body)} onCancel={()=>setEditing(null)} />
        </div>
      )}

      <div className="grid gap-3">
        {teams.map(t=> (
          <div key={t._id} className="bg-white p-4 rounded shadow flex items-center gap-3">
            <div className="font-medium">{t.name}</div>
            <div className="text-sm text-gray-600">{t.description}</div>
            <div className="ml-auto flex gap-2">
              <button onClick={()=>openMembers(t)} className="px-3 py-1 bg-indigo-600 text-white rounded">Members</button>
              <button onClick={()=>setEditing(t)} className="px-3 py-1 bg-gray-200 rounded">Edit</button>
              <button onClick={()=>del(t._id)} className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {selectedTeam && (
        <div className="bg-white p-4 rounded shadow">
          <div className="flex items-center">
            <h2 className="text-xl font-semibold">{selectedTeam.name} – Members</h2>
            <button onClick={()=>setSelectedTeam(null)} className="ml-auto px-2 py-1 bg-gray-200 rounded">Close</button>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <h3 className="font-medium mb-2">Current</h3>
              <ul className="space-y-2">
                {members.map(m => (
                  <li key={m._id} className="flex justify-between items-center border rounded px-3 py-2">
                    <span>{m.firstName} {m.lastName}</span>
                    <button className="px-2 py-1 bg-red-600 text-white rounded" onClick={()=>unassign(m._id)}>Remove</button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">Add</h3>
              <ul className="space-y-2">
                {employees.filter(e => !members.find(m => m._id === e._id)).map(e => (
                  <li key={e._id} className="flex justify-between items-center border rounded px-3 py-2">
                    <span>{e.firstName} {e.lastName}</span>
                    <button className="px-2 py-1 bg-green-600 text-white rounded" onClick={()=>assign(e._id)}>Add</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
