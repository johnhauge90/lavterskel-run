This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Analytics (GA4)

Set the GA4 Measurement ID in `.env.local`:

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

When this variable is present, the app loads GA4 and sends:

- `onboarding_started`
- `plan_generated`
- `cta_clicked`
- `book_meeting_clicked`

## Funnel baseline (uke 1)

This project also stores key funnel events in Supabase via `POST /api/events`.

1. Run migration in Supabase:
   - `supabase/migrations/001_funnel_events.sql`
2. Open funnel dashboard:
   - `/dashboard/funnel`

Tracked funnel steps:

- `onboarding_started`
- `plan_generated`
- `book_meeting_clicked`

### A/B test (svakeste steg)

`onboarding -> plan` is now running an A/B test with variants:

- `control`
- `quickstart`

Variant is persisted in browser localStorage key:

- `exp_onboarding_plan_step_v1`

Variant split is visible at:

- `/dashboard/funnel`

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
