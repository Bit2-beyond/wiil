import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function getStats() {
  try {
    const [members, publications, projects, news, contacts, alumni] = await Promise.all([
      prisma.user.count({ where: { role: "MEMBER" } }),
      prisma.publication.count(),
      prisma.project.count(),
      prisma.news.count(),
      prisma.contactSubmission.count({ where: { read: false } }),
      prisma.alumni.count(),
    ]);
    return { members, publications, projects, news, contacts, alumni };
  } catch {
    return { members: 0, publications: 0, projects: 0, news: 0, contacts: 0, alumni: 0 };
  }
}

export default async function SupervisorDashboard() {
  const session = await auth();
  if (!session) redirect("/login");
  if ((session.user as { role?: string })?.role !== "SUPERVISOR") redirect("/dashboard/member");

  const stats = await getStats();

  const statCards = [
    { label: "Members", value: stats.members, href: "/dashboard/supervisor/members", color: "bg-blue-500", icon: "👥" },
    { label: "Publications", value: stats.publications, href: "/dashboard/supervisor/publications", color: "bg-purple-500", icon: "📄" },
    { label: "Projects", value: stats.projects, href: "/dashboard/supervisor/projects", color: "bg-green-500", icon: "🔬" },
    { label: "News Items", value: stats.news, href: "/dashboard/supervisor/news", color: "bg-orange-500", icon: "📰" },
    { label: "Unread Contacts", value: stats.contacts, href: "/dashboard/supervisor/contacts", color: "bg-red-500", icon: "📬" },
    { label: "Alumni", value: stats.alumni, href: "/dashboard/supervisor/alumni", color: "bg-teal-500", icon: "🎓" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Supervisor Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back, Dr. Biswas. Here&apos;s an overview of WIIL.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        {statCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex items-center gap-4"
          >
            <div className={`${card.color} text-white rounded-lg w-12 h-12 flex items-center justify-center text-xl`}>
              {card.icon}
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{card.value}</p>
              <p className="text-gray-500 text-sm">{card.label}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: "Add Member", href: "/dashboard/supervisor/members", icon: "➕" },
            { label: "Add Publication", href: "/dashboard/supervisor/publications", icon: "📝" },
            { label: "Post News", href: "/dashboard/supervisor/news", icon: "📣" },
            { label: "Add to Gallery", href: "/dashboard/supervisor/gallery", icon: "🖼️" },
          ].map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="flex items-center gap-2 px-4 py-3 bg-blue-50 hover:bg-blue-100 text-blue-800 rounded-lg font-medium text-sm transition-colors"
            >
              <span>{action.icon}</span>
              {action.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
