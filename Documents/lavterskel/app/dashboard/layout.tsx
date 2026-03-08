import { Calendar, Headphones, Tag, Settings, Activity } from 'lucide-react';
import { redirect } from 'next/navigation';
import LogoutButton from '@/components/dashboard/LogoutButton';
import { createClient } from '@/app/utils/supabase/server';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: userProgram } = await supabase
    .from('user_programs')
    .select('paid_at, payment_status')
    .eq('user_id', user.id)
    .maybeSingle();

  if (!userProgram) {
    redirect('/quiz');
  }

  const hasPaidAccess = Boolean(userProgram.paid_at) || userProgram.payment_status === 'paid';
  if (!hasPaidAccess) {
    redirect('/checkout');
  }

  return (
    <div className="min-h-screen bg-[#F9F9F8] text-neutral-900 font-sans flex">

      {/* SIDEBAR (Desktop) */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-neutral-200/60 fixed h-full z-10">
        <div className="p-6 flex items-center gap-3 border-b border-neutral-200/60">
          <div className="w-8 h-8 bg-neutral-900 rounded-lg flex items-center justify-center">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <span className="font-black tracking-tighter text-xl">LAVTERSKEL</span>
        </div>

        <nav className="flex-1 p-4 space-y-1.5">
          <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest px-3 mb-2 block mt-4">Din trening</span>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 bg-neutral-100/80 text-neutral-900 rounded-xl font-medium transition-colors">
            <Calendar className="w-5 h-5 text-neutral-500" />
            Min Plan
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 rounded-xl font-medium transition-colors">
            <Activity className="w-5 h-5 text-neutral-400" />
            Loggbok
          </a>

          <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest px-3 mb-2 block mt-8">Eksklusivt</span>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 rounded-xl font-medium transition-colors">
            <Headphones className="w-5 h-5 text-neutral-400" />
            Premium Podkast
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 rounded-xl font-medium transition-colors">
            <Tag className="w-5 h-5 text-neutral-400" />
            Rabatter & Nytt
          </a>
        </nav>

        <div className="p-4 border-t border-neutral-200/60 space-y-1.5">
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 rounded-xl font-medium transition-colors">
            <Settings className="w-5 h-5 text-neutral-400" />
            Innstillinger
          </a>
          <LogoutButton />
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 md:ml-64">
        {children}
      </main>

    </div>
  );
}
