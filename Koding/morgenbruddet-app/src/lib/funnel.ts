export const funnelSteps = [
  "onboarding_started",
  "plan_generated",
  "book_meeting_clicked",
] as const;

export type FunnelStep = (typeof funnelSteps)[number];

export const allowedTrackedEvents = new Set<string>([
  ...funnelSteps,
  "cta_clicked",
]);
