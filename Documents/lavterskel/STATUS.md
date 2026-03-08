# Lavterskel.run — Prosjektstatus
> Oppdatert: 2026-03-07

---

## 1. Mappestruktur

```
lavterskel/
│
├── app/
│   ├── layout.tsx                        # Root layout (Geist + Playfair Display, globals)
│   ├── globals.css                       # Tailwind + forest-palett + stone-palett
│   │
│   ├── (public)/                         # Offentlige ruter (ingen auth)
│   │   ├── layout.tsx                    # Header + Footer wrapper
│   │   ├── page.tsx                      # Hjemside (Bento, hero, seksjon-kort)
│   │   ├── login/page.tsx                # Server Component + Suspense-wrapper
│   │   ├── quiz/page.tsx                 # Quiz-funnel: 3 steg → program-match → kjøp
│   │   └── lopeskolen/
│   │       ├── page.tsx                  # Kategori-oversikt + SEO canonical
│   │       └── [slug]/page.tsx           # Artikkelside (SSG via generateStaticParams)
│   │
│   ├── checkout/                         # Auth-gated (redirect til /login hvis ikke innlogget)
│   │   └── page.tsx                      # Betalingsside: viser program + pris + CheckoutButton
│   │
│   ├── dashboard/                        # Auth-gated (middleware)
│   │   ├── layout.tsx                    # Sidebar / nav (LogoutButton)
│   │   └── page.tsx                      # Treningsoversikt (parallel DB-kall)
│   │
│   ├── actions/                          # Server Actions ('use server')
│   │   ├── workouts.ts                   # markWorkoutComplete()
│   │   ├── health.ts                     # reportHealthStatus() / clearHealthStatus()
│   │   └── programs.ts                   # assignProgram() — payment-aware upsert
│   │
│   ├── admin/                            # Admin-panel (beskyttet: ADMIN_EMAILS + assertAdmin())
│   │   ├── layout.tsx                    # Forest-950 sidebar (Oversikt/Kunder/Meldinger)
│   │   ├── page.tsx                      # Oversikt: total users, paid, revenue, pending-liste
│   │   ├── users/
│   │   │   ├── page.tsx                  # Alle kunder (sortert: betalt → pending)
│   │   │   └── [id]/
│   │   │       ├── page.tsx              # Brukerdetalj + fullføringer + helsestatus
│   │   │       └── AdminUserActions.tsx  # "use client": mark paid, endre program, set uke, slett
│   │   └── messages/
│   │       ├── page.tsx                  # Broadcast-historikk (aktive/inaktive)
│   │       └── BroadcastForm.tsx         # "use client": tittel + tekst → send til alle dashboard
│   │
│   ├── actions/                          # Server Actions ('use server')
│   │   ├── workouts.ts                   # markWorkoutComplete()
│   │   ├── health.ts                     # reportHealthStatus() / clearHealthStatus()
│   │   ├── programs.ts                   # assignProgram() — payment-aware upsert
│   │   └── admin.ts                      # markUserAsPaid, changeUserProgram, deleteUser, setUserWeek, sendBroadcastMessage
│   │
│   └── utils/supabase/
│       ├── client.ts                     # Browser-klient (CSR)
│       ├── server.ts                     # Server-klient (SSR via cookies())
│       └── admin.ts                      # Service role client (aldri til browser!)
│
├── components/
│   ├── Header.tsx                        # Serif-logo, forest green CTA, stone nav
│   ├── Footer.tsx                        # Bunntekst
│   ├── icons/                            # Custom SVG-ikoner
│   │
│   ├── auth/
│   │   └── LoginForm.tsx                 # "use client" — useSearchParams + signup/login
│   │
│   ├── checkout/
│   │   └── CheckoutButton.tsx            # "use client" — Stripe/Vipps CTA (stub)
│   │
│   ├── dashboard/
│   │   ├── ProgressHeader.tsx            # Program + uke-progress bar
│   │   ├── WorkoutCard.tsx               # Treningskort (completed/active/future)
│   │   ├── CompleteButton.tsx            # useTransition → markWorkoutComplete
│   │   ├── SykEllerSkadetButton.tsx      # Modal: rapporter sykdom/skade
│   │   ├── RecoveryBanner.tsx            # Banner under restitusjon
│   │   ├── LogoutButton.tsx              # signOut → /login
│   │   ├── PodcastCard.tsx               # Podkast-feed
│   │   └── DiscountCard.tsx              # Partner-rabatt
│   │
│   └── lopeskolen/
│       ├── CategoryCard.tsx              # Kategori-kort med antall artikler
│       ├── ArticleCard.tsx               # Artikkelkort (hover-zoom bilde)
│       └── QuizCTA.tsx                   # Salgspitch nederst på alle artikler
│
├── lib/
│   ├── lopeskolen/articles.ts            # Statiske artikler (8 stk, 4 kategorier)
│   └── programs/registry.ts              # 9 programmer, slug-map, getProgram()
│
├── supabase/migrations/
│   ├── 001_workout_completions.sql       # workout_completions + RLS
│   ├── 002_user_health_status.sql        # user_health_status + RLS
│   ├── 003_user_programs.sql            # user_programs + RLS (base-tabell)
│   ├── 004_payment_columns.sql          # paid_at, payment_status, price_nok + indeks
│   └── 005_admin_tables.sql            # broadcast_messages (admin → alle dashboard)
│
└── middleware.ts                         # Edge auth-guard: /dashboard/* → /login
```

