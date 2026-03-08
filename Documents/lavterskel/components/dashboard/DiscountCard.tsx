// Server Component — partner-rabattkort for høyre feed-kolonne.
// NB: Tag-ikonet bruker blue-50/blue-600 som en bevisst visuell
// differensiering for "belønning"-kategorien. Avvik notert.

import { Tag } from 'lucide-react';

type Props = {
  partnerName: string;
  discountPct: number;
  description: string;
  code: string;
};

export default function DiscountCard({ partnerName, discountPct, description, code }: Props) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-neutral-200/60 shadow-sm">
      <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mb-4">
        <Tag className="w-5 h-5 text-blue-600" />
      </div>
      <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1 block">
        Partner-fordel
      </span>
      <h3 className="text-lg font-bold mb-2">{discountPct}% hos {partnerName}</h3>
      <p className="text-sm text-neutral-500 mb-4">{description}</p>
      <div className="bg-neutral-100 px-4 py-3 rounded-xl border border-neutral-200 font-mono text-center font-bold tracking-widest text-neutral-600">
        {code}
      </div>
    </div>
  );
}
