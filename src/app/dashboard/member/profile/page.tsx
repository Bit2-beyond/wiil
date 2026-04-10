"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session } = useSession();
  const userId = (session?.user as { id?: string })?.id;
  const [form, setForm] = useState({ name:"", bio:"", profileImage:"", linkedin:"", googleScholar:"", researchInterests:"", position:"", degree:"", joinYear:"" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!userId) return;
    fetch(`/api/members/${userId}`).then(r=>r.json()).then(d=>{
      setForm({ name:d.name||"", bio:d.bio||"", profileImage:d.profileImage||"", linkedin:d.linkedin||"", googleScholar:d.googleScholar||"", researchInterests:d.researchInterests||"", position:d.position||"", degree:d.degree||"", joinYear:d.joinYear?.toString()||"" });
    });
  }, [userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setMsg("");
    const res = await fetch(`/api/members/${userId}`, { method:"PUT", headers:{"Content-Type":"application/json"}, body:JSON.stringify(form) });
    setMsg(res.ok ? "Profile updated!" : "Error updating profile.");
    setLoading(false);
  };

  const inp = "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h1>
      <div className="max-w-2xl bg-white rounded-xl p-6 shadow-sm border">
        {msg && <p className={`text-sm mb-4 ${msg.includes("Error")?"text-red-600":"text-green-600"}`}>{msg}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="block text-xs font-medium text-gray-500 mb-1">Full Name</label><input className={inp} value={form.name} onChange={e=>setForm({...form,name:e.target.value})} /></div>
            <div><label className="block text-xs font-medium text-gray-500 mb-1">Position</label><input className={inp} placeholder="e.g. PhD Scholar" value={form.position} onChange={e=>setForm({...form,position:e.target.value})} /></div>
            <div><label className="block text-xs font-medium text-gray-500 mb-1">Degree</label><input className={inp} placeholder="e.g. Ph.D" value={form.degree} onChange={e=>setForm({...form,degree:e.target.value})} /></div>
            <div><label className="block text-xs font-medium text-gray-500 mb-1">Join Year</label><input className={inp} type="number" placeholder="e.g. 2022" value={form.joinYear} onChange={e=>setForm({...form,joinYear:e.target.value})} /></div>
          </div>
          <div><label className="block text-xs font-medium text-gray-500 mb-1">Profile Photo URL</label><input className={inp} placeholder="https://..." value={form.profileImage} onChange={e=>setForm({...form,profileImage:e.target.value})} /></div>
          <div><label className="block text-xs font-medium text-gray-500 mb-1">Research Interests</label><input className={inp} placeholder="6G, RIS, ML..." value={form.researchInterests} onChange={e=>setForm({...form,researchInterests:e.target.value})} /></div>
          <div><label className="block text-xs font-medium text-gray-500 mb-1">LinkedIn URL</label><input className={inp} placeholder="https://linkedin.com/in/..." value={form.linkedin} onChange={e=>setForm({...form,linkedin:e.target.value})} /></div>
          <div><label className="block text-xs font-medium text-gray-500 mb-1">Google Scholar URL</label><input className={inp} placeholder="https://scholar.google.com/..." value={form.googleScholar} onChange={e=>setForm({...form,googleScholar:e.target.value})} /></div>
          <div><label className="block text-xs font-medium text-gray-500 mb-1">Bio</label><textarea className={inp} rows={4} placeholder="A short bio about yourself..." value={form.bio} onChange={e=>setForm({...form,bio:e.target.value})} /></div>
          <button type="submit" disabled={loading} className="w-full bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white font-medium py-2.5 rounded-lg text-sm">{loading?"Saving...":"Save Profile"}</button>
        </form>
      </div>
    </div>
  );
}
