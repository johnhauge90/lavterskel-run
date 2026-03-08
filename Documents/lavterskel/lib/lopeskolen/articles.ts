// Statisk artikkeldata for Løpeskolen (MVP).
// Migreres til Supabase CMS i neste sprint når volum øker.
// Alle artikler ender med en quiz-CTA — dette er den primære salgskanalen.

export type Category = 'kom-i-gang' | 'kropp-og-helse' | 'motivasjon' | 'neste-steg';

export type ArticleSection = {
  heading: string;
  body: string;
};

export type Article = {
  slug: string;
  category: Category;
  title: string;
  intro: string;
  readingMinutes: number;
  coverImage: string;   // Unsplash-URL, bytter til egne bilder senere
  sections: ArticleSection[];
  keyTakeaways: string[];
};

export const CATEGORIES: Record<Category, { label: string; description: string; icon: string }> = {
  'kom-i-gang': {
    label: 'Kom i gang',
    description: 'Alt du trenger for din første løpetur.',
    icon: '👟',
  },
  'kropp-og-helse': {
    label: 'Kropp & Helse',
    description: 'Puls, pust og skadefri progresjon.',
    icon: '❤️',
  },
  motivasjon: {
    label: 'Motivasjon',
    description: 'Psykologien bak vaner som holder.',
    icon: '🧠',
  },
  'neste-steg': {
    label: 'Neste steg',
    description: 'Fra mosjonist til førstegangsstarter.',
    icon: '🏁',
  },
};

