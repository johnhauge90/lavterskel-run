'use client';

// Client Component — eneste grunn: bruker useTransition for optimistisk UI.
// Kalles kun fra WorkoutCard (status === 'active').

import { useTransition } from 'react';
import { CheckCircle2, Circle, Loader2 } from 'lucide-react';
import { markWorkoutComplete } from '@/app/actions/workouts';

type Props = {
  workoutId: string;
};

export default function CompleteButton({ workoutId }: Props) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    startTransition(() => markWorkoutComplete(workoutId));
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="w-full bg-neutral-900 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {isPending ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          Lagrer...
        </>
      ) : (
        <>
          <Circle className="w-5 h-5 text-neutral-400" />
          Marker som fullført
        </>
      )}
    </button>
  );
}
