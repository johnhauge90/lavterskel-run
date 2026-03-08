import { createAdminClient } from '@/app/utils/supabase/admin';
import { createClient } from '@/app/utils/supabase/server';
import BroadcastForm from './BroadcastForm';
import { MessageSquare, CheckCircle2 } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminMessagesPage() {
  const supabase = await createClient();
  const admin = createAdminClient();

  const { data: { user } } = await supabase.auth.getUser();

  const { data: messages } = await admin
    .from('broadcast_messages')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(20);

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="font-serif text-4xl font-bold text-stone-900 mb-2">Meldinger</h1>
        <p className="text-stone-500">
          Aktive meldinger vises som en banner på alle brukeres dashboard. Én aktiv melding om gangen anbefales.
        </p>
      </div>

      {/* Ny melding */}
      <section className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm mb-8">
        <div className="flex items-center gap-2 mb-6">
          <MessageSquare className="w-5 h-5 text-forest-700" />
          <h2 className="font-bold text-stone-900">Send ny kunngjøring</h2>
        </div>
        <BroadcastForm adminUserId={user?.id ?? ''} />
      </section>

      {/* Meldingshistorikk */}
      <section>
        <h2 className="font-bold text-stone-700 mb-4">Sendte meldinger</h2>
        {!messages?.length ? (
          <p className="text-sm text-stone-400 italic">Ingen meldinger sendt ennå.</p>
        ) : (
          <div className="space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`border rounded-2xl p-5 shadow-sm ${msg.is_active ? 'bg-forest-50 border-forest-200' : 'bg-white border-stone-200 opacity-60'}`}
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex items-center gap-2">
                    {msg.is_active && (
                      <span className="inline-flex items-center gap-1 bg-forest-900 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3" /> Aktiv
                      </span>
                    )}
                    <h3 className="font-bold text-stone-900 text-sm">{msg.title}</h3>
                  </div>
                  <span className="text-xs text-stone-400 shrink-0">
                    {new Date(msg.created_at).toLocaleDateString('nb-NO', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>
                <p className="text-sm text-stone-600">{msg.body}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
