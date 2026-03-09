'use client';

import { useEffect, useMemo, useState } from "react";
import { ShieldCheck } from "lucide-react";
import TrackEventLink from "@/components/analytics/TrackEventLink";
import { trackEvent } from "@/lib/analytics";
import {
  onboardingExperiment,
  normalizeOnboardingVariant,
  type OnboardingExperimentVariant,
} from "@/lib/ab";

type Profile = {
  id: string;
  value: string;
  title: string;
  safety: string;
  description: string;
};

type Props = {
  fokus: "trafikk" | "form" | "utstyr";
  profiles: Profile[];
};

function pickVariant(): OnboardingExperimentVariant {
  if (typeof window === "undefined") return "control";

  const fromStorage = window.localStorage.getItem(onboardingExperiment.key);
  const normalized = normalizeOnboardingVariant(fromStorage);

  if (fromStorage === "control" || fromStorage === "quickstart") {
    return normalized;
  }

  const random = Math.random() < 0.5 ? "control" : "quickstart";
  window.localStorage.setItem(onboardingExperiment.key, random);
  return random;
}

export default function OnboardingProfileStep({ fokus, profiles }: Props) {
  const [variant, setVariant] = useState<OnboardingExperimentVariant>("control");

  useEffect(() => {
    const chosen = pickVariant();
    setVariant(chosen);
    trackEvent("onboarding_started", { fokus, ab_variant: chosen });
  }, [fokus]);

  const quickStartHref = useMemo(
    () => `/plan?fokus=${fokus}&profil=fersk&variant=${variant}`,
    [fokus, variant]
  );

  return (
    <section>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-3xl text-ink">2. Velg din startprofil</h2>
        <span className="border border-cream-border px-2 py-1 text-[11px] uppercase tracking-widest text-ink-4">
          A/B: {variant}
        </span>
      </div>

      {variant === "quickstart" ? (
        <div className="mb-6 border border-gold/30 bg-gold/5 p-5">
          <p className="mb-3 text-sm text-ink-3">
            Anbefalt rask start: bruk standardprofilen og få planen din på ett klikk.
          </p>
          <TrackEventLink
            href={quickStartHref}
            eventName="cta_clicked"
            eventProps={{
              cta_id: "onboarding_quick_start",
              fokus,
              profil: "fersk",
              ab_variant: variant,
            }}
            className="inline-block bg-gold px-4 py-2 text-xs font-bold uppercase tracking-widest text-ink transition-colors hover:bg-gold-h"
          >
            Start med anbefalt plan
          </TrackEventLink>
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-3">
        {profiles.map((profile) => (
          <TrackEventLink
            key={profile.id}
            href={`/plan?fokus=${fokus}&profil=${profile.value}&variant=${variant}`}
            eventName="cta_clicked"
            eventProps={{
              cta_id: "onboarding_create_plan",
              fokus,
              profil: profile.value,
              ab_variant: variant,
            }}
            className="border border-cream-border bg-cream p-6 transition-all hover:border-ink hover:bg-cream-2"
          >
            <div className="mb-3 inline-flex items-center gap-2 border border-cream-border px-2 py-1 text-xs text-ink-4">
              <ShieldCheck className="h-3.5 w-3.5" />
              {profile.safety}
            </div>
            <h3 className="mb-2 text-2xl text-ink">{profile.title}</h3>
            <p className="mb-5 text-sm text-ink-3">{profile.description}</p>
            {profile.value === "fersk" ? (
              <span className="mb-3 inline-block border border-gold/30 px-2 py-1 text-[11px] uppercase tracking-widest text-gold">
                Anbefalt
              </span>
            ) : null}
            <span className="inline-block bg-gold px-4 py-2 text-xs font-bold uppercase tracking-widest text-ink">
              Lag planen min
            </span>
          </TrackEventLink>
        ))}
      </div>
    </section>
  );
}
