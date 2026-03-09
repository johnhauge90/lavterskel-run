export type AnalyticsProps = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (
      ...args:
        | ["js", Date]
        | ["config", string, Record<string, unknown>?]
        | ["event", string, Record<string, unknown>?]
    ) => void;
  }
}

export function trackEvent(eventName: string, props: AnalyticsProps = {}) {
  if (typeof window === "undefined") return;

  const cleanedProps = Object.fromEntries(
    Object.entries(props).filter(([, value]) => value !== undefined)
  );
  const payload = {
    eventName,
    props: cleanedProps,
    pagePath: window.location.pathname + window.location.search,
    referrer: document.referrer || undefined,
    userAgent: navigator.userAgent,
    occurredAt: new Date().toISOString(),
  };

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, cleanedProps);
  }

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event: eventName,
      ...cleanedProps,
      sentAt: new Date().toISOString(),
    });
  }

  try {
    const body = JSON.stringify(payload);
    const blob = new Blob([body], { type: "application/json" });

    if (typeof navigator.sendBeacon === "function") {
      navigator.sendBeacon("/api/events", blob);
    } else {
      fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      }).catch(() => undefined);
    }
  } catch {
    // Non-blocking: analytics should never break UX.
  }

  if (process.env.NODE_ENV !== "production") {
    // Keep local verification easy until a provider dashboard is wired.
    console.info("[analytics]", eventName, cleanedProps);
  }
}
