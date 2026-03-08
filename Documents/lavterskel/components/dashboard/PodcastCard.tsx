// Server Component — premium podkast-episode for høyre feed-kolonne.

import { Headphones, PlayCircle } from 'lucide-react';

type Props = {
  episodeTitle: string;
  episodeDescription: string;
  durationMin: number;
};

export default function PodcastCard({ episodeTitle, episodeDescription, durationMin }: Props) {
  return (
    <div className="bg-neutral-900 text-white p-6 rounded-3xl shadow-md">
      <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mb-4">
        <Headphones className="w-5 h-5 text-white" />
      </div>
      <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1 block">
        Premium Episode
      </span>
      <h3 className="text-lg font-bold mb-2">{episodeTitle}</h3>
      <p className="text-sm text-neutral-400 mb-6">{episodeDescription}</p>
      <button className="flex items-center gap-2 text-sm font-bold hover:text-neutral-300 transition-colors">
        <PlayCircle className="w-5 h-5" />
        Spill av ({durationMin} min)
      </button>
    </div>
  );
}
