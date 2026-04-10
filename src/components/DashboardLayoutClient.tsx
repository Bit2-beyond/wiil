"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import Image from "next/image";

interface NavItem {
  label: string;
  href: string;
  icon: string;
}

interface DashboardLayoutClientProps {
  children: React.ReactNode;
  name: string;
  role: string;
  navItems: NavItem[];
}

export default function DashboardLayoutClient({ children, name, role, navItems }: DashboardLayoutClientProps) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-950 text-white flex flex-col">
        <div className="p-5 border-b border-blue-800">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-blue-800">
              <Image src="/Will-home-img/Will-logo.jpeg" alt="WIIL" width={32} height={32} className="object-cover" />
            </div>
            <div>
              <p className="font-semibold text-sm leading-tight truncate max-w-[150px]">{name}</p>
              <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${role === "SUPERVISOR" ? "bg-orange-500" : "bg-blue-600"}`}>
                {role}
              </span>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                pathname === item.href || pathname.startsWith(item.href + "/")
                  ? "bg-blue-800 text-white"
                  : "text-blue-200 hover:bg-blue-900 hover:text-white"
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-blue-800 space-y-1">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-blue-200 hover:bg-blue-900 hover:text-white transition-colors"
          >
            <span>🌐</span> View Website
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-300 hover:bg-red-900/30 hover:text-red-200 transition-colors"
          >
            <span>🚪</span> Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
