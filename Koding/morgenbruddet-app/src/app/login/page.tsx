'use client';

import { login, signup } from '../actions';
import { useSearchParams } from 'next/navigation';
import { Bike } from 'lucide-react';

export default function LoginPage() {
  const searchParams = useSearchParams();
  const message = searchParams.get('message');

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 px-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <Bike className="h-16 w-16 text-orange-400" />
        </div>

        {/* Title */}
        <h1 className="mb-8 text-center text-3xl font-bold text-white">
          Velkommen til Morgenbruddet
        </h1>

        {/* Form */}
        <div className="rounded-xl bg-slate-800 p-8">
          <form className="space-y-6">
            {/* Email field */}
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-300">
                E-post
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded-lg bg-slate-900 px-4 py-3 text-white placeholder-gray-500 outline-none ring-2 ring-slate-700 transition-all focus:ring-orange-400"
                placeholder="din@epost.no"
              />
            </div>

            {/* Password field */}
            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-300">
                Passord
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full rounded-lg bg-slate-900 px-4 py-3 text-white placeholder-gray-500 outline-none ring-2 ring-slate-700 transition-all focus:ring-orange-400"
                placeholder="••••••••"
              />
            </div>

            {/* Error message */}
            {message && (
              <div className="rounded-lg bg-red-500/20 p-4 text-center text-red-400">
                {message}
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                formAction={login}
                className="flex-1 rounded-lg bg-orange-400 py-3 font-semibold text-slate-900 transition-colors hover:bg-orange-500"
              >
                Logg inn
              </button>
              <button
                formAction={signup}
                className="flex-1 rounded-lg border-2 border-slate-600 py-3 font-semibold text-gray-200 transition-colors hover:border-slate-500 hover:bg-slate-700"
              >
                Ny bruker
              </button>
            </div>
          </form>
        </div>

        {/* Helper text */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Ved å registrere deg godtar du våre vilkår og personvernregler
        </p>
      </div>
    </div>
  );
}
