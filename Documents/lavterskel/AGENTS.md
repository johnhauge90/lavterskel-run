# Lavterskel.run agent instructions

- Keep files small and modular
- Prefer Next.js Server Components
- Use "use client" only when required
- Do not introduce heavy libraries
- Do not redesign existing public pages unless explicitly asked
- lib/programs/registry.ts is the single source of truth for program metadata
- user_programs is the source of truth for access control
- payment_orders is an audit/log table, not access control
- Match existing visual style from app/(public)/page.tsx
- Avoid monolithic components