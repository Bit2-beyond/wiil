import { auth } from "@/auth";
import { redirect } from "next/navigation";
import DashboardLayoutClient from "@/components/DashboardLayoutClient";

const supervisorNav = [
  { label: "Overview", href: "/dashboard/supervisor", icon: "📊" },
  { label: "Members", href: "/dashboard/supervisor/members", icon: "👥" },
  { label: "Publications", href: "/dashboard/supervisor/publications", icon: "📄" },
  { label: "Projects", href: "/dashboard/supervisor/projects", icon: "🔬" },
  { label: "News", href: "/dashboard/supervisor/news", icon: "📰" },
  { label: "Gallery", href: "/dashboard/supervisor/gallery", icon: "🖼️" },
  { label: "Alumni", href: "/dashboard/supervisor/alumni", icon: "🎓" },
  { label: "Contacts", href: "/dashboard/supervisor/contacts", icon: "📬" },
];

const memberNav = [
  { label: "Overview", href: "/dashboard/member", icon: "📊" },
  { label: "My Profile", href: "/dashboard/member/profile", icon: "👤" },
  { label: "My Publications", href: "/dashboard/member/publications", icon: "📄" },
];

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) redirect("/login");

  const user = session.user as { id: string; name?: string | null; role?: string };
  const role = user.role || "MEMBER";
  const navItems = role === "SUPERVISOR" ? supervisorNav : memberNav;

  return (
    <DashboardLayoutClient name={user.name || "User"} role={role} navItems={navItems}>
      {children}
    </DashboardLayoutClient>
  );
}
