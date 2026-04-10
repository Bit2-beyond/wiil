"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

interface GalleryItem { id:string; imageUrl:string; caption?:string; category?:string; }

export default function ManageGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const fetchData = async () => { const r = await fetch("/api/gallery"); if(r.ok) setItems(await r.json()); };
  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setMsg("");
    const res = await fetch("/api/gallery", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({imageUrl,caption,category}) });
    if(res.ok) { setMsg("Added!"); setImageUrl(""); setCaption(""); setCategory(""); fetchData(); } else setMsg("Error");
    setLoading(false);
  };

  const inp = "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Manage Gallery</h1>
      <div className="bg-white rounded-xl p-6 shadow-sm border mb-8">
        <h2 className="text-lg font-semibold mb-4">Add Image</h2>
        {msg && <p className={`text-sm mb-3 ${msg==="Error"?"text-red-600":"text-green-600"}`}>{msg}</p>}
        <form onSubmit={handleSubmit} className="grid sm:grid-cols-3 gap-3 items-end">
          <input className={inp} placeholder="Image URL *" required value={imageUrl} onChange={e=>setImageUrl(e.target.value)} />
          <input className={inp} placeholder="Caption (optional)" value={caption} onChange={e=>setCaption(e.target.value)} />
          <input className={inp} placeholder="Category (optional)" value={category} onChange={e=>setCategory(e.target.value)} />
          <button type="submit" disabled={loading} className="sm:col-span-3 bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white font-medium py-2 rounded-lg text-sm">{loading?"Adding...":"Add to Gallery"}</button>
        </form>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((g) => (
          <div key={g.id} className="relative group rounded-xl overflow-hidden bg-gray-100 aspect-square">
            <Image src={g.imageUrl} alt={g.caption||"Gallery"} fill className="object-cover" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <button onClick={async()=>{if(!confirm("Delete?"))return;await fetch(`/api/gallery/${g.id}`,{method:"DELETE"});fetchData();}} className="px-3 py-1 bg-red-500 text-white rounded text-xs">Delete</button>
            </div>
            {g.caption && <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2"><p className="text-white text-xs truncate">{g.caption}</p></div>}
          </div>
        ))}
        {items.length===0 && <div className="col-span-full text-center py-12 text-gray-500">No gallery images yet.</div>}
      </div>
    </div>
  );
}
