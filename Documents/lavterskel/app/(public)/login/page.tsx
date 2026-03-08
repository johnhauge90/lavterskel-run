// Server Component — minimal wrapper.
// LoginForm er "use client" med useSearchParams → krever Suspense-grense her.
// ?mode=registrer sendes med i URL fra quiz-funnelen for å pre-velge registreringsskjema.

import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-[80vh] bg-[#FAFAFA] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-neutral-400" />
        </main>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
