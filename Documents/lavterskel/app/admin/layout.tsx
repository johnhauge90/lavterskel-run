import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/app/utils/supabase/server';
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  ArrowLeft,
} from 'lucide-react';

const adminNav = [
  { label: 'Oversikt', href: '/admin', icon: LayoutDashboard },
  { label: 'Kunder', href: '/admin/users', icon: Users },
  { label: 'Meldinger', href: '/admin/messages', icon: MessageSquare },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const adminEmails = (process.env.ADMIN_EMAILS ?? '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  if (!adminEmails.includes((user.email ?? '').toLowerCase())) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen bg-stone-50 flex">
      {/* Sidebar */}
      <aside className="w-56 bg-forest-950 text-white flex flex-col shrink-0">
        <div className="px-6 py-6 border-b border-forest-900">
          <p className="text-xs font-bold text-forest-100/40 uppercase tracking-widest mb-1">Admin</p>
          <p className="font-serif font-bold text-lg text-white truncate">{user.email}</p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {adminNav.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-forest-100/70 hover:text-white hover:bg-forest-900 transition-colors text-sm font-medium"
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-forest-900">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-forest-100/50 hover:text-white text-sm font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Tilbake til app
          </Link>
        </div>
      </aside>

      {/* Innhold */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