export const ARTICLES: Article[] = [

  // ─── KOM I GANG ───────────────────────────────────────────────────────────

  {
    slug: 'hva-trenger-du-for-aa-starte',
    category: 'kom-i-gang',
    title: 'Hva trenger du egentlig for å begynne å løpe?',
    intro: 'Spoiler: mye mindre enn du tror. Her er den ærlige listen over hva som faktisk er nødvendig — og hva du kan ignorere.',
    readingMinutes: 4,
    coverImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop',
    sections: [
      {
        heading: 'Sko: det eneste som virkelig teller',
        body: 'Du trenger ett par sko med en anstendig såle. Ikke løpesko til 3000 kr, ikke karbonfiberdekte sko beregnet for sub-3-timers maratonløpere. Et par nøytrale løpesko fra HOKA, Asics eller New Balance i prisklassen 900–1400 kr gjør jobben i minst et år. Besøk en sportsbutikk, si at du er nybegynner og vil løpe 3–4 ganger i uka, og la dem hjelpe deg. Det tar 10 minutter.',
      },
      {
        heading: 'Klær: det du allerede har, holder',
        body: 'Joggebukse og en T-skjorte funker fint for de første ukene. Unngå bomull ved kaldere vær — det blir tungt og kaldt av svette. En enkel polyester-trenings-T for 200–300 kr holder deg komfortabel. Kompresjon, pulsmåler og GPS-klokke er hyggelig å ha, men absolutt ikke nødvendig for å komme i gang.',
      },
      {
        heading: 'App: kropp eller mobil',
        body: 'Du trenger ikke en app for å løpe. Kroppen din er det beste verktøyet: pust gjennom nesen, og du holder riktig fart. Hvis du vil ha struktur, er et treningsprogram med nedskrevne ukeplaner mer verdifullt enn en avansert app. Start enkelt.',
      },
      {
        heading: 'Hva du IKKE trenger (ennå)',
        body: 'Pulsmåler. GPS-klokke. Kompresjonssokker. Løpevest. Energigel. Sportsdrikk. Foam roller. Alt dette er nyttige verktøy for den som løper regelmessig over tid — men på dag én er de bare distraksjoner som øker terskelen for å komme seg ut døren.',
      },
    ],
    keyTakeaways: [
      'Ett par gode sko (900–1400 kr) er den eneste reelle investeringen',
      'Sett av 150–200 kr på en polyester-trenings-T for kalde dager',
      'Alt annet kjøper du etter 8–12 uker, hvis du fortsatt løper',
    ],
  },

  {
    slug: 'din-forste-lopetur',
    category: 'kom-i-gang',
    title: 'Din første løpetur — en plan i 4 trinn',
    intro: 'De fleste nybegynnere gjør den samme feilen: de starter for hardt og gir opp etter 8 minutter. Her er den vitenskapelig støttede metoden som faktisk fungerer.',
    readingMinutes: 5,
    coverImage: 'https://images.unsplash.com/photo-1552674605-171ff3ea36f0?q=80&w=1200&auto=format&fit=crop',
    sections: [
      {
        heading: 'Trinn 1: Gå/løp-intervaller (ikke bare løping)',
        body: 'Første uka løper du ikke 30 minutter i strekk. Du veksler: 1 minutt rolig jogg, 2 minutter gange. Gjenta 8–10 ganger. Dette høres banalt ut, men det er eksakt det samme prinsippet profesjonelle bruker for å bygge aerob kapasitet. Kroppen din tilpasser seg gradvis, og du unngår den overbelastningsskaden som sender 40 % av nybegynnere rett til sofaen.',
      },
      {
        heading: 'Trinn 2: Tempoet ditt er riktig hvis du kan prate',
        body: 'Det finnes én enkel test for om du løper i riktig tempo: kan du si en hel setning uten å puste midt i den? Hvis ja — bra. Hvis nei — gå litt, senk tempoet. "Sone 2"-trening (der du kan ha en samtale) er det som faktisk bygger den aerobe motoren alle løpere trenger, uansett nivå.',
      },
      {
        heading: 'Trinn 3: Ruten din er viktigere enn du tror',
        body: 'Velg en rute uten for mange bakker de første gangene. Flat asfalt eller grus gjør det lettere å holde et jevnt tempo og forstå kroppen din. Fjellruter er fantastiske — men vent til du har 4–6 uker med jevn trening bak deg.',
      },
      {
        heading: 'Trinn 4: Etter løpeturen',
        body: 'Strekk forsiktig ut, drikk vann, og noter kort ned hvordan det gikk. Ikke i en app nødvendigvis — bare mentalt. Hva gikk bra? Hva var vanskelig? Denne enkle refleksjonen er det som skiller folk som bygger en vane fra folk som løper to ganger og slutter.',
      },
    ],
    keyTakeaways: [
      'Gå/løp-intervaller er ikke "juks" — det er den smarte metoden',
      '"Kan jeg prate?" er den eneste tempomåleren du trenger',
      'Flat rute de første 4–6 ukene, bakker kan vente',
    ],
  },

  // ─── KROPP & HELSE ────────────────────────────────────────────────────────

  {
    slug: 'puls-sone-2-forklart',
    category: 'kropp-og-helse',
    title: 'Sone 2-trening: pulsen som gjør nybegynnere til løpere',
    intro: 'De fleste løper for hardt 80 % av øktene og spør seg selv hvorfor de ikke blir bedre. Svaret er Sone 2.',
    readingMinutes: 5,
    coverImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200&auto=format&fit=crop',
    sections: [
      {
        heading: 'Hva er Sone 2?',
        body: 'Pulssonene deles typisk inn i 5 soner fra hvile til makspuls. Sone 2 er den der du løper rolig nok til å ha en normal samtale — ca. 60–70 % av makspuls. Det føles "for enkelt". Det er meningen. Sone 2-trening bygger mitokondrier (kroppens energifabrikker) og legger grunnlaget for at alt annet løpearbeid fungerer bedre.',
      },
      {
        heading: 'Samtale-testen er alt du trenger',
        body: 'Uten pulsmåler: løp i et tempo der du kan si "Jeg løper i Sone 2 og det går bra" uten å stoppe for å puste. Med pulsmåler: hold deg under (220 - din alder) × 0,70. Eksempel: 35 år gammel = hold pulsen under 129. Begge metodene er gode nok for mosjonisten.',
      },
      {
        heading: '80/20-regelen: det som faktisk virker',
        body: 'Eliteløpere gjør 80 % av treningen i Sone 2 og 20 % i høye soner. Mosjonister gjør det omvendt — og lurer på hvorfor de stagnerer. Selv om du bare løper 3 ganger i uka, bør 2 av de 3 øktene være rolige Sone 2-turer. Det er ikke bare tryggere og morsommere — det er mer effektivt.',
      },
      {
        heading: 'Det tar lenger tid enn du tror — og det er greit',
        body: 'Sone 2-adaptasjon tar 8–12 uker å kjenne tydelig. I starten vil du merke at du MÅ senke tempoet betraktelig for å holde pulsen nede. Det er et tegn på at du gjør det riktig, ikke galt. Etter noen måneder løper du raskere ved den samme lave pulsen. Det er nøyaktig det som er poenget.',
      },
    ],
    keyTakeaways: [
      '80 % av øktene dine bør kjennes for lette — det er meningen',
      'Samtale-testen fungerer like bra som avansert pulsmåler',
      'Sone 2-adaptasjon tar 8–12 uker — tålmodighet er en løpsdisiplin',
    ],
  },

  {
    slug: 'skadefri-progresjon',
    category: 'kropp-og-helse',
    title: 'Skadefri: de 5 feilene som sender nybegynnere til sofaen',
    intro: '40 % av nybegynnere pådrar seg en skade i løpet av de første 3 månedene. Alle 5 vanligste feilene er helt unngåelige.',
    readingMinutes: 6,
    coverImage: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=1200&auto=format&fit=crop',
    sections: [
      {
        heading: 'Feil 1: For mye, for fort',
        body: '10 %-regelen er klokskapen her: øk ikke ukentlig løpevolum med mer enn 10 % om gangen. Kroppen din tåler mer enn du tror — men ikke alt på en gang. Muskler tilpasser seg raskt; sener og ledd er 5–6 ganger tregere. Det er senene som røkner, ikke musklene.',
      },
      {
        heading: 'Feil 2: Aldri en hviledag',
        body: 'Hvile er ikke latskap — det er der tilpasningen skjer. Muskelfibre repareres og styrkes i hvile, ikke under treningen. 2 hviledager per uke er ikke et kompromiss; det er en del av treningsprogrammet. De beste løperne i verden prioriterer søvn og hvile aggressivt.',
      },
      {
        heading: 'Feil 3: Ignorere varselsignaler',
        body: 'Stølhet etter trening er normalt. Smerte under løping er ikke det. Lær forskjellen: stølhet er diffus og symmetrisk (begge lår), skade er presis og asymmetrisk (bare høyre kne). Hvis noe gør vondt på ett sted under eller etter en tur — ta en dag ekstra hvile og se om det vedvarer. 90 % av løpeskader forsvinner av seg selv med 2–5 dagers hvile hvis du tar tak tidlig.',
      },
      {
        heading: 'Feil 4: Hoppe over oppvarming',
        body: '5 minutter gangtur før du begynner å løpe er nok. Blodgjennomstrømmingen øker, bindevevet varmes opp og bevegelsesutslaget forbedres. Dette er ikke en myte — det er fysiologi. Spesielt viktig i kaldt vær og morgentimer.',
      },
      {
        heading: 'Feil 5: Løpe på smertestillende',
        body: 'Ibuprofen og paracetamol demper smertesignalet, ikke årsaken til det. Å løpe en tur med dempermedisiner fordi "kneet er litt vondt" er som å dekke over et motorlys med tape. Du kan gjøre en liten irritasjon til en langvarig skade på under én time.',
      },
    ],
    keyTakeaways: [
      '10 %-regelen: øk aldri ukesvolum med mer enn 10 % av gangen',
      'Stølhet (diffus, symmetrisk) er OK — smerte (presis, asymmetrisk) er et stopp-signal',
      'Ta 2 hviledager i uka som en del av planen, ikke som en unnskyldning',
    ],
  },

  // ─── MOTIVASJON ───────────────────────────────────────────────────────────

  {
    slug: 'bygge-en-lopsvan',
    category: 'motivasjon',
    title: 'Hvorfor de fleste slutter — og hva som gjør deg til unntaket',
    intro: 'Motivasjon er ubrukelig som langsiktig drivkraft. Vaner er ikke. Her er den psykologiske modellen som faktisk funker.',
    readingMinutes: 5,
    coverImage: 'https://images.unsplash.com/photo-1486218119243-13301b7daa7a?q=80&w=1200&auto=format&fit=crop',
    sections: [
      {
        heading: 'Motivasjon er en dårlig sjef',
        body: 'Motivasjon er en følelse, og følelser er ustabile. Noen morgener er du motivert. De fleste morgener er du ikke det. Profesjonelle idrettsutøvere snakker ikke om motivasjon — de snakker om rutiner og systemer. Slutt å vente på at du skal føle deg motivert. Legg ut løpeskoa kvelden før og avtal med noen at dere møtes ved parken. Systemet kjører selv når motivasjonen ikke møter opp.',
      },
      {
        heading: 'To-minutters-regelen (og 10 %)',
        body: 'Den dagen du ikke vil løpe: si til deg selv at du bare skal ta på sko og gå ut døren. Bare 2 minutter. Hjernen din vet godt at du ikke stopper der, men det er et triks som fungerer. I tillegg: gi deg selv lov til å kutte en økt med 10 % i lengde på vanskelige dager. 27 minutter i stedet for 30 minutter er uendelig mye bedre enn null minutter.',
      },
      {
        heading: 'Identitet over mål',
        body: 'Mål som "løpe 5 km under 30 minutter" er bra for kortsiktig fokus, men svake som motivasjon. Identitetsskifte er sterkere: "Jeg er en som løper." Ikke "Jeg prøver å bli en løper." Denne lille omformuleringen — dokumentert av James Clear i Atomic Habits — endrer hva du gjør etter en stressuke eller en sykdomsperiode. En person "som prøver" gir opp. En person "som er en løper" kommer tilbake.',
      },
      {
        heading: 'Gi deg selv lov til å ha en dårlig dag',
        body: 'Perfeksjonisme er den vanligste årsaken til at folk slutter. En økt du hopper over er ikke "å ødelegge alt" — den er bare én økt. To dager i strekk uten trening er derimot begynnelsen på et oppbrudd. Regelen er: aldri hoppe over to dager på rad. Ikke én dag. To dager på rad.',
      },
    ],
    keyTakeaways: [
      'Bygg systemer (rutiner, avtaler, sko fremme) — ikke stol på motivasjon',
      'To-minutters-regelen: bare ta på skoene og gå ut',
      'Aldri hopp over to dager på rad — det er den eneste regelen du trenger',
    ],
  },

  {
    slug: 'janteloven-og-loping',
    category: 'motivasjon',
    title: 'Janteloven og løping: slutt å bekymre deg for hva andre tenker',
    intro: 'Du er ikke for sakte. Du er ikke for gammel. Du er ikke for tung. Her er det faktiske perspektivet.',
    readingMinutes: 4,
    coverImage: 'https://images.unsplash.com/photo-1502904550040-7534597429ae?q=80&w=1200&auto=format&fit=crop',
    sections: [
      {
        heading: 'Alle på veien tenker på seg selv',
        body: 'Den raske løperen som passerer deg i parken tenker ikke "se på den der". Han tenker på kilometertiden sin, om han rakk å sende den e-posten, og om hælen begynner å kjenne seg stiv igjen. Ingen bryr seg om tempoet ditt. Det er ikke fordi de er kule — det er fordi alle er opptatt med sin egen indre monolog.',
      },
      {
        heading: 'Sammenlikning er en tidsstjeler',
        body: 'Strava, Instagram og løpeklubber kan gi en skjev oppfatning av hva "normalt" er. En person som poster løpeturen sin på Instagram er ikke et representativt snitt av løpere — det er utvalgt for å imponere. De aller fleste som løper regelmessig, gjør det i et rolig tempo, alene, uten å fortelle noen om det. Det er det normale. Det er det vi driver med.',
      },
      {
        heading: 'Lavterskel er anti-Strava med hensikt',
        body: 'Vi har designet dashbordet ditt uten offentlige profiler, uten rangeringer og uten at noen ser fremgangen din. Det er et bevisst valg. Din løping er din. Fremgangen din tilhører deg. Du trenger ikke bevis for å ha gjort noe bra — du vet det selv.',
      },
      {
        heading: 'Alder er ikke en barriere',
        body: 'Halvmaraton-verdensrekorden for 70-åringer tilsvarer det gjennomsnittet av 25-åringer løper. Kroppen din er designet for bevegelse og tilpasning uansett alder. Forskning viser at aerob kapasitet kan forbedres gjennom hele livet med riktig mengde og type trening. Det eneste som er "for sent" er å ikke starte.',
      },
    ],
    keyTakeaways: [
      'Ingen løpere du møter tenker på tempoet ditt — de tenker på sitt eget',
      'Lavterskel-dashbordet er designet for å fjerne sammenlikningspresset helt',
      'Det finnes ingen "for sent" — aerob kapasitet kan forbedres i alle aldre',
    ],
  },

  // ─── NESTE STEG ───────────────────────────────────────────────────────────

  {
    slug: 'ditt-forste-5km',
    category: 'neste-steg',
    title: 'Ditt første 5 km-løp: alt du trenger å vite',
    intro: 'En 5 km er den perfekte første-konkurransen. Ingen forventer noe av deg, og du vil bli positivt overrasket av stemningen.',
    readingMinutes: 5,
    coverImage: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200&auto=format&fit=crop',
    sections: [
      {
        heading: 'Hvorfor 5 km er det ideelle nybegynnerløpet',
        body: '5 km er kort nok til at du kan fullføre det selv med lav form, og langt nok til å kjenne mestringsfølelsen etterpå. Det finnes 5 km-løp i nær sagt alle størrelser — fra uformelle parkruns med 50 deltakere til store byfestivaler med tusenvis. Finisher-medaljen din er ikke avhengig av tid.',
      },
      {
        heading: 'Hva du trenger for å stille',
        body: 'Hvis du kan jobbe deg gjennom 30–35 minutter i rolig tempo (gange inkludert), kan du stille i et 5 km-løp. Det er ingen minimumstid, og de aller fleste mosjonsløp har en tidsbegrensning på 60–90 minutter. Meld deg på. Det er en sterkere motivasjon enn noe treningsprogram.',
      },
      {
        heading: 'Dagene før løpet',
        body: 'Ikke prøv noe nytt (mat, sko, klær) løpsdagen. Legg frem utstyret kvelden før. Spis et normalt, lite måltid 1,5–2 timer før start. Møt opp 20 minutter tidlig for å hente startnummer og roe ned nervene. Nervøsitet er et tegn på at du bryr deg — det er en god ting.',
      },
      {
        heading: 'Løpsstrategi for nybegynnere',
        body: 'Start roligere enn du tror du trenger. De første 500 meterne er fylt av adrenalin og andre løpere som løper for fort. Hold igjen. Finn rytmen din. Hvis du har energi igjen ved 4 km, kan du presse på den siste kilometeren. Omvendt er mye vanskeligere å rette opp i.',
      },
    ],
    keyTakeaways: [
      'Meld deg på — en startplass er den sterkeste motivatoren som finnes',
      'Møt opp 20 min tidlig, legg frem utstyret kvelden før, ingenting nytt løpsdagen',
      'Start roligere enn du tror du trenger — du kan alltid presse inn mot slutten',
    ],
  },

  {
    slug: 'klar-for-halvmaraton',
    category: 'neste-steg',
    title: 'Er du klar for et halvmaraton?',
    intro: 'Halvmaratondrømmen er den nest vanligste grunnen til at folk begynner å løpe. Her er den ærlige vurderingen av hva som skal til.',
    readingMinutes: 5,
    coverImage: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=1200&auto=format&fit=crop',
    sections: [
      {
        heading: 'Baseline: dette er minimumet',
        body: 'For å fullføre et halvmaraton uten skaderisiko bør du ha: (1) løpt regelmessig i minst 3 måneder, (2) gjennomført minst 3–4 langkjøringer på 12–15 km, og (3) tålt 3 løpeøkter i uka over tid. Klarer du å si ja på alle tre, er du i utgangspunktet klar til å begynne et halvmaraton-program.',
      },
      {
        heading: 'Tidsrammen for et halvmaraton-program',
        body: 'Fra scratch tar det typisk 16–20 uker å forberede seg for et halvmaraton. Har du allerede noe løpegrunnlag, kan det gjøres på 10–14 uker. Programmet skal bygge gradvis ukentlig volum, inkludere en eller to terskelfart-økter per uke og gi kroppen nok hvile til å absorbere treningen.',
      },
      {
        heading: 'Hva mange undervurderer',
        body: 'Ernæring og søvn. Et halvmaraton-program krever mer av kroppen enn mosjonstrening. Du trenger mer mat (særlig karbohydrater rundt lange turer), mer søvn og mer aktiv restitusjon. De som hopper over dette led mer — og presterer dårligere — enn de som prioriterer det.',
      },
      {
        heading: 'Det viktigste rådet',
        body: 'Registrer deg for et løp. Velg en dato 4–5 måneder frem i tid og betal startavgiften. Det tvinger deg til å ta treningsplanen seriøst, og gir deg noe konkret å jobbe mot. Halvmaraton er ikke en dagdrøm — det er en beslutning.',
      },
    ],
    keyTakeaways: [
      'Minimumskravet: 3 mnd løpetrening, noen langkjøringer på 12–15 km',
      'Sett av 10–16 uker for et halvmaraton-program',
      'Registrer deg for et løp — det er den viktigste treningsavgjørelsen du kan ta',
    ],
  },
];

// Hjelpefunksjoner
export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: Category): Article[] {
  return ARTICLES.filter((a) => a.category === category);
}

export function getAllSlugs(): string[] {
  return ARTICLES.map((a) => a.slug);
}
