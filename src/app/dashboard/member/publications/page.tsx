"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface Pub { id:string; title:string; authors:string; venue:string; year:number; type:string; doi?:string; link?:string; }
const empty = { title:"", authors:"", venue:"", year:new Date().getFullYear().toString(), type:"CONFERENCE", doi:"", link:"", abstract:"" };

export default function MyPublicationsPage() {
  const { data: session } = useSession();
  const userId = (session?.user as { id?: string })?.id;
  const [items, setItems] = useState<Pub[]>([]);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState<string|null>(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const fetchData = async () => {
    const r = await fetch("/api/publications");
    if(r.ok) {
      const all = await r.json();
      setItems(all.filter((p: Pub & { userId?: string }) => p.userId === userId || true).filter((p: Pub & { userId?: string }) => p.userId === userId));
    }
  };
  useEffect(() => { if(userId) fetchData(); }, [userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setMsg("");
    const res = await fetch(editId?`/api/publications/${editId}`:"/api/publications", { method:editId?"PUT":"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(form) });
    if(res.ok) { setMsg(editId?"Updated!":"Added!"); setForm(empty); setEditId(null); fetchData(); }
    else { const d=await res.json(); setMsg(d.error||"Error"); }
    setLoading(false);
  };

  const inp = "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Publications</h1>
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h2 className="text-lg font-semibold mb-4">{editId?"Edit":"Add"} Publication</h2>
          {msg && <p className={`text-sm mb-3 ${msg.includes("Error")||msg.includes("error")?"text-red-600":"text-green-600"}`}>{msg}</p>}
          <form onSubmit={handleSubmit} className="space-y-3">
            <input className={inp} placeholder="Title *" required value={form.title} onChange={e=>setForm({...form,title:e.target.value})} />
            <input className={inp} placeholder="Authors *" required value={form.authors} onChange={e=>setForm({...form,authors:e.target.value})} />
            <input className={inp} placeholder="Venue *" required value={form.venue} onChange={e=>setForm({...form,venue:e.target.value})} />
            <div className="grid grid-cols-2 gap-3">
              <input className={inp} placeholder="Year" type="number" value={form.year} onChange={e=>setForm({...form,year:e.target.value})} />
              <select className={inp} value={form.type} onChange={e=>setForm({...form,type:e.target.value})}>
                <option value="CONFERENCE">Conference</option>
                <option value="JOURNAL">Journal</option>
                <option value="PREPRINT">Preprint</option>
                <option value="BOOK_CHAPTER">Book Chapter</option>
              </select>
            </div>
            <input className={inp} placeholder="DOI (optional)" value={form.doi} onChange={e=>setForm({...form,doi:e.target.value})} />
            <input className={inp} placeholder="Link (optional)" value={form.link} onChange={e=>setForm({...form,link:e.target.value})} />
            <div className="flex gap-2">
              <button type="submit" disabled={loading} className="flex-1 bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white font-medium py-2 rounded-lg text-sm">{loading?"Saving...":editId?"Update":"Add"}</button>
              {editId && <button type="button" onClick={()=>{setEditId(null);setForm(empty);}} className="px-4 py-2 border rounded-lg text-sm">Cancel</button>}
            </div>
          </form>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h2 className="text-lg font-semibold mb-4">My Publications ({items.length})</h2>
          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
            {items.map(p=>(
              <div key={p.id} className="p-3 bg-gray-50 rounded-lg">
                <p className="font-medium text-gray-800 text-sm">{p.title}</p>
                <p className="text-gray-500 text-xs">{p.venue} · {p.year}</p>
                <div className="flex gap-2 mt-2">
                  <button onClick={()=>{setEditId(p.id);setForm({...empty,...p,year:p.year.toString(),doi:p.doi||"",link:p.link||""});}} className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs">Edit</button>
                  <button onClick={async()=>{if(!confirm("Delete?"))return;await fetch(`/api/publications/${p.id}`,{method:"DELETE"});fetchData();}} className="px-3 py-1 bg-red-100 text-red-700 rounded text-xs">Delete</button>
                </div>
              </div>
            ))}
            {items.length===0 && <p className="text-gray-500 text-sm text-center py-8">No publications yet. Add your first!</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
