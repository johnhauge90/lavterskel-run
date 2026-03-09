'use client';

import Link, { LinkProps } from "next/link";
import { AnchorHTMLAttributes, MouseEvent } from "react";
import { AnalyticsProps, trackEvent } from "@/lib/analytics";

type Props = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    eventName: string;
    eventProps?: AnalyticsProps;
  };

export default function TrackEventLink({
  eventName,
  eventProps,
  onClick,
  children,
  ...linkProps
}: Props) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    trackEvent(eventName, eventProps);
    onClick?.(event);
  }

  return (
    <Link {...linkProps} onClick={handleClick}>
      {children}
    </Link>
  );
}
