'use client';

// Quiz-funnel: 3 steg → program-match → kjøp → /login?mode=registrer
// Programdata (navn, pris, varighet) kommer fra registry som singel kilde til sannhet.
// "Kjøp nå"-knapp er Link til /login?mode=registrer — ingen dead state.

import { useState } from 'react';
import Link from 'next/link';
import { PROGRAMS, type ProgramSlug } from '@/lib/programs/registry';
import {
  ArrowRight,
  Sofa,
  Footprints,
  Flame,
  ShieldCheck,
  Timer,
  Trophy,
  CheckCircle2,
} from 'lucide-react';

type Level = 'sofa' | 'jogger' | 'aktiv';
type Goal = 'skadefri' | '5km' | 'halvmaraton';

const DEFAULT_PROGRAM_SLUG: ProgramSlug = 'sofa-5km';

function resolveProgramSlug(level: Level | '', goal: Goal | ''): ProgramSlug {
  if (!level || !goal) return DEFAULT_PROGRAM_SLUG;
  return `${level}-${goal}` as ProgramSlug;
}

export default function QuizPage() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<{ level: Level | ''; goal: Goal | '' }>({
    level: '',
    goal: '',
  });

  const handleSelect = (category: 'level', value: Level): void => {
    setAnswers({ ...answers, [category]: value });
    setTimeout(() => setStep(step + 1), 300);
  };

  const handleGoalSelect = (value: Goal): void => {
    setAnswers({ ...answers, goal: value });
    setTimeout(() => setStep(step + 1), 300);
  };

  const selectedProgramSlug = resolveProgramSlug(answers.level, answers.goal);
  const program = PROGRAMS[selectedProgramSlug];

  return (
    <main className="min-h-[80vh] bg-white flex items-center justify-center py-24 px-4">
      <div className="max-w-2xl w-full">

        {/* Fremdriftsindikator */}
        <div className="mb-12 flex items-center justify-center gap-2">
          <div className={`h-1.5 rounded-full transition-all duration-500 ${step >= 1 ? 'w-12 bg-forest-900' : 'w-4 bg-stone-200'}`} />
          <div className={`h-1.5 rounded-full transition-all duration-500 ${step >= 2 ? 'w-12 bg-forest-900' : 'w-4 bg-stone-200'}`} />
          <div className={`h-1.5 rounded-full transition-all duration-500 ${step >= 3 ? 'w-12 bg-forest-900' : 'w-4 bg-stone-200'}`} />
        </div>

        {/* STEG 1: Utgangspunkt */}
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-center mb-4">
              Hva er utgangspunktet ditt?
            </h1>
            <p className="text-stone-500 text-center mb-10 text-lg">Vær helt ærlig. Vi dømmer ingen!</p>

            <div className="space-y-4">
              <button
                onClick={() => handleSelect('level', 'sofa')}
                className="w-full bg-white border border-stone-200 hover:border-forest-900 p-6 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-6 group text-left"
              >
                <div className="w-14 h-14 bg-stone-100 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-forest-900 transition-colors">
                  <Sofa className="w-7 h-7 text-stone-500 group-hover:text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">Rett fra sofaen</h3>
                  <p className="text-stone-500 text-sm">Jeg har knapt løpt en meter det siste året.</p>
                </div>
              </button>

              <button
                onClick={() => handleSelect('level', 'jogger')}
                className="w-full bg-white border border-stone-200 hover:border-forest-900 p-6 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-6 group text-left"
              >
                <div className="w-14 h-14 bg-stone-100 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-forest-900 transition-colors">
                  <Footprints className="w-7 h-7 text-stone-500 group-hover:text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">Jogger litt i blant</h3>
                  <p className="text-stone-500 text-sm">Jeg tar meg en tur når jeg har lyst, men mangler struktur.</p>
                </div>
              </button>

              <button
                onClick={() => handleSelect('level', 'aktiv')}
                className="w-full bg-white border border-stone-200 hover:border-forest-900 p-6 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-6 group text-left"
              >
                <div className="w-14 h-14 bg-stone-100 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-forest-900 transition-colors">
                  <Flame className="w-7 h-7 text-stone-500 group-hover:text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">Løper ganske jevnt</h3>
                  <p className="text-stone-500 text-sm">Jeg kan løpe 5km greit, men vil bli raskere eller løpe lengre.</p>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* STEG 2: Målet */}
        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-center mb-4">
              Hva er drømmemålet?
            </h1>
            <p className="text-stone-500 text-center mb-10 text-lg">Hvorfor skal du snøre på deg skoene?</p>

            <div className="space-y-4">
              <button
                onClick={() => handleGoalSelect('skadefri')}
                className="w-full bg-white border border-stone-200 hover:border-forest-900 p-6 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-6 group text-left"
              >
                <div className="w-14 h-14 bg-stone-100 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-forest-900 transition-colors">
                  <ShieldCheck className="w-7 h-7 text-stone-500 group-hover:text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">Trygg &amp; skadefri start</h3>
                  <p className="text-stone-500 text-sm">Jeg vil bare komme i gang uten å få vondt i knærne.</p>
                </div>
              </button>

              <button
                onClick={() => handleGoalSelect('5km')}
                className="w-full bg-white border border-stone-200 hover:border-forest-900 p-6 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-6 group text-left"
              >
                <div className="w-14 h-14 bg-stone-100 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-forest-900 transition-colors">
                  <Timer className="w-7 h-7 text-stone-500 group-hover:text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">Mestre 5 km eller 10 km</h3>
                  <p className="text-stone-500 text-sm">Jeg vil bygge kondisjon for å klare distansen med et smil.</p>
                </div>
              </button>

              <button
                onClick={() => handleGoalSelect('halvmaraton')}
                className="w-full bg-white border border-stone-200 hover:border-forest-900 p-6 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-6 group text-left"
              >
                <div className="w-14 h-14 bg-stone-100 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-forest-900 transition-colors">
                  <Trophy className="w-7 h-7 text-stone-500 group-hover:text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">Gjennomføre Halvmaraton</h3>
                  <p className="text-stone-500 text-sm">Jeg har satt meg et hårete mål og trenger en skuddsikker plan.</p>
                </div>
              </button>
            </div>

            <button
              onClick={() => setStep(1)}
              className="mt-8 text-stone-400 hover:text-stone-900 text-sm font-bold w-full text-center"
            >
              ← Gå tilbake
            </button>
          </div>
        )}

        {/* STEG 3: Resultatet (Salgspitchen) */}
        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-forest-100 rounded-full mb-6">
              <CheckCircle2 className="w-10 h-10 text-forest-700" />
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Vi har programmet ditt.
            </h1>
            <p className="text-stone-500 mb-10 text-lg max-w-md mx-auto">
              Basert på dine svar har vi funnet opplegget som vil gi deg best mulig progresjon og minst mulig skaderisiko.
            </p>

            <div className="bg-forest-900 text-white p-8 md:p-12 rounded-2xl text-left relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-forest-800 rounded-full blur-3xl opacity-40 -translate-y-1/2 translate-x-1/4" />

              <div className="flex items-center gap-3 mb-2 relative z-10">
                <span className="text-xs font-bold text-forest-100 uppercase tracking-widest">
                  Din match
                </span>
                <span className="text-xs font-medium text-forest-100/60 bg-forest-800 px-2 py-0.5 rounded-full">
                  {program.weeks} uker
                </span>
              </div>

              <h2 className="font-serif text-3xl font-bold mb-4 relative z-10">{program.name}</h2>
              <p className="text-forest-100/80 mb-8 relative z-10">{program.description}</p>

              <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10">
                <Link
                  href={`/login?mode=registrer&program=${selectedProgramSlug}`}
                  className="w-full sm:w-auto bg-white text-forest-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-stone-100 transition-colors flex items-center justify-center gap-2"
                >
                  Kjøp nå – {program.price},-
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <span className="text-forest-100/60 text-sm font-medium">Engangssum. Ekte resultater.</span>
              </div>
            </div>

            <button
              onClick={() => { setStep(1); setAnswers({ level: '', goal: '' }); }}
              className="mt-8 text-stone-400 hover:text-stone-900 text-sm font-bold"
            >
              ← Start quizen på nytt
            </button>
          </div>
        )}

      </div>
    </main>
  );
}
