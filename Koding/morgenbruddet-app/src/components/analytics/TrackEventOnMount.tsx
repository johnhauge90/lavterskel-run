'use client';

import { useEffect } from "react";
import { AnalyticsProps, trackEvent } from "@/lib/analytics";

type Props = {
  eventName: string;
  props?: AnalyticsProps;
};

export default function TrackEventOnMount({ eventName, props }: Props) {
  useEffect(() => {
    trackEvent(eventName, props);
  }, [eventName, props]);

  return null;
}
