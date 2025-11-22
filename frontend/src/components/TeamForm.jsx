import { useState, useEffect } from 'react';

export default function TeamForm({ initial, onSubmit, onCancel }){
  const [form, setForm] = useState(initial || { name:'', description:'' });
  useEffect(()=> setForm(initial || { name:'', description:'' }), [initial]);
  return (
    <form onSubmit={(e)=>{e.preventDefault(); onSubmit(form);}} className="space-y-3">
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          className="w-full border rounded px-3 py-2"
          value={form.name||''}
          onChange={e=>setForm({ ...form, name: e.target.value })} />
      </div>
      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea
          className="w-full border rounded px-3 py-2"
          value={form.description||''}
          onChange={e=>setForm({ ...form, description: e.target.value })} />
      </div>
      <div className="flex gap-2">
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
        <button type="button" className="px-4 py-2 bg-gray-200 rounded" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}
