import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function MemberDashboard() {
  const session = await auth();
  if (!session) redirect("/login");
  const sessionUser = session.user as { id: string; name?: string | null; role?: string };
  if (sessionUser.role !== "MEMBER") redirect("/dashboard/supervisor");

  let pubCount = 0;
  let user = null;
  try {
    pubCount = await prisma.publication.count({ where: { userId: sessionUser.id } });
    user = await prisma.user.findUnique({ where: { id: sessionUser.id }, select: { name:true, email:true, position:true, bio:true, profileImage:true, researchInterests:true, linkedin:true, googleScholar:true } });
  } catch {}

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome, {user?.name || sessionUser.name}!</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5 mb-8">
        <div className="bg-white rounded-xl p-5 shadow-sm border flex items-center gap-4">
          <div className="bg-purple-500 text-white rounded-lg w-12 h-12 flex items-center justify-center text-xl">📄</div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{pubCount}</p>
            <p className="text-gray-500 text-sm">My Publications</p>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border flex items-center gap-4">
          <div className="bg-blue-500 text-white rounded-lg w-12 h-12 flex items-center justify-center text-xl">👤</div>
          <div>
            <p className="font-semibold text-gray-900">{user?.position || "Member"}</p>
            <p className="text-gray-500 text-sm">{user?.email || sessionUser.id}</p>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Link href="/dashboard/member/profile" className="bg-white rounded-xl p-5 shadow-sm border hover:shadow-md transition-shadow flex items-center gap-3">
          <span className="text-2xl">👤</span>
          <div>
            <p className="font-semibold text-gray-800">Edit My Profile</p>
            <p className="text-sm text-gray-500">Update bio, photo, links</p>
          </div>
        </Link>
        <Link href="/dashboard/member/publications" className="bg-white rounded-xl p-5 shadow-sm border hover:shadow-md transition-shadow flex items-center gap-3">
          <span className="text-2xl">📄</span>
          <div>
            <p className="font-semibold text-gray-800">Manage Publications</p>
            <p className="text-sm text-gray-500">Add or edit your papers</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