**Totalt:** ~2 800 linjer produksjonskode (ekskl. node_modules).

---

## 2. Design system

**Passenger-inspirert palett** (implementert i globals.css + alle komponenter):

| Token | Hex | Bruk |
|---|---|---|
| `forest-950` | `#0F2520` | Mørk bakgrunn (announcement bar) |
| `forest-900` | `#1B3D35` | Primær CTA, hover-states, ikoner |
| `forest-800` | `#245040` | Hover på forest-900 |
| `forest-700` | `#2D6A58` | Sekundær grønn |
| `forest-100` | `#E8F2EF` | Grønn bakgrunn light |
| `forest-50` | `#F2F8F5` | Subtil grønn flate |
| `stone-900` | `#1A1A1A` | Brødtekst |
| `stone-50` | `#F9F8F6` | Varm off-white flater |

**Typografi:** Playfair Display (`font-serif`) på alle `h1`/`h2`/`h3` + logo. Geist Sans på brødtekst.

**Border-radius:** `rounded-xl` (12px) på kort/inputs, `rounded-2xl` (16px) på modaler, `rounded-full` kun avatarer.

---

## 3. Hva som er bygget

### 🟢 Fullført og fungerende

#### Admin-panel (`/admin/*`) — **NY**
- **Tilgangskontroll**: ADMIN_EMAILS env var sjekkes i middleware (edge) OG i `assertAdmin()` i hvert Server Action. To-lags forsvar.
- **`/admin`** — Oversikt: total brukere, betalte, estimert omsetning, siste 5 ventende betalinger.
- **`/admin/users`** — Alle kunder sortert betalt → ventende. Viser program, uke, status-badge.
- **`/admin/users/[id]`** — Brukerdetalj: mark as paid, bytt program, sett aktiv uke, slett bruker (med bekreftelsesdialog). Bruker `admin.auth.admin.listUsers()` via service role.
- **`/admin/messages`** — Send broadcast-melding til alle innloggede brukere sin dashboard. Historikk med deaktiver-knapp.
- **`broadcast_messages`-tabell** — Migrasjon 005. RLS: alle autentiserte kan lese aktive, kun service role kan skrive.
- **Pre-Stripe betalingsflyt** — Admin kan manuelt bekrefte Vipps/banktransfer via "Merk som betalt"-knapp. Fungerer som interim løsning.

#### Fundament
- **Design system**: Forest green palett, Playfair Display serif headings, `bg-white`, `border-stone-200`. Apple-inspirert Bento Box-grid.
- **Supabase SSR-oppsett**: Separat `client.ts` (browser) og `server.ts` (cookies). `getUser()` i middleware.
- **Middleware auth-guard**: Edge runtime. Beskytter `dashboard/*`. Refresher session-cookies automatisk.

#### Offentlig flyt
- **Hjemside** (`/`): Hero, Bento-seksjonskort, alle interne lenker koblet.
- **Quiz-funnel** (`/quiz`): 3-stegs quiz (nivå + mål). `PROGRAM_MAP` 3×3 → 9 unike programmer fra registry. \"Kjøp nå\" → `/login?mode=registrer&program=sofa-5km`.
- **Login/registrer** (`/login`): `useSearchParams` leser `?mode=registrer` og `?program=`. Suspense-grense for App Router-kompatibilitet.
- **Løpeskolen** (`/lopeskolen`): 4 kategorier, 8 artikler (SSG). QuizCTA på alle artikler.

#### Checkout-flyt (Codex)
- **`/checkout`**: Auth-gated. Leser `user_programs.program_slug` + sjekker `paid_at`/`payment_status`. Redirect til `/dashboard` hvis betalt, til `/quiz` hvis inget program. Viser program-info + pris + `CheckoutButton`.
- **`CheckoutButton`**: Stub-komponent klar for Stripe/Vipps-integrasjon.
- **`assignProgram()`**: Payment-aware upsert — skriver ikke over betalt program. Setter `payment_status: 'pending'`, `price_nok`, `paid_at: null` ved ny assignment.

#### Dashboard (auth-gated)
- **Treningsoversikt**: Tre parallelle Supabase-kall (completions + helsestatus + program). `resolveStatus()` per økt.
- **Fullføring**: `markWorkoutComplete()` med `useTransition`. `UNIQUE(user_id, workout_id)`.
- **\"Syk eller skadet?\"**: Modal med `backdrop-blur-sm`. `upsert` → én aktiv status per bruker.
- **Dynamisk program**: Henter `program_name`, `current_week`, `total_weeks` fra `user_programs`.

