"use client";
import { useEffect, useState } from "react";

interface Project { id:string; title:string; description:string; status:string; fundingBody?:string; amount?:string; startYear?:number; endYear?:number; }
const empty = { title:"", description:"", status:"ONGOING", fundingBody:"", amount:"", startYear:"", endYear:"" };

export default function ManageProjectsPage() {
  const [items, setItems] = useState<Project[]>([]);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState<string|null>(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const fetchData = async () => { const r = await fetch("/api/projects"); if(r.ok) setItems(await r.json()); };
  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setMsg("");
    const res = await fetch(editId?`/api/projects/${editId}`:"/api/projects", { method:editId?"PUT":"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(form) });
    if(res.ok) { setMsg(editId?"Updated!":"Created!"); setForm(empty); setEditId(null); fetchData(); }
    else { const d=await res.json(); setMsg(d.error||"Error"); }
    setLoading(false);
  };

  const statusColors: Record<string,string> = { ONGOING:"bg-green-100 text-green-700", COMPLETED:"bg-gray-100 text-gray-600", UPCOMING:"bg-blue-100 text-blue-700" };
  const inp = "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Manage Research Projects</h1>
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h2 className="text-lg font-semibold mb-4">{editId?"Edit":"Add"} Project</h2>
          {msg && <p className={`text-sm mb-3 ${msg.includes("Error")||msg.includes("error")?"text-red-600":"text-green-600"}`}>{msg}</p>}
          <form onSubmit={handleSubmit} className="space-y-3">
            <input className={inp} placeholder="Project Title *" required value={form.title} onChange={e=>setForm({...form,title:e.target.value})} />
            <textarea className={inp} placeholder="Description *" rows={3} required value={form.description} onChange={e=>setForm({...form,description:e.target.value})} />
            <select className={inp} value={form.status} onChange={e=>setForm({...form,status:e.target.value})}>
              <option value="ONGOING">Ongoing</option>
              <option value="COMPLETED">Completed</option>
              <option value="UPCOMING">Upcoming</option>
            </select>
            <input className={inp} placeholder="Funding Body (e.g. SERB)" value={form.fundingBody} onChange={e=>setForm({...form,fundingBody:e.target.value})} />
            <input className={inp} placeholder="Amount (e.g. INR 22 Lacs)" value={form.amount} onChange={e=>setForm({...form,amount:e.target.value})} />
            <div className="grid grid-cols-2 gap-3">
              <input className={inp} placeholder="Start Year" type="number" value={form.startYear} onChange={e=>setForm({...form,startYear:e.target.value})} />
              <input className={inp} placeholder="End Year" type="number" value={form.endYear} onChange={e=>setForm({...form,endYear:e.target.value})} />
            </div>
            <div className="flex gap-2">
              <button type="submit" disabled={loading} className="flex-1 bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white font-medium py-2 rounded-lg text-sm">{loading?"Saving...":editId?"Update":"Add Project"}</button>
              {editId && <button type="button" onClick={()=>{setEditId(null);setForm(empty);}} className="px-4 py-2 border border-gray-300 rounded-lg text-sm">Cancel</button>}
            </div>
          </form>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h2 className="text-lg font-semibold mb-4">Projects ({items.length})</h2>
          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
            {items.map((p) => (
              <div key={p.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-medium text-gray-800 text-sm">{p.title}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${statusColors[p.status]||""}`}>{p.status}</span>
                </div>
                {p.fundingBody && <p className="text-gray-500 text-xs mt-1">{p.fundingBody} {p.amount?`· ${p.amount}`:""}</p>}
                {(p.startYear||p.endYear) && <p className="text-gray-400 text-xs">{p.startYear}–{p.endYear||"present"}</p>}
                <div className="flex gap-2 mt-2">
                  <button onClick={()=>{setEditId(p.id);setForm({...empty,...p,startYear:p.startYear?.toString()||"",endYear:p.endYear?.toString()||"",fundingBody:p.fundingBody||"",amount:p.amount||""});}} className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200">Edit</button>
                  <button onClick={async()=>{if(!confirm("Delete?"))return;await fetch(`/api/projects/${p.id}`,{method:"DELETE"});fetchData();}} className="px-3 py-1 bg-red-100 text-red-700 rounded text-xs hover:bg-red-200">Delete</button>
                </div>
              </div>
            ))}
            {items.length===0 && <p className="text-gray-500 text-sm text-center py-8">No projects yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
