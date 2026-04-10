"use client";
import { useEffect, useState } from "react";

interface Contact { id:string; name:string; email:string; subject:string; message:string; read:boolean; createdAt:string; }

export default function ContactsPage() {
  const [items, setItems] = useState<Contact[]>([]);
  const [filter, setFilter] = useState<"all"|"unread">("unread");

  const fetchData = async () => { const r = await fetch("/api/contact"); if(r.ok) setItems(await r.json()); };
  useEffect(() => { fetchData(); }, []);

  const markRead = async (id:string, read:boolean) => {
    await fetch(`/api/contact/${id}`, { method:"PATCH", headers:{"Content-Type":"application/json"}, body:JSON.stringify({read}) });
    fetchData();
  };
  const del = async (id:string) => { if(!confirm("Delete?"))return; await fetch(`/api/contact/${id}`,{method:"DELETE"}); fetchData(); };

  const filtered = filter==="unread" ? items.filter(i=>!i.read) : items;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Contact Submissions</h1>
        <div className="flex gap-2">
          {(["unread","all"] as const).map(f => (
            <button key={f} onClick={()=>setFilter(f)} className={`px-4 py-1.5 rounded-lg text-sm font-medium ${filter===f?"bg-blue-700 text-white":"bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>{f==="unread"?`Unread (${items.filter(i=>!i.read).length})`:"All"}</button>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        {filtered.map((c) => (
          <div key={c.id} className={`bg-white rounded-xl p-5 shadow-sm border ${c.read?"border-gray-100":"border-blue-200 bg-blue-50/30"}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold text-gray-800">{c.name}</p>
                  {!c.read && <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">New</span>}
                </div>
                <p className="text-sm text-gray-500">{c.email} · {new Date(c.createdAt).toLocaleDateString()}</p>
                <p className="font-medium text-gray-700 mt-2">{c.subject}</p>
                <p className="text-gray-600 text-sm mt-1 whitespace-pre-wrap">{c.message}</p>
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                <button onClick={()=>markRead(c.id,!c.read)} className={`px-3 py-1 rounded text-xs font-medium ${c.read?"bg-gray-100 text-gray-600":"bg-green-100 text-green-700"}`}>{c.read?"Mark Unread":"Mark Read"}</button>
                <button onClick={()=>del(c.id)} className="px-3 py-1 bg-red-100 text-red-700 rounded text-xs font-medium">Delete</button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length===0 && <div className="bg-white rounded-xl p-10 text-center text-gray-500 shadow-sm border">No {filter==="unread"?"unread ":""}messages.</div>}
      </div>
    </div>
  );
}
