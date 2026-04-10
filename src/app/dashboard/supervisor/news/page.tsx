"use client";
import { useEffect, useState } from "react";

interface NewsItem { id:string; content:string; date:string; }

export default function ManageNewsPage() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [content, setContent] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0,10));
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const fetchData = async () => { const r = await fetch("/api/news"); if(r.ok) setItems(await r.json()); };
  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setMsg("");
    const res = await fetch("/api/news", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({content,date}) });
    if(res.ok) { setMsg("Added!"); setContent(""); fetchData(); } else { setMsg("Error"); }
    setLoading(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Manage News Ticker</h1>
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h2 className="text-lg font-semibold mb-4">Add News Item</h2>
          {msg && <p className={`text-sm mb-3 ${msg==="Error"?"text-red-600":"text-green-600"}`}>{msg}</p>}
          <form onSubmit={handleSubmit} className="space-y-3">
            <input className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" type="date" value={date} onChange={e=>setDate(e.target.value)} />
            <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="News content (shown in ticker) *" rows={4} required value={content} onChange={e=>setContent(e.target.value)} />
            <button type="submit" disabled={loading} className="w-full bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white font-medium py-2 rounded-lg text-sm">{loading?"Adding...":"Add to Ticker"}</button>
          </form>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h2 className="text-lg font-semibold mb-4">Current News ({items.length})</h2>
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
            {items.map((n) => (
              <div key={n.id} className="p-3 bg-gray-50 rounded-lg flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs text-gray-400 mb-1">{n.date}</p>
                  <p className="text-gray-700 text-sm">{n.content}</p>
                </div>
                <button onClick={async()=>{if(!confirm("Delete?"))return;await fetch(`/api/news/${n.id}`,{method:"DELETE"});fetchData();}} className="px-3 py-1 bg-red-100 text-red-700 rounded text-xs hover:bg-red-200 shrink-0">Delete</button>
              </div>
            ))}
            {items.length===0 && <p className="text-gray-500 text-sm text-center py-8">No news items. Add some!</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
