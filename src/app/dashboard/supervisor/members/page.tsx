"use client";

import { useEffect, useState } from "react";

interface Member {
  id: string; name: string; email: string; position?: string; degree?: string;
  joinYear?: number; bio?: string; profileImage?: string; linkedin?: string;
  googleScholar?: string; researchInterests?: string;
}

const emptyForm = { name: "", email: "", password: "", position: "", degree: "", joinYear: "", bio: "", profileImage: "", linkedin: "", googleScholar: "", researchInterests: "" };

export default function ManageMembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [form, setForm] = useState<typeof emptyForm>(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const fetchMembers = async () => {
    const res = await fetch("/api/members");
    if (res.ok) setMembers(await res.json());
  };

  useEffect(() => { fetchMembers(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setMsg("");
    const url = editId ? `/api/members/${editId}` : "/api/members";
    const method = editId ? "PUT" : "POST";
    const body = editId
      ? { name: form.name, position: form.position, degree: form.degree, joinYear: form.joinYear, bio: form.bio, profileImage: form.profileImage, linkedin: form.linkedin, googleScholar: form.googleScholar, researchInterests: form.researchInterests }
      : form;
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    if (res.ok) { setMsg(editId ? "Updated!" : "Created!"); setForm(emptyForm); setEditId(null); fetchMembers(); }
    else { const d = await res.json(); setMsg(d.error || "Error"); }
    setLoading(false);
  };

  const handleEdit = (m: Member) => {
    setEditId(m.id);
    setForm({ ...emptyForm, name: m.name, email: m.email, position: m.position||"", degree: m.degree||"", joinYear: m.joinYear?.toString()||"", bio: m.bio||"", profileImage: m.profileImage||"", linkedin: m.linkedin||"", googleScholar: m.googleScholar||"", researchInterests: m.researchInterests||"" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this member?")) return;
    const res = await fetch(`/api/members/${id}`, { method: "DELETE" });
    if (res.ok) fetchMembers();
  };

  const inp = "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Manage Members</h1>
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4">{editId ? "Edit Member" : "Add New Member"}</h2>
          {msg && <p className={`text-sm mb-3 ${msg.includes("Error") || msg.includes("error") ? "text-red-600" : "text-green-600"}`}>{msg}</p>}
          <form onSubmit={handleSubmit} className="space-y-3">
            <input className={inp} placeholder="Full Name *" required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
            <input className={inp} placeholder="Email *" type="email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})} disabled={!!editId} />
            {!editId && <input className={inp} placeholder="Password *" type="password" required value={form.password} onChange={e=>setForm({...form,password:e.target.value})} />}
            <input className={inp} placeholder="Position (e.g. PhD Scholar)" value={form.position} onChange={e=>setForm({...form,position:e.target.value})} />
            <input className={inp} placeholder="Degree (e.g. Ph.D)" value={form.degree} onChange={e=>setForm({...form,degree:e.target.value})} />
            <input className={inp} placeholder="Join Year (e.g. 2022)" type="number" value={form.joinYear} onChange={e=>setForm({...form,joinYear:e.target.value})} />
            <input className={inp} placeholder="Profile Image URL" value={form.profileImage} onChange={e=>setForm({...form,profileImage:e.target.value})} />
            <input className={inp} placeholder="LinkedIn URL" value={form.linkedin} onChange={e=>setForm({...form,linkedin:e.target.value})} />
            <input className={inp} placeholder="Google Scholar URL" value={form.googleScholar} onChange={e=>setForm({...form,googleScholar:e.target.value})} />
            <input className={inp} placeholder="Research Interests" value={form.researchInterests} onChange={e=>setForm({...form,researchInterests:e.target.value})} />
            <textarea className={inp} placeholder="Bio" rows={3} value={form.bio} onChange={e=>setForm({...form,bio:e.target.value})} />
            <div className="flex gap-2">
              <button type="submit" disabled={loading} className="flex-1 bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white font-medium py-2 rounded-lg text-sm">
                {loading ? "Saving..." : editId ? "Update Member" : "Add Member"}
              </button>
              {editId && <button type="button" onClick={()=>{setEditId(null);setForm(emptyForm);}} className="px-4 py-2 border border-gray-300 rounded-lg text-sm">Cancel</button>}
            </div>
          </form>
        </div>

        {/* List */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4">Current Members ({members.length})</h2>
          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
            {members.map((m) => (
              <div key={m.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800 text-sm">{m.name}</p>
                  <p className="text-gray-500 text-xs">{m.email}</p>
                  {m.position && <p className="text-blue-600 text-xs">{m.position}</p>}
                </div>
                <div className="flex gap-2">
                  <button onClick={()=>handleEdit(m)} className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium hover:bg-blue-200">Edit</button>
                  <button onClick={()=>handleDelete(m.id)} className="px-3 py-1 bg-red-100 text-red-700 rounded text-xs font-medium hover:bg-red-200">Delete</button>
                </div>
              </div>
            ))}
            {members.length === 0 && <p className="text-gray-500 text-sm text-center py-8">No members yet. Add the first one!</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
