"use client";
import { useEffect, useState } from "react";

interface Alumni { id:string; name:string; degree:string; yearStart?:number; yearEnd?:number; currentPosition?:string; email?:string; imageUrl?:string; }
const empty = { name:"", degree:"", yearStart:"", yearEnd:"", currentPosition:"", email:"", imageUrl:"" };

export default function ManageAlumniPage() {
  const [items, setItems] = useState<Alumni[]>([]);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState<string|null>(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const fetchData = async () => { const r = await fetch("/api/alumni"); if(r.ok) setItems(await r.json()); };
  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setMsg("");
    const res = await fetch(editId?`/api/alumni/${editId}`:"/api/alumni", { method:editId?"PUT":"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(form) });
    if(res.ok) { setMsg(editId?"Updated!":"Created!"); setForm(empty); setEditId(null); fetchData(); }
    else { const d=await res.json(); setMsg(d.error||"Error"); }
    setLoading(false);
  };

  const inp = "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Manage Alumni</h1>
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h2 className="text-lg font-semibold mb-4">{editId?"Edit":"Add"} Alumni</h2>
          {msg && <p className={`text-sm mb-3 ${msg.includes("Error")||msg.includes("error")?"text-red-600":"text-green-600"}`}>{msg}</p>}
          <form onSubmit={handleSubmit} className="space-y-3">
            <input className={inp} placeholder="Full Name *" required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
            <input className={inp} placeholder="Degree (e.g. Ph.D) *" required value={form.degree} onChange={e=>setForm({...form,degree:e.target.value})} />
            <div className="grid grid-cols-2 gap-3">
              <input className={inp} placeholder="Year Start" type="number" value={form.yearStart} onChange={e=>setForm({...form,yearStart:e.target.value})} />
              <input className={inp} placeholder="Year End" type="number" value={form.yearEnd} onChange={e=>setForm({...form,yearEnd:e.target.value})} />
            </div>
            <input className={inp} placeholder="Current Position" value={form.currentPosition} onChange={e=>setForm({...form,currentPosition:e.target.value})} />
            <input className={inp} placeholder="Email" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
            <input className={inp} placeholder="Photo URL (optional)" value={form.imageUrl} onChange={e=>setForm({...form,imageUrl:e.target.value})} />
            <div className="flex gap-2">
              <button type="submit" disabled={loading} className="flex-1 bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white font-medium py-2 rounded-lg text-sm">{loading?"Saving...":editId?"Update":"Add Alumni"}</button>
              {editId && <button type="button" onClick={()=>{setEditId(null);setForm(empty);}} className="px-4 py-2 border border-gray-300 rounded-lg text-sm">Cancel</button>}
            </div>
          </form>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h2 className="text-lg font-semibold mb-4">Alumni ({items.length})</h2>
          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
            {items.map((a) => (
              <div key={a.id} className="p-3 bg-gray-50 rounded-lg flex items-start justify-between gap-2">
                <div>
                  <p className="font-medium text-sm">{a.name}</p>
                  <p className="text-blue-600 text-xs">{a.degree} {a.yearStart?`[${a.yearStart}–${a.yearEnd||""}]`:""}</p>
                  {a.currentPosition && <p className="text-gray-500 text-xs">{a.currentPosition}</p>}
                </div>
                <div className="flex gap-2">
                  <button onClick={()=>{setEditId(a.id);setForm({...empty,...a,yearStart:a.yearStart?.toString()||"",yearEnd:a.yearEnd?.toString()||"",currentPosition:a.currentPosition||"",email:a.email||"",imageUrl:a.imageUrl||""});}} className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs">Edit</button>
                  <button onClick={async()=>{if(!confirm("Delete?"))return;await fetch(`/api/alumni/${a.id}`,{method:"DELETE"});fetchData();}} className="px-3 py-1 bg-red-100 text-red-700 rounded text-xs">Delete</button>
                </div>
              </div>
            ))}
            {items.length===0 && <p className="text-gray-500 text-sm text-center py-8">No alumni records.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
