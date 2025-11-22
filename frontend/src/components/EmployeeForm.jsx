import { useState, useEffect } from 'react';

export default function EmployeeForm({ initial, onSubmit, onCancel }){
  const [form, setForm] = useState(initial || { firstName:'', lastName:'', email:'', phone:'' });
  useEffect(()=> setForm(initial || { firstName:'', lastName:'', email:'', phone:'' }), [initial]);
  return (
    <form onSubmit={(e)=>{e.preventDefault(); onSubmit(form);}} className="space-y-3">
      {['firstName','lastName','email','phone'].map((k)=> (
        <div key={k}>
          <label className="block text-sm font-medium capitalize">{k}</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={form[k]||''}
            onChange={e=>setForm({ ...form, [k]: e.target.value })} />
        </div>
      ))}
      <div className="flex gap-2">
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
        <button type="button" className="px-4 py-2 bg-gray-200 rounded" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}
