import { ArrowRight, MapPin, Trophy, Instagram, Youtube, Headphones, Megaphone, CheckCircle2, Play } from 'lucide-react';
import HeadphonesIcon from '@/components/icons/HeadphonesIcon';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-neutral-900 selection:text-white pb-20">

      {/* --- HERO: 50/50 SPLIT (Minimalistisk Sanna-stil) --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Venstre: Podkast-universet */}
          <div className="bg-[#F7F7F5] p-10 md:p-14 rounded-3xl border border-neutral-100 flex flex-col justify-center transition-colors hover:bg-[#F2F2EF]">
            <div className="inline-flex items-center gap-2 mb-8">
              <span className="w-2 h-2 rounded-full bg-neutral-900 animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                Podkasten
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-5 leading-tight text-neutral-900">
              Norges koseligste<br />løpepodkast.
            </h1>
            <p className="text-base text-neutral-500 mb-10 max-w-sm leading-relaxed">
              Bli med Kalle og John på oppturer, nedturer og alt i mellom. Vi snakker om løping for folk flest.
            </p>
            <button className="w-fit flex items-center gap-2 bg-white border border-neutral-200 text-neutral-900 px-6 py-3 rounded-full text-sm font-semibold hover:border-neutral-300 transition-colors shadow-sm">
              <Headphones className="w-5 h-5" />
              Lytt til nyeste episode
            </button>
          </div>

          {/* Høyre: Ny til løping */}
          <div className="bg-neutral-900 p-10 md:p-14 rounded-3xl flex flex-col justify-center text-white relative overflow-hidden">
            <div className="inline-flex items-center gap-2 mb-8">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Løpeskolen
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-5 leading-tight">
              Ny til løping?<br />Start her.
            </h2>
            <p className="text-base text-neutral-400 mb-10 max-w-sm leading-relaxed">
              Vi skreddersyr oppstarten din. Ta vår enkle quiz for å finne riktig nivå, og få et program som faktisk fungerer.
            </p>
            <Link 
              href="/quiz"
              className="w-fit flex items-center gap-2 bg-white text-neutral-900 px-6 py-3 rounded-full text-sm font-semibold hover:bg-neutral-100 transition-colors"
            >
              Finn ditt program
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* --- SEKSJON 1: Tjenester & Løp --- */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <Link href="/quiz" className="bg-white border border-neutral-200 p-8 rounded-3xl hover:border-neutral-300 hover:shadow-sm transition-all duration-200 group">
              <CheckCircle2 className="w-8 h-8 text-neutral-900 mb-6" />
              <h3 className="text-xl font-bold tracking-tight mb-3 text-neutral-900">Treningsprogram</h3>
              <p className="text-neutral-500 text-sm leading-relaxed mb-6">Få en skreddersydd plan og kryss av øktene uke for uke i ditt eget dashbord.</p>
              <span className="text-sm font-semibold text-neutral-900 group-hover:underline flex items-center gap-1">
                Kom i gang <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
            
            <div className="bg-white border border-neutral-200 p-8 rounded-3xl hover:border-neutral-300 hover:shadow-sm transition-all duration-200 cursor-pointer">
              <MapPin className="w-8 h-8 text-neutral-900 mb-6" />
              <h3 className="text-xl font-bold tracking-tight mb-3 text-neutral-900">Lavterskel-løpet</h3>
              <p className="text-neutral-500 text-sm leading-relaxed">Bli med på årets triveligste løp. Null prestasjonsangst, bare ekstremt god stemning.</p>
            </div>

            <div className="bg-white border border-neutral-200 p-8 rounded-3xl hover:border-neutral-300 hover:shadow-sm transition-all duration-200 cursor-pointer">
              <Trophy className="w-8 h-8 text-neutral-900 mb-6" />
              <h3 className="text-xl font-bold tracking-tight mb-3 text-neutral-900">Rogaland Grand Prix</h3>
              <p className="text-neutral-500 text-sm leading-relaxed">Konkurrer mot deg selv og andre i vår uformelle løpskarusell. For alle nivåer.</p>
            </div>

          </div>
        </div>
      </section>

{/* --- MARQUEE 1: HOKA (Logo Edition) --- */}
<div className="w-full bg-white border-y border-neutral-100 py-8 overflow-hidden flex items-center group">
        <div className="flex whitespace-nowrap animate-marquee items-center gap-24 opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-5000">
          {/* Bytt ut .svg med .png hvis du lastet ned en PNG-fil */}
          <Image src="/hoka-logo.png" alt="Sponset av HOKA" width={140} height={40} className="object-contain" />
          <Image src="/hoka-logo.png" alt="Sponset av HOKA" width={140} height={40} className="object-contain" />
          <Image src="/hoka-logo.png" alt="Sponset av HOKA" width={140} height={40} className="object-contain" />
          <Image src="/hoka-logo.png" alt="Sponset av HOKA" width={140} height={40} className="object-contain" />
          <Image src="/hoka-logo.png" alt="Sponset av HOKA" width={140} height={40} className="object-contain" />
          <Image src="/hoka-logo.png" alt="Sponset av HOKA" width={140} height={40} className="object-contain" />
          <Image src="/hoka-logo.png" alt="Sponset av HOKA" width={140} height={40} className="object-contain" />
          <Image src="/hoka-logo.png" alt="Sponset av HOKA" width={140} height={40} className="object-contain" />
        </div>
      </div>