#### Database (Supabase)
| Tabell | Nøkkel | RLS | Kolonner |
|---|---|---|---|
| `workout_completions` | UNIQUE(user_id, workout_id) | select/insert own | — |
| `user_health_status` | PRIMARY KEY user_id | select/insert/update/delete own | — |
| `user_programs` | UNIQUE(user_id) | select/insert/update own | `payment_status`, `price_nok`, `paid_at` (migrasjon 004) |
| `broadcast_messages` | id (uuid) | Read active (all auth), write (service role) | `title`, `body`, `is_active`, `created_by` (migrasjon 005) |

#### Datakjede: Quiz → Checkout → Dashboard
```
/quiz (velg nivå + mål)
  → /login?mode=registrer&program=sofa-5km
  → signup → assignProgram(slug) [Server Action]
  → /checkout (vis pris, betal)
  → webhook setter paid_at [IKKE IMPLEMENTERT]
  → /dashboard (viser riktig programnavn og uke)
```

---

## 4. Roadmap til lansering

### Fase 1 — Betalingsflyt (blocker #1) `~1–2 uker`
> **Ingen inntekt uten dette.**

- [ ] **Stripe-integrasjon**: `/api/checkout` → Stripe Checkout Session → webhook → `paid_at` + `payment_status: 'paid'`
- [ ] **Vipps-integrasjon**: Vipps MobilePay API → samme webhook-mønster
- [ ] **Paywall-guard**: Middleware sjekker `paid_at !== null` før dashboard-tilgang
- [ ] **Ordrebekreftelse**: Supabase Edge Function trigger på betalt → transaksjons-e-post

**Avhengighet:** Stripe API-nøkler + Vipps merchant-konto.

---

### Fase 2 — Produksjonsklar `~3–5 dager`

- [ ] **`app/not-found.tsx`** — 404-side
- [ ] **`app/error.tsx`** / `app/dashboard/error.tsx` — Feilgrenser
- [ ] **`app/dashboard/loading.tsx`** — Skeleton-loader
- [ ] **E-postbekreftelse**: Etter `signUp` → `/registrert` med \"Sjekk e-posten din\"
- [ ] **`profiles`-tabell**: Lagre display name ved signup
- [ ] **Vercel-deploy**: Koble repo, sett env vars, custom domain `lavterskel.run`

---

### Fase 3 — Innholdsmotor `~1 uke`

- [ ] **Løpeskolen** — 8 → 20+ artikler (SEO-volumsider)
- [ ] **Programinnhold**: Flytte øktene fra hardkodede UUIDs til statisk data-layer per uke
- [ ] **Ukenavigasjon**: `current_week++` / `current_week--` (Server Action)
- [ ] **`/program/[slug]`-landingsside**: Dedikert salgsside per program for SEO

---

### Fase 4 — Soft Launch `DAG 1`

- [ ] Kjør alle 4 SQL-migrasjoner mot Supabase Production
- [ ] Smoke-test: quiz → betal → dashboard viser riktig program
- [ ] Annonsering til GTI/Spirit/Grødem-nettverk (Rogaland)
- [ ] Google Search Console: submit sitemap

---

### Fase 5 — Vekst `Post-launch`

- [ ] **Safe-Swap markedsplass**: Vipps-verifisert kjøp/salg av startnummer
- [ ] **B2B Bedriftsdashboard**: ESG-rapporter for HR (7 500 kr/år)
- [ ] **Arrangørpakke**: GTI/Spirit/Grødem på Førstart.no-plattform (20-30k/mnd)
- [ ] **Onboarding-sekvens**: Automatiserte e-poster via Supabase Edge Functions + Resend
- [ ] **Samfunnskalkulator**: 29 kr/km ESG-pitch til sponsorer
- [ ] **WebMCP / Agent-Ready API**: Automatiser datainnsamling

---

### Kritiske risikoer
| Risiko | Konsekvens | Mitigering |
|---|---|---|
| Ingen betaling før bruker-tilgang | Alle brukere er gratisbrukere | Paywall-guard i Fase 1 |
| `004_payment_columns.sql` ikke kjørt i prod | `programs.ts` upsert krasjer | Kjør migrasjon før deploy |
| `005_admin_tables.sql` ikke kjørt i prod | `broadcast_messages` mangler, admin krasjer | Kjør migrasjon før deploy |
| `SUPABASE_SERVICE_ROLE_KEY` placeholder | Admin-panel kan ikke liste brukere | Hent fra Supabase Dashboard → API |
| `current_week` statisk | Dashboard viser alltid Uke 1 | Fase 3: ukenavigasjon |
| Ingen e-postbekreftelse | Falske e-poster | Fase 2: `/registrert`-side |
| Ingen feilgrenser | Supabase-feil krasjer dashboard | Fase 2: `error.tsx` |
| `CheckoutButton` er stub | Ingen kan betale | **Fase 1 blocker** |
