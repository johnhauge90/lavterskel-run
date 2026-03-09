import Link from "next/link";
import { Bike, Calendar, TrendingUp, Coffee, User } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menuItems = [
    {
      id: "tours",
      label: "Turer",
      icon: Calendar,
      href: "/dashboard/turer",
      active: true,
    },
    {
      id: "progress",
      label: "Min Progresjon",
      icon: TrendingUp,
      href: "/dashboard/progresjon",
      active: false,
    },
    {
      id: "coffee",
      label: "Kaffe-klippekort",
      icon: Coffee,
      href: "/dashboard/kaffe",
      active: false,
    },
  ];

  return (
    <div className="flex min-h-screen bg-slate-900">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col bg-slate-800">
        {/* Logo */}
        <div className="flex h-20 items-center justify-center border-b border-slate-700">
          <Bike className="h-10 w-10 text-orange-400" />
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                      item.active
                        ? "bg-orange-400/10 text-orange-400"
                        : "text-gray-400 hover:bg-slate-700 hover:text-gray-200"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Profile */}
        <div className="border-t border-slate-700 p-4">
          <Link
            href="/dashboard/profil"
            className="flex items-center justify-center"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-700 text-gray-400 transition-colors hover:bg-slate-600 hover:text-gray-200">
              <User className="h-5 w-5" />
            </div>
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-64 flex-1">
        {children}
      </main>
    </div>
  );
}
