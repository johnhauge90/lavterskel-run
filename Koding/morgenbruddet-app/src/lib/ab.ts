export const onboardingExperiment = {
  key: "exp_onboarding_plan_step_v1",
  variants: ["control", "quickstart"] as const,
};

export type OnboardingExperimentVariant =
  (typeof onboardingExperiment.variants)[number];

export function normalizeOnboardingVariant(value?: string | null): OnboardingExperimentVariant {
  if (value === "control" || value === "quickstart") {
    return value;
  }
  return "control";
}
