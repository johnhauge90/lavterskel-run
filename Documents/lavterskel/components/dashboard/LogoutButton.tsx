'use client';

// Client Component — eneste grunn: kaller Supabase signOut() + router.refresh().

import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { createClient } from '@/app/utils/supabase/client';

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="w-full flex items-center gap-3 px-3 py-2.5 text-neutral-600 hover:bg-red-50 hover:text-red-600 rounded-xl font-medium transition-colors"
    >
      <LogOut className="w-5 h-5 text-neutral-400" />
      Logg ut
    </button>
  );
}