{/* --- SEKSJON 2: Førstart & Kunnskapsbase (Sanna Image Cards) --- */}
<section className="py-24 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Kunnskapsbasen-kort */}
          <div className="bg-white border border-neutral-200 rounded-[2rem] overflow-hidden flex flex-col group hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            {/* Bilde-boks */}
            <div className="relative w-full h-64 md:h-80 overflow-hidden bg-neutral-100">
              <img 
                src="https://images.unsplash.com/photo-1552674605-171ff3ea36f0?q=80&w=1000&auto=format&fit=crop" 
                alt="Snører løpesko" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Innhold */}
            <div className="p-8 md:p-12 flex flex-col flex-1 justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-4 text-neutral-900">Kunnskapsbasen</h2>
                <p className="text-neutral-500 mb-8 leading-relaxed">
                  Ta vår interaktive løpeskole. Ingen feil svar, bare trygg veiledning og tips for å unngå de vanligste nybegynnerfeilene.
                </p>
              </div>
              <Link
                href="/lopeskolen"
                className="w-fit bg-neutral-900 text-white px-8 py-4 rounded-full text-sm font-semibold hover:bg-neutral-800 transition-colors"
              >
                Utforsk artiklene
              </Link>
            </div>
          </div>

          {/* Førstart-kort */}
          <div className="bg-white border border-neutral-200 rounded-[2rem] overflow-hidden flex flex-col group hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            {/* Bilde-boks */}
            <div className="relative w-full h-64 md:h-80 overflow-hidden bg-neutral-100">
              <img 
                src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1000&auto=format&fit=crop" 
                alt="Løper på bane" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Innhold */}
            <div className="p-8 md:p-12 flex flex-col flex-1 justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-4 text-neutral-900">Test formen</h2>
                <p className="text-neutral-500 mb-8 leading-relaxed">
                  Klar for et mål? Sjekk den offisielle terminlisten for Rogaland og finn ditt neste løp på vår søsterplattform, Førstart.no.
                </p>
              </div>
              <a href="https://førstart.no" target="_blank" rel="noopener noreferrer" className="w-fit bg-white border border-neutral-200 text-neutral-900 px-8 py-4 rounded-full text-sm font-semibold hover:border-neutral-300 transition-colors">
                Gå til Førstart.no
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* --- SEKSJON 3: Foredrag & Om podkasten --- */}
      <section className="pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="p-10 md:p-14 rounded-3xl border border-neutral-200 hover:shadow-sm transition-shadow">
            <Megaphone className="w-8 h-8 text-neutral-400 mb-6" />
            <h2 className="text-2xl font-bold tracking-tight mb-4 text-neutral-900">Book et foredrag</h2>
            <p className="text-neutral-500 leading-relaxed mb-8 text-sm max-w-sm">
              Ønsker dere besøk av Kalle og John? Vi holder inspirerende og underholdende foredrag om motivasjon, løpeglede og kulturen vi bygger.
            </p>
            <button className="text-neutral-900 font-semibold text-sm flex items-center gap-1 hover:underline">
              Ta kontakt <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          
          <div className="p-10 md:p-14 rounded-3xl border border-neutral-200 hover:shadow-sm transition-shadow">
            <Headphones className="w-8 h-8 text-neutral-400 mb-6" />
            <h2 className="text-2xl font-bold tracking-tight mb-4 text-neutral-900">Om oss</h2>
            <p className="text-neutral-500 leading-relaxed mb-8 text-sm max-w-sm">
              Vi startet Lavterskel fordi vi savnet et sted der prestasjon ikke var det viktigste. Les historien vår, vår misjon, og møt folka bak.
            </p>
            <button className="text-neutral-900 font-semibold text-sm flex items-center gap-1 hover:underline">
              Les historien vår <ArrowRight className="w-3 h-3" />
            </button>
          </div>

        </div>
      </section>

      {/* --- MARQUEE 2: Sosiale Medier (Helt clean) --- */}
      <div className="w-full bg-neutral-50 border-t border-neutral-100 py-6 overflow-hidden flex items-center">
        <div className="flex whitespace-nowrap animate-marquee items-center gap-24 font-semibold text-sm uppercase tracking-widest text-neutral-400">
          <span className="flex items-center gap-2 hover:text-neutral-900 transition-colors cursor-pointer"><Headphones className="w-4 h-4"/> Spotify</span>
          <span className="flex items-center gap-2 hover:text-neutral-900 transition-colors cursor-pointer"><Instagram className="w-4 h-4"/> Instagram</span>
          <span className="flex items-center gap-2 hover:text-neutral-900 transition-colors cursor-pointer"><Youtube className="w-4 h-4"/> YouTube</span>
          <span className="flex items-center gap-2 hover:text-neutral-900 transition-colors cursor-pointer"><Play className="w-4 h-4"/> Snapchat</span>
          {/* Looping */}
          <span className="flex items-center gap-2 hover:text-neutral-900 transition-colors cursor-pointer"><Headphones className="w-4 h-4"/> Spotify</span>
          <span className="flex items-center gap-2 hover:text-neutral-900 transition-colors cursor-pointer"><Instagram className="w-4 h-4"/> Instagram</span>
          <span className="flex items-center gap-2 hover:text-neutral-900 transition-colors cursor-pointer"><Youtube className="w-4 h-4"/> YouTube</span>
          <span className="flex items-center gap-2 hover:text-neutral-900 transition-colors cursor-pointer"><Play className="w-4 h-4"/> Snapchat</span>
        </div>
      </div>

    </div>
  );
}