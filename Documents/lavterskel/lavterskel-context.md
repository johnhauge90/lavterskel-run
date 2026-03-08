# Lavterskel.run - Project Context & Rules

## 1. Project Philosophy & Audience
Lavterskel is a running portal and SaaS built on behavioral psychology. We are the "anti-Strava". Our users are beginners, everyday runners, and people battling "Janteloven" and "imposter syndrome" in sports. 
- We cure information overload (no VO2-max jargon, keep it simple).
- We remove social pressure (private dashboards, no public leaderboards).
- We design for "small wins" (dopamine hits when completing workouts) and remove guilt (easy to postpone workouts).

## 2. Design System & Taste (Sanna.no / Airbnb inspired)
Our aesthetic is "Minimalist Scandinavian SaaS". It must exude quiet confidence.
- **Colors:** STRICTLY use Tailwind's `neutral` palette. Dark text is `text-neutral-900`, backgrounds are `bg-white` or `bg-[#F7F7F5]` (off-white). Avoid harsh pure black.
- **Shapes:** Soft, tactile cards. Use `rounded-3xl` or `rounded-[2rem]` for main containers. Use `rounded-full` for pill-tags and buttons.
- **Typography:** Massive, tight headers (`text-4xl font-bold tracking-tight` or `font-black tracking-tighter`). Readable, airy body text (`text-neutral-500 leading-relaxed`).
- **Icons:** We use custom, thin SVG icons (strokeWidth="1.2" or "1.5") to feel like editorial illustrations, not generic web icons.
- **Interactions:** Subtle, high-end hover effects (`hover:-translate-y-1 hover:shadow-lg transition-all duration-300`). 

## 3. Architecture & Development Rules (The Lego Method)
- **Tech Stack:** Next.js (App Router), Tailwind CSS, TypeScript, Supabase.
- **Modularity:** NO "God Components". Break UI down into small, focused files (e.g., `components/icons/HouseIcon.tsx`).
- **Server vs Client:** Default to React Server Components. Only use `"use client"` when interactivity (useState, onClick, Supabase auth) is strictly required.
- **Code Quality:** Clean, self-documenting code. Do not add heavy external libraries without explicit permission. Use native Tailwind and Lucide/Custom SVGs.